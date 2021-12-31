import axios from "../utils/axios";

export function Login({ username, password }) {
  return axios.request({
    url: "/login",
    method: "POST",
    data: {
      username,
      password,
    },
  });
}

export function Register({ username, password }) {
  return axios.request({
    url: "/register",
    method: "POST",
    data: {
      username,
      password,
    },
  });
}

export function GetUser(userId) {
  return axios.request({
    url: `/getUserWithRole?userId=${userId}`,
    method: "GET"
  });
}
