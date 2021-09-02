import { AuthActionTypes } from "./auth.types";

const AUTH_ROOT_URL = `${process.env.REACT_APP_API_URL}/auth`;

export async function authenticate(path, dispatch, authPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authPayload),
  };

  try {
    dispatch({ type: AuthActionTypes.AUTH_REQUEST });
    let response = await fetch(`${AUTH_ROOT_URL}${path}`, requestOptions);
    let data = await response.json();

    if (data.success) {
      dispatch({ type: AuthActionTypes.AUTH_SUCCESS, payload: data });
      localStorage.setItem("token", JSON.stringify(data.token));
      localStorage.setItem("user_id", JSON.stringify(data.id));
      return data;
    }

    dispatch({
      type: AuthActionTypes.AUTH_ERROR,
      error: { message: data.error },
    });
    console.log(data.error);
    return null;
  } catch (error) {
    dispatch({ type: AuthActionTypes.AUTH_ERROR, error: error });
    console.log(error);
  }
}

export async function signout(dispatch) {
  dispatch({ type: AuthActionTypes.SIGNOUT });
  localStorage.removeItem("token");
  localStorage.removeItem("user_id");
}
