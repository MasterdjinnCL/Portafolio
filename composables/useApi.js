






import axios from 'axios';

export const useApi = () => {
  const config = useRuntimeConfig();
  
  
  const apiClient = axios.create({
    baseURL: config.public.apiBase || '/data',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

  
  apiClient.interceptors.request.use(
    (config) => {
      
      
      console.log(`[API] Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error('[API] Error en request:', error);
      return Promise.reject(error);
    }
  );

  
  apiClient.interceptors.response.use(
    (response) => {
      console.log(`[API] Response: ${response.status} ${response.config.url}`);
      return response;
    },
    (error) => {
      
      let errorMessage = 'Ha ocurrido un error inesperado';
      
      if (error.response) {
        
        errorMessage = `Error ${error.response.status}: ${error.response.statusText}`;
      } else if (error.request) {
        
        errorMessage = 'No se pudo conectar con el servidor';
      } else {
        
        errorMessage = error.message;
      }
      
      console.error('[API] Error:', errorMessage);
      return Promise.reject(new Error(errorMessage));
    }
  );

  return {
    apiClient,
    
    




    get: (url, config = {}) => apiClient.get(url, config),
    
    





    post: (url, data, config = {}) => apiClient.post(url, data, config),
    
    





    put: (url, data, config = {}) => apiClient.put(url, data, config),
    
    




    delete: (url, config = {}) => apiClient.delete(url, config)
  };
};
