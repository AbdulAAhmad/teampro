import { AuthActionTypes } from "./auth.types";
import { getValueFor } from "./auth.utils";

export const initialState = {
  token: "",
  user_id: "",
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.AUTH_REQUEST:
      return {
        ...initialState,
        loading: true,
      };
    case AuthActionTypes.AUTH_SUCCESS:
      return {
        ...initialState,
        token: action.payload.token,
        user_id: action.payload.id,
        loading: false,
        errorMessage: null,
      };
    case AuthActionTypes.AUTH_ERROR:
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error.message,
      };
    case AuthActionTypes.SIGNOUT:
      return {
        ...initialState,
        token: "",
        user_id: "",
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
