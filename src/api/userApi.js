import axios from "axios";

// Get profile
export const getProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  return await axios.get("http://localhost:5000/api/auth/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Update profile
export const updateProfile = async (data) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  return await axios.put("http://localhost:5000/api/auth/update", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
