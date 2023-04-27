import axios from "axios";
import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';

import IOption from "../types/option.type";

const API_URL = "http://localhost:2020/api/auth/";

// const request = (options: RequestInit | undefined) => {
//   const headers = new Headers({
//       'Content-Type': 'application/json',
//   })
  
//   if(localStorage.getItem(ACCESS_TOKEN)) {
//       headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
//   }

//   const defaults = {headers: headers};
//   options = Object.assign({}, defaults, options);

//   console.log("options.url...",options.url);
//   console.log("options...",options);

//   return fetch(options.url, options)
//   .then(response => 
//       response.json().then(json => {
//           if(!response.ok) {
//               return Promise.reject(json);
//           }
//           return json;
//       })
//   );
// };                   

export const register = (username: string, email: string, password: string) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// export function login2(loginRequest: any) {
//   return request({
//       url: API_BASE_URL + "/auth/signin",
//       method: 'POST',
//       body: JSON.stringify(loginRequest)
//   });
// }

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
