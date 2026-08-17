export type AnalysisContract = {
  apiVersion: 'v2.1';
  mode: 'hd' | 'sd';
  cameraMode: 'hdskincare' | 'skincare';
  actions: string[];
  format: 'json';
};

export const HD_CONTRACT: AnalysisContract = {
  apiVersion: 'v2.1',
  mode: 'hd',
  cameraMode: 'hdskincare',
  actions: [
    'hd_redness',
    'hd_acne',
    'hd_texture',
    'hd_pore',
    'hd_radiance',
  ],
  format: 'json',
};

export const CONCERN_KEYS = ['redness', 'acne', 'texture', 'pore', 'radiance'] as const;
export type ConcernKey = (typeof CONCERN_KEYS)[number];
