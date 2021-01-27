import { SET_ALERT, REMOVE_ALERT } from "../actions/constants";

const initialState = []; // It should contain objects of states

export default function (state = initialState, action) {
  // "action" contains 2 mandatory things : type & payload(body of the data)
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
