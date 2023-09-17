import axios from 'axios';
const GET_ALL_EVENTS = '/events';

axios.defaults.baseURL = 'https://tasty-treats-backend.p.goit.global/api';
// Додаємо перехоплювач відповідей
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
    console.log(error);
  }
);

export async function getAllEvents() {
  const response = await axios.get(`${GET_ALL_EVENTS}`);

  return response.data;
}
