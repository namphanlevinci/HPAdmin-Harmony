import * as types from "./types";

// Get consumer by ID
export const GET_CONSUMER_BY_ID = (payload) => ({
  type: types.GET_CONSUMER_BY_ID,
  payload: payload,
});

export const GET_CONSUMER_BY_ID_SUCCESS = (payload) => ({
  type: types.GET_CONSUMER_BY_ID_SUCCESS,
  payload: payload,
});

export const GET_CONSUMER_BY_ID_FAILURE = (payload) => ({
  type: types.GET_CONSUMER_BY_ID_FAILURE,
  payload: payload,
});
// View consumer
export const VIEW_CONSUMER = (payload) => ({
  type: types.VIEW_CONSUMER,
  payload: payload,
});
// Update consumer
export const UPDATE_CONSUMER = (payload, id) => ({
  type: types.UPDATE_CONSUMER,
  payload: payload,
  consumerId: id,
});

export const UPDATE_CONSUMER_SUCCESS = (payload) => ({
  type: types.UPDATE_CONSUMER_SUCCESS,
  payload: payload,
});

export const UPDATE_CONSUMER_FAILURE = (payload) => ({
  type: types.UPDATE_CONSUMER_FAILURE,
  payload: payload,
});
// Delete consumer
export const DELETE_CONSUMER_BY_ID = (payload) => ({
  type: types.DELETE_CONSUMER_BY_ID,
  payload: payload,
});

export const DELETE_CONSUMER_BY_ID_SUCCESS = (payload, id) => ({
  type: types.DELETE_CONSUMER_BY_ID_SUCCESS,
  payload: payload,
  consumerId: id,
});

export const DELETE_CONSUMER_BY_ID_FAILURE = (payload) => ({
  type: types.DELETE_CONSUMER_BY_ID_FAILURE,
  payload: payload,
});
// Restore consumer
export const RESTORE_CONSUMER_BY_ID = (payload) => ({
  type: types.RESTORE_CONSUMER_BY_ID,
  payload: payload,
});

export const RESTORE_CONSUMER_BY_ID_SUCCESS = (payload, id) => ({
  type: types.RESTORE_CONSUMER_BY_ID_SUCCESS,
  payload: payload,
  consumerId: id,
});

export const RESTORE_CONSUMER_BY_ID_FAILURE = (payload) => ({
  type: types.RESTORE_CONSUMER_BY_ID_FAILURE,
  payload: payload,
});
