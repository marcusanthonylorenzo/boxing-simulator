import axios from "axios";

const randomUserAPI = {
  get: () => {
    return new Promise((resolve, reject) => {
      axios
        .get("https://randomuser.me/api/?results=30")
        .then((response) => {
          console.log("called")
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};
export default randomUserAPI;