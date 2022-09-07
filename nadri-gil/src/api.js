const URL = "http://43.200.49.4:8080"

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