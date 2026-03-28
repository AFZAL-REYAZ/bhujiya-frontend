import API from "../config/api/apiconfig";

export async function submitQuote(payload) {
  const { data } = await API.post("/orders/quote", payload);
  return data;
}
