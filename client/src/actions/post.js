import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  UPDATE_DISLIKES,
  ADD_POSTS,
  UPDATE_COMMENTS,
} from "./constants";

// Get posts
export const fetchPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Adding Likes to the post
export const addLike = (postId) => async (dispatch) => {
  try {
    const url = `/api/posts/like/${postId}`;
    const res = await axios.put(url);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Removing Likes from the post
export const removeLike = (postId) => async (dispatch) => {
  try {
    const url = `/api/posts/dislike/${postId}`;
    const res = await axios.put(url);

    dispatch({
      type: UPDATE_DISLIKES,
      payload: { postId, dislikes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Deleting a post by its id
export const removePost = (postId) => async (dispatch) => {
  try {
    const url = `/api/posts/del/${postId}`;
    const res = await axios.delete(url);

    dispatch(setAlert("Post Deleted", "success"));
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Creating a new post
export const addPost = (formData, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const url = `/api/posts/newPost`;
    const res = await axios.post(url, formData, config);

    dispatch({
      type: ADD_POSTS,
      payload: res.data,
    });
    dispatch(setAlert("Post Created", "success"));
    history.push("/posts");
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get a single post by its id
export const fetchPost = (postId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${postId}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Adding a new comment
export const addComment = (formData, postId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const url = `/api/posts/comment/${postId}`;
    const res = await axios.post(url, formData, config);

    dispatch({
      type: UPDATE_COMMENTS,
      payload: res.data,
    });
    dispatch(setAlert("Your comment has been posted", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Removing a comment
export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    const url = `/api/posts/comment/del/${postId}/${commentId}`;
    const res = await axios.delete(url);

    dispatch({
      type: UPDATE_COMMENTS,
      payload: res.data,
    });
    dispatch(setAlert("Your comment has been deleted", "danger"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
