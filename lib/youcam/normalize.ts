import type { NormalizedSkinAnalysis, NormalizedSkinMetric, SkinConcern } from './types';

const concernByVendorType: Record<string, SkinConcern> = {
  hd_redness: 'redness',
  redness: 'redness',
  hd_acne: 'acne',
  acne: 'acne',
  hd_texture: 'texture',
  texture: 'texture',
  hd_pore: 'pore',
  pore: 'pore',
  pores: 'pore',
  hd_radiance: 'radiance',
  radiance: 'radiance',
};

function getNumber(value: unknown): number | null {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = parseFloat(value);
    if (!Number.isNaN(parsed) && Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function getOutput(response: unknown): unknown[] {
  const data = (response ?? {}) as {
    data?: {
      results?: {
        output?: unknown[];
        outputs?: unknown[];
        items?: unknown[];
      };
    };
    results?: {
      output?: unknown[];
      outputs?: unknown[];
      items?: unknown[];
    };
  };

  const results = data.data?.results ?? data.results;
  if (Array.isArray(results?.output)) return results.output;
  if (Array.isArray(results?.outputs)) return results.outputs;
  if (Array.isArray(results?.items)) return results.items;
  if (Array.isArray(results)) return results;
  return [];
}

export function normalizeSkinAnalysisResponse(taskId: string, response: unknown): NormalizedSkinAnalysis {
  const rawList = getOutput(response);
  const metricsMap = new Map<SkinConcern, NormalizedSkinMetric>();

  for (const item of rawList) {
    const metric = item as {
      type?: string;
      name?: string;
      concern?: string;
      region?: string;
      raw_score?: unknown;
      ui_score?: unknown;
      score?: unknown;
      value?: unknown;
      mask_urls?: unknown;
      subcategory?: unknown;
    };

    const vendorType = (metric.type ?? metric.name ?? metric.concern ?? '').toLowerCase();
    const concern = concernByVendorType[vendorType];

    if (!concern) continue;

    const raw = getNumber(metric.raw_score) ?? getNumber(metric.score) ?? getNumber(metric.ui_score) ?? getNumber(metric.value);
    const ui = getNumber(metric.ui_score) ?? getNumber(metric.score) ?? getNumber(metric.raw_score) ?? getNumber(metric.value);

    const isWholeRegion = metric.region === 'whole' || metric.region === 'all' || vendorType.endsWith('_all');
    const existing = metricsMap.get(concern);

    // Keep the single best/overall score for each concern
    if (!existing || isWholeRegion) {
      metricsMap.set(concern, {
        concern,
        vendorType,
        rawScore: raw,
        uiScore: ui,
        maskUrls: Array.isArray(metric.mask_urls)
          ? metric.mask_urls.filter((url): url is string => typeof url === 'string')
          : [],
        subcategory: metric.subcategory,
      });
    }
  }

  const metrics = Array.from(metricsMap.values());

  if (metrics.length === 0) {
    console.warn('YouCam raw response did not match expected structure:', JSON.stringify(response));
    throw new Error('No supported YouCam skin metrics found in API response');
  }

  return {
    taskId,
    apiVersion: 'v2.1',
    metrics,
  };
}
