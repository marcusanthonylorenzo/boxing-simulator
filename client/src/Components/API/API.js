import axios from "axios";

export const randomUserAPI = {
  get: () => {
    return new Promise((resolve, reject) => {
      axios
        .get("https://randomuser.me/api/?results=5")
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};

export const cats = {
  getCat: () => {
    return new Promise((resolve, reject) => {
      axios
        .get("https://api.thecatapi.com/v1/images/search?limit=1")
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
}