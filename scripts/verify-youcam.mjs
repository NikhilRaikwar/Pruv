import fs from 'node:fs/promises';

const API_KEY = process.env.YOUCAM_API_KEY;
const BASE_URL = process.env.YOUCAM_BASE_URL || 'https://yce-api-01.makeupar.com';
const filePath = process.argv[2];

if (!API_KEY) throw new Error('YOUCAM_API_KEY required');
if (!filePath) throw new Error('Usage: node scripts/verify-youcam.mjs ./test-selfie.jpg');

const buffer = await fs.readFile(filePath);
if (buffer.byteLength >= 10 * 1024 * 1024) throw new Error('File must be <10MB');

async function api(path, init = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });
  const body = await response.json();
  if (!response.ok) {
    console.error(body);
    throw new Error(`YouCam error ${response.status}`);
  }
  return body;
}

const slot = await api('/s2s/v2.1/file/skin-analysis', {
  method: 'POST',
  body: JSON.stringify({
    files: [{ content_type: 'image/jpeg', file_name: 'verify.jpg', file_size: buffer.byteLength }],
  }),
});

const file = slot.data.files[0];
const upload = file.requests[0];
const uploadResponse = await fetch(upload.url, {
  method: upload.method,
  headers: upload.headers,
  body: buffer,
});
if (!uploadResponse.ok) throw new Error(`Upload failed ${uploadResponse.status}`);

const task = await api('/s2s/v2.1/task/skin-analysis', {
  method: 'POST',
  body: JSON.stringify({
    src_file_id: file.file_id,
    dst_actions: ['hd_redness', 'hd_acne', 'hd_texture', 'hd_pore', 'hd_radiance'],
    miniserver_args: { enable_mask_overlay: true },
    format: 'json',
    pf_camera_kit: false,
  }),
});

const taskId = task.data.task_id;
console.log('task_id:', taskId);

for (let i = 0; i < 35; i += 1) {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const status = await api(`/s2s/v2.1/task/skin-analysis/${encodeURIComponent(taskId)}`);
  console.log('status:', status.data.task_status);
  if (status.data.task_status === 'success') {
    console.dir(status.data.results, { depth: 8 });
    process.exit(0);
  }
  if (status.data.task_status === 'error') {
    console.dir(status, { depth: 8 });
    process.exit(1);
  }
}

throw new Error('Timed out');
