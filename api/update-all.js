import { fetchText, jsonResponse } from '.datasets_utils.js';

export const config = { runtime 'edge' };

const DATASETS = {
  parcelario 'httpsdata.buenosaires.gob.ardatasetparcelas',
  cur2024 'httpsdata.buenosaires.gob.ardatasetcodigo-urbanisticoresourced569079d-8d9c-48c3-8477-f28ebedfeac6',
  cpu 'httpsdata.buenosaires.gob.ardatasetcodigo-planeamiento-urbano',
  afectaciones 'httpsdata.buenosaires.gob.ardatasetareas-proteccion-historicaresourcejuqdkmgo-91-resource'
};

export default async function handler() {
  const result = {};
  for (const [key, url] of Object.entries(DATASETS)) {
    try {
      const txt = await fetchText(url);
      result[key] = { ok true, bytes txt.length };
    } catch (err) {
      result[key] = { ok false, error err.message };
    }
  }
  return jsonResponse(result);
}
