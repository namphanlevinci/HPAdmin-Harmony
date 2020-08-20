import * as types from "./types";

export const SUCCESS_NOTIFICATION = (payload) => ({
  type: types.SUCCESS_NOTIFICATION,
  payload: payload,
});

export const FAILURE_NOTIFICATION = (payload) => ({
  type: types.FAILURE_NOTIFICATION,
  payload: payload,
});

export const WARNING_NOTIFICATION = (payload) => ({
  type: types.WARNING_NOTIFICATION,
  payload: payload,
});

export const DEFAULT_NOTIFICATION = (payload) => ({
  type: types.DEFAULT_NOTIFICATION,
  payload: payload,
});

export const INFO_NOTIFICATION = (payload) => ({
  type: types.INFO_NOTIFICATION,
  payload: payload,
});
