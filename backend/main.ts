// backend/main.ts
// Run with: deno run --allow-net --allow-env --allow-read main.ts

import { Hono } from 'https://deno.land/x/hono@v3.12.0/mod.ts';
import { cors } from 'https://deno.land/x/hono@v3.12.0/middleware.ts';
import 'https://deno.land/std@0.201.0/dotenv/load.ts'; // loads backend/.env into Deno.env

const app = new Hono();
app.use('*', cors()); // allow CORS for local dev

const NEWSAPI_KEY = Deno.env.get('NEWSAPI_KEY');
if (!NEWSAPI_KEY) {
  console.warn('WARNING: NEWSAPI_KEY not set. Put it in backend/.env or environment variables.');
}

async function newsApiFetch(path: string, params: Record<string,string>) {
  const url = new URL(`https://newsapi.org/v2/${path}`);
  Object.entries(params).forEach(([k, v]) => { if (v) url.searchParams.set(k, v); });
  url.searchParams.set('apiKey', NEWSAPI_KEY ?? '');
  const res = await fetch(url.toString());
  const json = await res.json();
  return json;
}

app.get('/news/top', async (c) => {
  const country = c.req.query('country') || 'us';
  const category = c.req.query('category') || '';
  const pageSize = c.req.query('pageSize') || '20';
  const params: Record<string,string> = { country, category, pageSize };
  const data = await newsApiFetch('top-headlines', params);
  return c.json(data);
});

app.get('/news/search', async (c) => {
  const q = c.req.query('q') || '';
  const from = c.req.query('from') || '';
  const sortBy = c.req.query('sortBy') || 'publishedAt';
  const pageSize = c.req.query('pageSize') || '20';
  const params: Record<string,string> = { q, from, sortBy, pageSize };
  const data = await newsApiFetch('everything', params);
  return c.json(data);
});

app.get('/', (c) => c.text('News proxy running'));

// Start server via Deno.serve: pass the Hono fetch handler and options
const port = 8000;
console.log(`Starting backend on http://localhost:${port}`);
Deno.serve({ port }, app.fetch);
