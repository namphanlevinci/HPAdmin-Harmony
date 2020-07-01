import * as types from "./types";

export const getAll_Transactions = (payload) => ({
  type: types.getAll_Transactions,
  payload: payload,
});

export const getAll_Transactions_Success = (payload) => ({
  type: types.getAll_Transactions_Success,
  payload: payload,
});

export const getAll_Transactions_Error = (payload) => ({
  type: types.getAll_Transactions_Error,
  payload: payload,
});

// P2PTRANSACTIONS

export const getP2P_Transactions = (payload) => ({
  type: types.getP2P_Transactions,
  payload: payload,
});

export const getP2P_Transactions_Success = (payload) => ({
  type: types.getP2P_Transactions_Success,
  payload: payload,
});

export const getP2P_Transactions_Error = (payload) => ({
  type: types.getP2P_Transactions_Error,
  payload: payload,
});

//! USER TRANSACTION
export const getUser_Transaction = (payload) => ({
  type: types.getUser_Transaction,
  payload: payload,
});

export const getUser_Transaction_Success = (payload) => ({
  type: types.getUser_Transaction_Success,
  payload: payload,
});

export const getUser_Transaction_Error = (payload) => ({
  type: types.getUser_Transaction_Error,
  payload: payload,
});
//! USER ACTIVITY

export const getUser_Activity = (payload) => ({
  type: types.getUser_Activity,
  payload: payload,
});

export const getUser_Activity_Success = (payload) => ({
  type: types.getUser_Activity_Success,
  payload: payload,
});

export const getUser_Activity_Error = (payload) => ({
  type: types.getUser_Activity_Error,
  payload: payload,
});

//! BATCH SETTLEMENT
export const getBatch = (payload) => ({
  type: types.getBatch,
  payload: payload,
});

export const getBatch_Success = (payload) => ({
  type: types.getBatch_Success,
  payload: payload,
});

export const getBatch_Error = (payload) => ({
  type: types.getBatch_Error,
  payload: payload,
});

//! GET BATCH DETAIL

export const getBatchDetail = (payload) => ({
  type: types.getBatchDetail,
  payload: payload,
});

export const getBatchDetail_Success = (payload) => ({
  type: types.getBatchDetail_Success,
  payload: payload,
});

export const getBatchDetail_Error = (payload) => ({
  type: types.getBatchDetail_Error,
  payload: payload,
});
