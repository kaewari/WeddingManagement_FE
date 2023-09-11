import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/QLTC";
const SERVER = "http://localhost:8080";

export const endpoints = {
  dishes: `${SERVER_CONTEXT}/api/dish`,
  "dish-details": (dishId) => `${SERVER_CONTEXT}/api/dish/${dishId}/`,
  "dish-edit": (dishId) => `${SERVER_CONTEXT}/api/dish/${dishId}/update/`,
  "dish-create": `${SERVER_CONTEXT}/api/dish`,
  "dish-delete": (dishId) => `${SERVER_CONTEXT}/api/dish/${dishId}/`,
  "dish-deactivate": (dishId) => `${SERVER_CONTEXT}/api/dish/${dishId}/deactivate`,
  "dish-activate": (dishId) => `${SERVER_CONTEXT}/api/dish/${dishId}/activate`,
  branches: `${SERVER_CONTEXT}/api/branch`,
  "branch-details": (branchId) => `${SERVER_CONTEXT}/api/branch/${branchId}`,
  "branch-deactivate": (branchId) => `${SERVER_CONTEXT}/api/branch/${branchId}/deactivate`,
  "branch-create": `${SERVER_CONTEXT}/api/branch`,
  "branch-edit": (branchId) => `${SERVER_CONTEXT}/api/branch/${branchId}/update/`,
  "branch-activate": (branchId) => `${SERVER_CONTEXT}/api/branch/${branchId}/activate`,
  "branch-delete": (branchId) => `${SERVER_CONTEXT}/api/branch/${branchId}`,
  "orders": `${SERVER_CONTEXT}/api/order`,
  "wedding": `${SERVER_CONTEXT}/api/wedding`,
  services: `${SERVER_CONTEXT}/api/wedding/service/`,
  login: `${SERVER_CONTEXT}/api/login/`,
  "current-user": `${SERVER_CONTEXT}/api/current-user/`,
  register: `${SERVER_CONTEXT}/api/users/add/`,
  "update-user": (userId) => `${SERVER_CONTEXT}/api/users/update/${userId}/`,
  pay: `${SERVER_CONTEXT}/api/pay/`,
  "service-details": (serviceId) =>
    `${SERVER_CONTEXT}/api/services/${serviceId}/`,
  comments: `${SERVER_CONTEXT}/api/comments/`,
  revenue: `${SERVER_CONTEXT}/api/stats/`,
  "top-best-selling-dishes": (top) => `${SERVER_CONTEXT}/api/dishes/top/${top}`,
  "top-best-selling-halls": (top) => `${SERVER_CONTEXT}/api/halls/top/${top}`,
  "top-best-selling-services": (top) => `${SERVER_CONTEXT}/api/services/top/${top}`,
  branch: {
    Index: (search) => `${SERVER_CONTEXT}/api/branch`,
  },
};

export const authApi = () => {
  return axios.create({
    baseURL: SERVER,
    headers: {
      Authorization: cookie.load("token").access_token
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': '*',
      // 'Access-Control-Allow-Methods': 'OPTIONS, POST, DELETE'
    },
  });
};

export default axios.create({
  baseURL: SERVER,
});

export {SERVER, SERVER_CONTEXT}