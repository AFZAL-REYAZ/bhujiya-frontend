import API from '../api/axios';

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const { data } = await API.post('/users/login', { email, password });
    localStorage.setItem('token', data.token); // Token save karein
    localStorage.setItem('user', JSON.stringify(data)); // User info save karein
    alert("Login Successful!");
    window.location.href = "/"; // Home par bhejein
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};