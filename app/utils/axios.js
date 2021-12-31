import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001",
  timeout: 3000,
  withCredentials: true, // 表示跨域请求时是否需要使用凭证
});

instance.interceptors.request.use(
  function (request) {
    // Authorization: <type> <credentials>
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
    const token = window.localStorage.getItem("token");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    if (error.response.status === 401) {
      return (window.location.href = "http://localhost:8088/#/login");
    }
    return Promise.reject(error.response.data);
  }
);

export default instance;