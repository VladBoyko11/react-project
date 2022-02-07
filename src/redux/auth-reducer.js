import { stopSubmit } from "redux-form";
import { authAPI } from "../API/API";

let initialState = {
  userId: null,
  email: null,
  password: null,
  rememberMe: false,
  isAuth: false,
};

export const authReducer = (state = initialState, action) => {
  const SET_USER_DATA = "SET_USER_DATA";
  switch (action.type) {
    case SET_USER_DATA: {
      return { ...state, ...action.data };
    }
    default:
      return state;
  }
};

export const authorizatedUser = () => (dispatch) => {
  return authAPI.authorizeUser().then((response) => {
    if (response.data.resultCode === 0) {
      let { email, password } = response.data.data;
      dispatch(
        setUserSuccess(response.data.data.id, email, password, false, true)
      );
    }
  });
};

export const setUserSuccess = (userId, email, password, rememberMe, isAuth) => {
  return {
    type: "SET_USER_DATA",
    data: { userId, email, password, rememberMe, isAuth },
  };
};

export const login = (email, password, rememberMe) => (dispatch) => {
  authAPI.login(email, password, rememberMe).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(
        setUserSuccess(
          response.data.data.userId,
          email,
          password,
          rememberMe,
          true
        )
      );
    } else {
      dispatch(stopSubmit("loginForm", { _error: response.data.messages[0] }));
    }
  });
};

export const logout = () => (dispatch) => {
  authAPI.logout().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setUserSuccess(null, null, null, false, false));
    }
  });
};
