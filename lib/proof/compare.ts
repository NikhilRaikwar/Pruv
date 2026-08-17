export type StoredMetric = {
  concern: string;
  raw_score: number | null;
  ui_score: number | null;
};

export type MetricComparison = {
  concern: string;
  baselineRaw: number | null;
  followupRaw: number | null;
  rawDelta: number | null;
  baselineUi: number | null;
  followupUi: number | null;
  uiDelta: number | null;
};

export function calculateDelta(baseline: number, followup: number) {
  return Number((followup - baseline).toFixed(2));
}

function delta(after: number | null, before: number | null) {
  if (after === null || before === null) return null;
  return Number((after - before).toFixed(1));
}

export function compareMetrics(baseline: StoredMetric[], followup: StoredMetric[]): MetricComparison[] {
  const followupByConcern = new Map(followup.map((metric) => [metric.concern, metric]));

  return baseline
    .map((baseMetric) => {
      const nextMetric = followupByConcern.get(baseMetric.concern);
      if (!nextMetric) return null;

      return {
        concern: baseMetric.concern,
        baselineRaw: baseMetric.raw_score,
        followupRaw: nextMetric.raw_score,
        rawDelta: delta(nextMetric.raw_score, baseMetric.raw_score),
        baselineUi: baseMetric.ui_score,
        followupUi: nextMetric.ui_score,
        uiDelta: delta(nextMetric.ui_score, baseMetric.ui_score),
      };
    })
    .filter((item): item is MetricComparison => Boolean(item));
}
