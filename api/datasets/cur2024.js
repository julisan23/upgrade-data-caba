import { fetchAndNormalizeCSV, normalizeCUR2024, jsonResponse } from './_utils.js';

const URL = 'https://data.buenosaires.gob.ar/dataset/codigo-urbanistico/resource/d569079d-8d9c-48c3-8477-f28ebedfeac6';

export const config = { runtime: 'edge' };

export default async function handler() {
  try {
    return jsonResponse(await fetchAndNormalizeCSV(URL, normalizeCUR2024));
  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
}
