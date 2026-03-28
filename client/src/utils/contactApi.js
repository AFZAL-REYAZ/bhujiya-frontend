import API from "../config/api/apiconfig";

export async function submitContactEnquiry(payload) {
  const { data } = await API.post("/users/contact-enquiry", payload);
  return data;
}
