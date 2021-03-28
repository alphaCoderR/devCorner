import {
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  UPDATE_DISLIKES,
  ADD_POSTS,
  UPDATE_COMMENTS
} from "../actions/constants";


const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
      case GET_POST:
        return {
          ...state,
          post:payload,
          loading:false
        }
    case ADD_POSTS:
      return {
        ...state,
        posts: [payload,...state.posts],
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case UPDATE_DISLIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId
            ? { ...post, dislikes: payload.dislikes }
            : post
        ),
        loading: false,
      };
      case UPDATE_COMMENTS:
        return {
          ...state,
          post:{...state.post,comments:payload},
          loading:false
        };

    default:
      return state;
  }
}
