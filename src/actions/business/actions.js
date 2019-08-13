import * as types from "./types";
//! GET ALL BUSSINESS QUESTIONS
export const getAll_Questions = payload => ({
  type: types.getAll_Questions,
  payload: payload
});

export const getAll_Questions_Success = payload => ({
  type: types.getAll_Questions_Success,
  payload: payload
});

export const getAll_Questions_Error = payload => ({
  type: types.getAll_Questions_Error,
  payload: payload
});
//! UPDATE QUESTIONS
export const UPDATE_QUESTIONS = payload => ({
  type: types.UPDATE_QUESTIONS,
  payload: payload
});
export const UPDATE_QUESTIONS_SUCCESS = payload => ({
  type: types.UPDATE_QUESTIONS_SUCCESS,
  payload: payload
});
export const UPDATE_QUESTIONS_ERROR = payload => ({
  type: types.UPDATE_QUESTIONS_ERROR,
  payload: payload
});
//! USERS
export const getAll_ConsumerUsers = payload => ({
  type: types.getAll_ConsumerUsers,
  payload: payload
});

export const getAll_ConsumerUsers_Success = payload => ({
  type: types.getAll_ConsumerUsers_Success,
  payload: payload
});

export const getAll_ConsumerUsers_Error = payload => ({
  type: types.getAll_ConsumerUsers_Error,
  payload: payload
});
