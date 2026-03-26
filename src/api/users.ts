import api from './axios'

const BASE_URL = "https://data2-training-e3251105-dev.apps.rm2.thpm.p1.openshiftapps.com";

export async function getProgress(user_id: string) {
  const res = await api.get(`${BASE_URL}/api/users/${user_id}/progress`)
  return res.data
}
