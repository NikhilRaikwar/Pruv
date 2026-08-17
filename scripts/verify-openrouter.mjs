const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = process.env.OPENROUTER_MODEL || '~openai/gpt-latest';

if (!API_KEY) throw new Error('OPENROUTER_API_KEY required');

const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    'X-OpenRouter-Title': 'Pruv Dev',
  },
  body: JSON.stringify({
    model: MODEL,
    provider: { require_parameters: true },
    messages: [
      { role: 'system', content: 'Explain supplied numeric skincare measurements without diagnosis or causation claims.' },
      { role: 'user', content: JSON.stringify({ metrics: [{ concern: 'redness', baselineRaw: 71.2, followupRaw: 79.8, rawDelta: 8.6 }] }) },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'test',
        strict: true,
        schema: {
          type: 'object',
          additionalProperties: false,
          properties: { summary: { type: 'string' } },
          required: ['summary'],
        },
      },
    },
  }),
});

console.log(response.status, await response.text());
