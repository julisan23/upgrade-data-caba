import { fetchAndNormalizeCSV, normalizeAfectaciones, jsonResponse } from './_utils.js';

const URL = 'https://data.buenosaires.gob.ar/dataset/areas-proteccion-historica/resource/juqdkmgo-91-resource';

export const config = { runtime: 'edge' };

export default async function handler() {
  try {
    return jsonResponse(await fetchAndNormalizeCSV(URL, normalizeAfectaciones));
  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
}