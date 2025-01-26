import axios from "axios";
import {  decryptToken, getData } from "./Helper";

// export const Api = axios.create({
//     baseURL: import.meta.env.VITE_API_URI_BASE, 
// });

const apiUrl = import.meta.env.VITE_API_URI_BASE;
axios.defaults.baseURL = apiUrl + "/api";
axios.interceptors.request.use(
  async function (config) {
    /** Intercepter du token utilisateur et l'utiliser tant que disponible */
    if (!checkingFreeRoute(config.url)) {
      const decryptToken = "";
    const token =  localStorage.getItem("token")
    // if(token) 
    //   decryptToken = decryptToken(token);

    
      // console.log(access_token);
      if (typeof token === "string") {
       
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["cache-control"] = `no-cache`;
      }
    }

    return config;
  },
  function (err) {
    console.log("Erreur", err);
  }
);

const checkingFreeRoute = (url) => {
  if (url.includes("noToken")) return true;
  return false;
};

/**
 *
 * @param {string} resource_url
 * @param {Array} filters
 * @param {number} limit
 */
export const getResource = (resource_url,  options = {}) => {
  
  return axios.get(resource_url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      withCredentials: true,
      "Access-Control-Allow-Origin": "*"
    },
    ...options,
      
    
  });
};

/**
 *
 * @param {string} resource_url - Url for API
 * @param {object} data - Data
 * @param {object} headers
 */
export const postResource = (resource_url, data) => {
  return axios.post(resource_url, data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      withCredentials: true,
      "Access-Control-Allow-Origin": "*"
    },
  });
};

export const postFile = (resource_url, data) => {
  return axios.post(resource_url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
};

export const patchFile = (resource_url, data) => {
  return axios.patch(resource_url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    },
  });
};

/**
 *
 * @param {string} resource_url
 * @param {number} id
 * @param {object} data
 * @param {object} headers
 */
export const putResource = (resource_url, id, data) => {
  return axios.put(resource_url + "/" + id, data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export const patchResource = (resource_url, id, data) => {
  return axios.patch(resource_url + "/" + id, data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
};

export const putResourceByUrl = (resource_url, data, headers) => {
  return axios.put(resource_url, data, headers);
};

/**
 *
 * @param {string} resource_url
 * @param {number} id
 */
export const removeResource = (resource_url, id) => {
  //return axios.delete(resource_url + "/" + id);
  return axios.delete(resource_url, { data: { id: id } });
};
