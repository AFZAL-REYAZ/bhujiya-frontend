const ORDER_API_BASE =
  import.meta.env.VITE_ORDER_API_URL || "http://localhost:5000/api";

export async function submitQuote(payload) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${ORDER_API_BASE}/orders/quote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Failed to submit quote");
  }
  return data;
}
