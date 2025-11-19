import { fetchAndNormalizeCSV, normalizeParcelario, jsonResponse } from './_utils.js';

const URL = 'https://data.buenosaires.gob.ar/dataset/parcelas';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  try {
    const data = await fetchAndNormalizeCSV(URL, normalizeParcelario);
    const { searchParams } = new URL(req.url);
    const calle = searchParams.get('calle');
    const altura = Number(searchParams.get('altura'));
    let result = data;

    if (calle) result = result.filter(r => (r.calle || '').toLowerCase().includes(calle.toLowerCase()));
    if (!Number.isNaN(altura) && altura) result = result.filter(r => r.altura && Math.abs(r.altura - altura) <= 30);

    return jsonResponse(result.slice(0, 100));
  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
}
