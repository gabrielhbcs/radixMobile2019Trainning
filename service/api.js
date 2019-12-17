import axios from 'axios'; // 1

// 2
const api = axios.create({
  baseURL: 'http://api.tvmaze.com/',
});

export default api;