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
  let start = direction[0].longitude + ',' + direction[0].latitude;
  let goal = direction[direction.length-1].longitude + ',' + direction[direction.length-1].latitude;
  let waypoints = ''
  if(direction.length > 2){
    for(let i = 1; i < direction.length -1; i++){
      waypoints += direction[i].longitude + ',' + direction[i].latitude;
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

export const getCart = async (data) => {
  return fetch(`${URL}/carts/myList`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json());
}

export const postCourse = async (data) => {
  return fetch(`${URL}/courses/add`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json());
}



export const getCourse = async (data) => {
  return fetch(`${URL}/courses/myList`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json());
}

export const postHeart = async (data) => {
  return fetch(`${URL}/hearts/add`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json());
}


export const getHeart = async (data) => {
  return fetch(`${URL}/hearts/myList`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json());
}

export const postReviewImage = async () => {
  return fetch(`${URL}/upload`, {
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((response) => response.json());
}


// export const getMostHeart = async () => {
//   return fetch(`${URL}/travels/heart`, {
//     method: "get",
//     headers: {
//       "Content-Type": "application/json",
//     },

//   })
//     .then((response) => response.json());
// }

export const  getMostHeart  = async (data) => {
  return axios.get(`${URL}/travels/heart`);
}