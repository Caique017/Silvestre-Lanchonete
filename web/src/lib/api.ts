import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-docker-141213034707.us-central1.run.app',
});

export default api;
