// filepath: c:\Users\diego\Desktop\Proyectos\webshopFRONT\src\utils\axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://mindful-insight-production.up.railway.app/api', // Cambia esto a la URL base de tu API
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Asegúrate de que Axios maneje correctamente los errores
      return Promise.reject(error);
    }
  );

export default axiosInstance;