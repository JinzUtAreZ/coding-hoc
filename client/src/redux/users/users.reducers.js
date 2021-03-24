import { UserActionsTypes } from "./users.types";

const INI_STATE = {
  currentUser: null,
  error: null,
};

const userReducer = (state = INI_STATE, action) => {
  switch (action.type) {
    case UserActionsTypes.SET_CURRENT_USER:
      console.log(action.payload);
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
