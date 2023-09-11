import axios from "axios";
import cookie from "react-cookies";

const SERVER_CONTEXT = "/QLTC";
const SERVER = "http://localhost:8080";

export const endpoints = {
  dishes: `${SERVER_CONTEXT}/api/dish/`,
  "dish-details": (dishId) => `${SERVER_CONTEXT}/api/dish/${dishId}/`,
  services: `${SERVER_CONTEXT}/api/wedding/service/`,
  login: `${SERVER_CONTEXT}/api/login/`,
  employee: `${SERVER_CONTEXT}/api/employees/`,
  "employee-detail": (employeeId) =>
    `${SERVER_CONTEXT}/api/employees/id/${employeeId}/`,
  "employee-update": (employeeId) =>
    `${SERVER_CONTEXT}/api/employees/update/${employeeId}/`,
  "employee-delete": (employeeId) =>
    `${SERVER_CONTEXT}/api/employees/delete/${employeeId}/`,
  "current-user": `${SERVER_CONTEXT}/api/current-user/`,
  register: `${SERVER_CONTEXT}/api/users/add/`,
  "update-user": (userId) => `${SERVER_CONTEXT}/api/users/update/${userId}/`,
  pay: `${SERVER_CONTEXT}/api/pay/`,
  "service-details": (serviceId) =>
    `${SERVER_CONTEXT}/api/services/${serviceId}/`,
  comments: `${SERVER_CONTEXT}/api/comments/`,
  "revenue-year": `${SERVER_CONTEXT}/api/stats/year/`,
  "revenue-date": `${SERVER_CONTEXT}/api/stats/date/`,
  "top-best-selling-dishes": (top) =>
    `${SERVER_CONTEXT}/api/dishes/top/${top}/`,
  "top-best-selling-halls": (top) => `${SERVER_CONTEXT}/api/halls/top/${top}/`,
  "top-best-selling-services": (top) =>
    `${SERVER_CONTEXT}/api/services/top/${top}`,
  branch: {
    Index: (search) => `${SERVER_CONTEXT}/api/branch`,
  },
};

export const authApi = () => {
  return axios.create({
    baseURL: SERVER,
    headers: {
      Authorization: cookie.load("token").access_token,
      "Content-Type": "multipart/form-data",
    },
  });
};

export default axios.create({
  baseURL: SERVER,
});
