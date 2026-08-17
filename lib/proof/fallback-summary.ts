import type { MetricComparison } from './compare';

function formatDelta(value: number | null) {
  if (value === null) return 'no comparable score';
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}`;
}

export function createFallbackSummary(metrics: MetricComparison[]) {
  const comparable = metrics.filter((metric) => metric.uiDelta !== null);

  if (comparable.length === 0) {
    return {
      headline: 'Your comparison is ready.',
      summary: 'Pruv found matching YouCam measurements for this trial, but there were no comparable score deltas to summarize.',
    };
  }

  const sorted = [...comparable].sort((a, b) => Math.abs(b.uiDelta ?? 0) - Math.abs(a.uiDelta ?? 0));
  const top = sorted[0];
  const positives = comparable.filter((metric) => (metric.uiDelta ?? 0) > 0);
  const negatives = comparable.filter((metric) => (metric.uiDelta ?? 0) < 0);

  return {
    headline: `${top.concern[0]?.toUpperCase()}${top.concern.slice(1)} changed most.`,
    summary: `The largest observed YouCam UI score change was ${top.concern} (${formatDelta(top.uiDelta)}). ${positives.length} score${positives.length === 1 ? '' : 's'} increased and ${negatives.length} score${negatives.length === 1 ? '' : 's'} decreased during this trial.`,
  };
}
