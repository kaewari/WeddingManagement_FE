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
  "branch-edit": (branchId) => `${SERVER_CONTEXT}/api/branch/${branchId}/`,
  "branch-activate": (branchId) => `${SERVER_CONTEXT}/api/branch/${branchId}/activate`,
  "branch-delete": (branchId) => `${SERVER_CONTEXT}/api/branch/${branchId}`,
  "hall-update": (hallId) => `${SERVER_CONTEXT}/api/hall/${hallId}`,
  "hall-create": (branchId) => `${SERVER_CONTEXT}/api/branch/${branchId}/add-new-halls`,
  "hall-deactivate": (hallId) => `${SERVER_CONTEXT}/api/hall/${hallId}/deactivate`,
  "hall-activate": (hallId) => `${SERVER_CONTEXT}/api/hall/${hallId}/activate`,
  "hall-delete": (hallId) => `${SERVER_CONTEXT}/api/hall/${hallId}`,
  "hall-price-update": (hallPriceId) => `${SERVER_CONTEXT}/api/hall/update-hall-price/${hallPriceId}`,
  "hall-price-delete": (hallPriceId) => `${SERVER_CONTEXT}/api/hall/delete-hall-price/${hallPriceId}`,
  "hall-price-create": (hallPriceId) => `${SERVER_CONTEXT}/api/hall/${hallPriceId}/add-hall-price`,
  "orders": `${SERVER_CONTEXT}/api/order`,
  "wedding": `${SERVER_CONTEXT}/api/wedding`,
  services: `${SERVER_CONTEXT}/api/wedding/service`,
  "service-create": `${SERVER_CONTEXT}/api/wedding/service`,
  "service-details": (serviceId) => `${SERVER_CONTEXT}/api/wedding/service/${serviceId}`,
  "service-update": (serviceId) => `${SERVER_CONTEXT}/api/wedding/service/${serviceId}`,
  "service-deactivate": (serviceId) => `${SERVER_CONTEXT}/api/wedding/service/${serviceId}/deactivate`,
  "service-activate": (serviceId) => `${SERVER_CONTEXT}/api/wedding/service/${serviceId}/activate`,
  "service-delete": (serviceId) => `${SERVER_CONTEXT}/api/wedding/service/${serviceId}`,
  "service-price-create": (serviceId) => `${SERVER_CONTEXT}/api/wedding/service/${serviceId}/add-service-price`,
  "service-price-update": (servicePriceId) => `${SERVER_CONTEXT}/api/wedding/service-price/${servicePriceId}`,
  "service-price-delete": (servicePriceId) => `${SERVER_CONTEXT}/api/wedding/service-price/${servicePriceId}`,
  "feedback": `${SERVER_CONTEXT}/api/feedback`,
  "feedback-details": (feedbackId) => `${SERVER_CONTEXT}/api/feedback/${feedbackId}`,
  "feedback-delete": (feedbackId) => `${SERVER_CONTEXT}/api/feedback/${feedbackId}`,
  "feedback-reply": (feedbackId) => `${SERVER_CONTEXT}/api/feedback/${feedbackId}/reply`,
  "feedback-create": (feedbackId) => `${SERVER_CONTEXT}/api/feedback/${feedbackId}`,
  login: `${SERVER_CONTEXT}/api/login/`,
  "current-user": `${SERVER_CONTEXT}/api/current-user/`,
  register: `${SERVER_CONTEXT}/api/users/add/`,
  pay: `${SERVER_CONTEXT}/api/pay/`,
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
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Headers': '*',
      // 'Access-Control-Allow-Methods': 'OPTIONS, POST, DELETE'
    },
  });
};

export default axios.create({
  baseURL: SERVER,
});

export {SERVER, SERVER_CONTEXT}