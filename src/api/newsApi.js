import axios from "axios";

const API_URL = "http://localhost:5000/api/news"; // adjust if your backend runs on another port

export const fetchAllNews = () => axios.get(API_URL);
export const fetchNewsById = (id) => axios.get(`${API_URL}/${id}`);
export const createNews = (newsData) => axios.post(API_URL, newsData);
export const updateNews = (id, newsData) => axios.put(`${API_URL}/${id}`, newsData);
export const deleteNews = (id) => axios.delete(`${API_URL}/${id}`);
