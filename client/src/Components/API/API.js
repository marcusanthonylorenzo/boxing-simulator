import axios from "axios";

const randomUserAPI = {
  get: () => {
    return new Promise((resolve, reject) => {
      axios
        .get("https://randomuser.me/api/?results=3")
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
};

export default randomUserAPI;

// .getRandomUserNames()
// .then((response) => setDetails(response.data.results));