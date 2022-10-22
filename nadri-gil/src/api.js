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
      Accept:'application/json',

      'Content-Type': 'application/json',
      
    
    },
    body: JSON.stringify(data),
  }, { withCredentials: true })
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
    return axios.get(`${URL}/travels/random`);
  }

  export const getTravelDetail = async (id) => {

    return axios.get(`${URL}/travels/${id}/detail`);
  }

  export const postCart = async (data) => {
    return fetch(`${URL}/carts/add`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json());
  }
  
export const getTravelsAll = async () => {
  return fetch(`${URL}/travels/all`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json());
}
export const directions5api = async (direction) => {
  let start = direction[0].lng + ',' + direction[0].lat;
  let goal = direction[direction.length-1].lng + ',' + direction[direction.length-1].lat;
  let waypoints = ''
  if(direction.length > 2){
    for(let i = 1; i < direction.length -1; i++){
      waypoints += direction[i].lng + ',' + direction[i].lat;
      if(i < direction.length - 2) waypoints += '|'
    }
  }
  return fetch(`/api/map-direction/v1/driving?start=${start}&goal=${goal}&option=trafast:tracomfort:traoptimal&waypoints=${waypoints}`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-NCP-APIGW-API-KEY-ID":"mczr185hv8",
      "X-NCP-APIGW-API-KEY": "fK3YTgXVtMaULn4EULEbgABK0G0lC4wrHmSUVj6o"
    },
  })
    .then((response) => response.json());
}

export const getCart = async () => {
  return fetch(`${URL}/carts/myList`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json());
}

