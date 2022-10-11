import axios from "axios";

const URL = "http://13.124.150.86:8080"

export const postSignup = async (data) => {
    return fetch(`${URL}/users/signUp`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json());
  }

  export const postLogin = async (data) => {
    return fetch(`${URL}/users/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json());
  }
  export const getPreference = async (data) => {
    return fetch(`${URL}/travels/random`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json());
  }

  export const getMain = async (data) => {
    return axios.get(`${URL}/travels/all`);
  }

  export const getTravelDetail = async (id) => {

    return axios.get(`${URL}/travels/${id}/detail`);
  }

  export const getCart = async (id) => {

    return axios.get(`${URL}/carts/add/${id}`);
  }