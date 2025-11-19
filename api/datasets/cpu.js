import { fetchAndNormalizeCSV, normalizeCPU, jsonResponse } from './_utils.js';

const URL = 'https://data.buenosaires.gob.ar/dataset/codigo-planeamiento-urbano';

export const config = { runtime: 'edge' };

export default async function handler() {
  try {
    return jsonResponse(await fetchAndNormalizeCSV(URL, normalizeCPU));
  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
}