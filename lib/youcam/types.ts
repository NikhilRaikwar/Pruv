export const YOUCAM_HD_ACTIONS = [
  'hd_redness',
  'hd_acne',
  'hd_texture',
  'hd_pore',
  'hd_radiance',
] as const;

export type YouCamHdAction = (typeof YOUCAM_HD_ACTIONS)[number];

export type SkinConcern = 'redness' | 'acne' | 'texture' | 'pore' | 'radiance';

export type UploadSlot = {
  fileId: string;
  upload: {
    method: string;
    url: string;
    headers: Record<string, string>;
  };
};

export type NormalizedSkinMetric = {
  concern: SkinConcern;
  vendorType: string;
  rawScore: number | null;
  uiScore: number | null;
  maskUrls: string[];
  subcategory?: unknown;
};

export type NormalizedSkinAnalysis = {
  taskId: string;
  apiVersion: 'v2.1';
  metrics: NormalizedSkinMetric[];
};
