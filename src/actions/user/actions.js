import * as types from "./types";

//! LOGIN USER
export const checkLogin_User = payload => ({
  type: types.checkLogin_User,
  payload: payload
});
export const checkLogin_User_Success = payload => ({
  type: types.checkLogin_User_Success,
  payload: payload
});

export const checkLogin_User_Error = payload => ({
  type: types.checkLogin_User_Error,
  payload: payload
});
//! LOGOUT USER
export const logout_User = payload => ({
  type: types.logout_User,
  payload: payload
});

//! VERIFY USER
export const Verify = payload => ({
  type: types.Verify,
  payload: payload
});
export const Verify_Success = payload => ({
  type: types.Verify_Success,
  payload: payload
});
export const Verify_Error = payload => ({
  type: types.Verify_Error,
  payload: payload
});
//! GET ALL USER
export const getAll_User = payload => ({
  type: types.getAll_User,
  payload: payload
});
export const getAll_User_Success = payload => ({
  type: types.getAll_User_Success,
  payload: payload
});
export const getAll_User_Error = payload => ({
  type: types.getAll_User_Error,
  payload: payload
});
export const ViewProfile_User = payload => ({
  type: types.ViewProfile_User,
  payload: payload
});
