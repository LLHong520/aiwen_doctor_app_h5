import axios from "axios";
require("promise.prototype.finally").shim();
var qs = require("qs");
import {
  API_URL
} from "@/config";
import Auth from "@/auth";
// axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
let appToken = localStorage.getItem("phone_concult_doctor_token");
axios.defaults.headers["X-Wenwo-Token"] = appToken == undefined ? "" : appToken;
// axios.defaults.headers["X-Wenwo-Token"] = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NTUzODEwOTM4MzcsInBheWxvYWQiOiJcIjE1ODI3NzkzODYyXCIifQ.uuPIZlOGpgjYdkc4reByJ39lA74H9u2euyp7xmQsKUU";
axios.defaults.headers["token"] = Auth.token() || "wenwo-cloud-doctor-token";
let channel = sessionStorage.getItem("channel");
axios.defaults.headers["channel"] = channel || "";
axios.defaults.timeout = 50000;
axios.interceptors.response.use(function (response) {
  // Do something with response data
  if (response.data.status == "401") {
    toast.tip("请重新登录");
    try {
      window.webkit.messageHandlers.appTokenInvalid.postMessage("");
    } catch (error) {
      try {
        window.kxx.appTokenInvalid();
      } catch (error) {
        window.iwenJSNativeBridge.appLogin();
      }
    }
  }
  return response;
}, function (error) {
  toast.tip("网络走丢了~");
  return Promise.reject(error);
});

export default {
  get: function (url, data = {}) {
    url = API_URL + url;
    return axios.get(url, {
      params: data
    })
      .then((res) => {
        return Promise.resolve(res.data);
      });
  },
  post: function (url, data = {}) {
    url = API_URL + url;
    return axios.post(url, data)
      .then((res) => {
        return Promise.resolve(res.data);
      });
  },
  postFile: function (url, data) {
    url = API_URL + url;
    let config = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };
    return axios.post(url, data, config)
      .then((res) => {
        return Promise.resolve(res.data);
      });
  },
  postForm: function (url, data) {
    url = API_URL + url;
    let config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };
    return axios.post(url, qs.stringify(data), config)
      .then((res) => {
        return Promise.resolve(res.data);
      });
  },
  getJson: function (url, data = {}) {
    url = API_URL + url;
    let dataJson = {
      dataJson: data
    };
    return axios.get(url, {
      params: dataJson
    })
      .then((res) => {
        return Promise.resolve(res.data);
      });
  },
  postJson: function (url, data = {}) {
    url = API_URL + url;
    let dataJson = {
      dataJson: JSON.stringify(data)
    };
    return axios.post(url, qs.stringify(dataJson))
      .then((res) => {
        return Promise.resolve(res.data);
      });
  },
};
