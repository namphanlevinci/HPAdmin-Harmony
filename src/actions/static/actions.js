import * as types from "./types";

// APPROVED STATICS
export const APPROVED_STATICS = (payload) => ({
  type: types.APPROVED_STATICS,
  payload: payload,
});

export const APPROVED_STATICS_SUCCESS = (payload) => ({
  type: types.APPROVED_STATICS_SUCCESS,
  payload: payload,
});
export const APPROVED_STATICS_ERROR = (payload) => ({
  type: types.APPROVED_STATICS_ERROR,
  payload: payload,
});
