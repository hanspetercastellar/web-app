import axios from "axios";
import {getToken} from "../helpers/auth.helper";

const baseUri = "http://localhost:3002/api";

var axiosDef = axios.create();
axiosDef.defaults.headers.common["cache-control"] = "no-cache";
axiosDef.defaults.headers.post["Content-Type"] = "no-cache";
axiosDef.defaults.headers.put["Content-Type"] = "no-cache";
axiosDef.defaults.baseURL = baseUri;

export const Daxios = axiosDef;

//********Confguracion para las peticiones protegidas********** */

var axiosPrivate = axios.create();
axiosPrivate.defaults.headers.common["cache-control"] = "no-cache";
axiosPrivate.defaults.headers.post["Content-Type"] = "no-cache";
axiosPrivate.defaults.headers.put["Content-Type"] = "no-cache";
axiosPrivate.defaults.baseURL = baseUri;

export const setJWT = (token) => {
  axiosPrivate.defaults.headers.common["x_access_token"] = "baerer " + token;
};
export const removeJWT = () => {
  axiosPrivate.defaults.headers.common["x_access_token"] = "";
};

axiosPrivate.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export const Paxios = axiosPrivate;
