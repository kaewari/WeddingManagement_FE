import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/QLTC";
const SERVER = "http://localhost:8080";

export const endpoints = {
  dishes: `${SERVER_CONTEXT}/api/dish/`,
  "dish-details": (dishId) => `${SERVER_CONTEXT}/api/dish/${dishId}/`,
  services: `${SERVER_CONTEXT}/api/services/`,
  login: `${SERVER_CONTEXT}/api/login/`,
  "current-user": `${SERVER_CONTEXT}/api/current-user/`,
  register: `${SERVER_CONTEXT}/api/users/add/`,
  pay: `${SERVER_CONTEXT}/api/pay/`,
  "service-details": (serviceId) =>
    `${SERVER_CONTEXT}/api/services/${serviceId}/`,
  comments: `${SERVER_CONTEXT}/api/comments/`,
  // "add-comment": `${SERVER_CONTEXT}/api/comments/`,
  branch: {
    Index: (search) => `${SERVER_CONTEXT}/api/branch`
  }
};

export const authApi = () => {
  return axios.create({
    baseURL: SERVER,
    headers: {
      Authorization: cookie.load("token").access_token,
    },
  });
};

export default axios.create({
  baseURL: SERVER,
});
