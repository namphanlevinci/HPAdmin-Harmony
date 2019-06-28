
import * as types from './types'

export const checkLogin_User = (payload) => ({
    type: types.checkLogin_User,
    payload: payload
  });
export const checkLogin_User_Success = (payload) => ({
    type: types.checkLogin_User_Success,
    payload: payload
  });
  
export const checkLogin_User_Error = (payload) => ({
    type: types.checkLogin_User_Error,
    payload: payload
  });
  
export const logout_User = (payload) => ({
    type: types.logout_User,
    payload: payload
  })
export const getAll_User = (payload) => ({
    type: types.getAll_User,
    payload: payload
  });
export const getAll_User_Success = (payload) => ({
    type: types.getAll_User_Success,
    payload: payload
  });
export const getAll_User_Error = (payload) => ({
    type: types.getAll_User_Error,
    payload: payload
  });
export const ViewProfile_User = (payload) => ({
    type: types.ViewProfile_User,
    payload: payload
  })