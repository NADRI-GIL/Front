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

export const getTravelsAll = async () => {
  return fetch(`${URL}/travels/all`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json());
}
export const directions5api = async () => {
  return fetch(`/api/map-direction/v1/driving?start=127.45521181369443, 36.629567359731475&goal=127.45502402553248, 36.63565971545496&option=trafast`, {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "X-NCP-APIGW-API-KEY-ID":"mczr185hv8",
      "X-NCP-APIGW-API-KEY": "fK3YTgXVtMaULn4EULEbgABK0G0lC4wrHmSUVj6o"
    },
  })
    .then((response) => response.json());
}