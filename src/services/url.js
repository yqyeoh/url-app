import axios from "./axios";

const URL = "/url";

export async function shortenURL({ url }) {
  const { data } = await axios.post(URL, { url });
  return data.url;
}

export async function lengthenURL({ url }) {
  const { data } = await axios.get(URL, { params: { url } });
  return data.url;
}
