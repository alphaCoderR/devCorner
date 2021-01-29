import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED
} from "./constants";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./alert";
import axios from "axios";

// ********* LOAD USER **********
export const loadUser = () => async (dispatch) => {
  // Checking the local storage for the token
  if (localStorage.token) {
    setAuthToken(localStorage.token); // Setting the header with the given token
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// ********* REGISTER USER *********
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }

    dispatch({
      type: REGISTER_FAILURE,
    });
  }
};

// ********* USER LOGIN *********
export const login = ({email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({email, password });

  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response;

    if (errors) {
      console.log(errors);
      /*errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });*/
    }

    dispatch({
      type: LOGIN_FAILED,
    });
  }
};
