import * as types from "./types";

export const getAll_Transactions = payload => ({
  type: types.getAll_Transactions,
  payload: payload
});

export const getAll_Transactions_Success = payload => ({
  type: types.getAll_Transactions_Success,
  payload: payload
});

export const getAll_Transactions_Error = payload => ({
  type: types.getAll_Transactions_Error,
  payload: payload
});

//!! USER TRANSACTION
export const getUser_Transaction = payload => ({
  type: types.getUser_Transaction,
  payload: payload
});

export const getUser_Transaction_Success = payload => ({
  type: types.getUser_Transaction_Success,
  payload: payload
});

export const getUser_Transaction_Error = payload => ({
  type: types.getUser_Transaction_Error,
  payload: payload
});
//!! USER ACTIVITY
export const getUser_Activity = payload => ({
  type: types.getUser_Activity,
  payload: payload
});

export const getUser_Activity_Success = payload => ({
  type: types.getUser_Activity_Success,
  payload: payload
});

export const getUser_Activity_Error = payload => ({
  type: types.getUser_Activity_Error,
  payload: payload
});
