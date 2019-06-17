
import * as types from './types'
export const checkLogin_Agent = (payload) => ({
    type: types.checkLogin_Agent,
    payload: payload
  });
  export const checkLogin_Agent_Success = (payload) => ({
    type: types.checkLogin_Agent_Success,
    payload: payload
  });
  
  export const checkLogin_Agent_Error = (payload) => ({
    type: types.checkLogin_Agent_Error,
    payload: payload
  });
  
  export const logout_Agent = (payload) => ({
    type: types.logout_Agent,
    payload: payload
  })