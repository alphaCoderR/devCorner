import axios from "axios";

const setAuthToken = (token) => {
  /* *** If a token exists then we are setting the global header with our token and sending it everytime to 
        check if a user is authenticated or not
    */
  if (token) {
    axios.defaults.headers.common["auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["auth-token"];
  }
};

export default setAuthToken;