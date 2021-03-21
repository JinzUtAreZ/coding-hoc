import { UserActionsTypes } from "./users.types";

export const setCurrentUser = (user) => ({
  type: UserActionsTypes.SET_CURRENT_USER,
  payload: user,
});
