
import axios from 'axios';

// Crie uma instância do axios
const api = axios.create({
  baseURL: 'http://localhost:8080', // Base URL para sua API
});

// Adicione um interceptor para incluir o token no cabeçalho Authorization
api.interceptors.request.use(config => {
  // Obtenha o token armazenado (por exemplo, no localStorage)
  const token = localStorage.getItem('token');
  if (token) {
    // Adicione o token ao cabeçalho Authorization
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export { api };
