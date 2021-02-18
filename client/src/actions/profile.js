import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  DELETE_PROFILE,
  CLEAR_PROFILE,
  GET_ALL_PROFILES,
  GET_REPOS
} from "./constants";

// Get all users profile
export const getProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get("api/profile");
    dispatch({
      type: GET_ALL_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get users profile by id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`api/profile/user${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all Github repos
export const getGithubRepos = (userName) => async (dispatch) => {
  try {
    const res = await axios.get(`api/profile/gitRepo/${userName}`);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};


// GETS THE PROFILE OF THE CURRENT USER
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// MAKES THE PROFILE FOR THE CURRENT USER
export const makeProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formData);
    const res = await axios.post("/api/profile", body, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard"); // history object is used to redirect because we can't use <Redirect/> in actions
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Adding experience of the user
export const addExperience = (formdata, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formdata);
    const res = await axios.put("api/profile/experience", body, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Deleting experience field of an user by its id
export const delExperience = (id, history) => async (dispatch) => {
  try {
    const link = `api/profile/experience/del/${id}`;
    const res = await axios.delete(link);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    //dispatch(setAlert("Education Field Added", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Adding education of the user
export const addEducation = (formdata, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(formdata);
    const res = await axios.put("api/profile/edu", body, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Field Added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Deleting education field of an user by its id
export const delEducation = (id, history) => async (dispatch) => {
  try {
    const link = `api/profile/edu/del/${id}`;
    const res = await axios.delete(link);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    //dispatch(setAlert("Education Field Added", "success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Deletes account and profile of a user
export const delAccount = (id) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure that you want to delete your account as this action is irreversible !!?"
    )
  ) {
    try {
      const link = `api/profile/del/${id}`;
      await axios.delete(link);

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: DELETE_PROFILE });

      dispatch(setAlert("Your account has been deleted permanently"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
