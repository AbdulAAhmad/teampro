import { AuthActionTypes } from "./auth.types";
import { deleteValue, getValueFor, save } from "./auth.utils";
import getEnvVars from "../../../environment";

const { AuthApiUrl } = getEnvVars();

export async function authenticate(path, dispatch, authPayload) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authPayload),
  };

  try {
    dispatch({ type: AuthActionTypes.AUTH_REQUEST });
    let response = await fetch(`${AuthApiUrl}${path}`, requestOptions);
    let data = await response.json();

    if (data.success) {
      await save("token", data.token);
      await save("user_id", data.id);
      dispatch({ type: AuthActionTypes.AUTH_SUCCESS, payload: data });
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

export async function restoreUser(dispatch) {
  try {
    dispatch({ type: AuthActionTypes.AUTH_REQUEST });
    const token = await getValueFor("token");
    const user_id = await getValueFor("user_id");

    if (token && user_id) {
      dispatch({
        type: AuthActionTypes.AUTH_SUCCESS,
        payload: { token, id: user_id },
      });
      return;
    }
    dispatch({
      type: AuthActionTypes.AUTH_ERROR,
      error: { message: "Restore Failed" },
    });
  } catch (error) {
    dispatch({
      type: AuthActionTypes.AUTH_ERROR,
      error: { message: "Restore Failed" },
    });
    console.log(error);
  }
}

export async function signout(dispatch, token) {
  const requestOptions = {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: token },
  };

  try {
    let response = await fetch(`${AuthApiUrl}/signout`, requestOptions);

    if (response.ok) {
      dispatch({ type: AuthActionTypes.SIGNOUT });
      deleteValue("token");
      deleteValue("user_id");
    }
  } catch (error) {}
}
