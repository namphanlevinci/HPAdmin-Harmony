import * as types from "../constants/consumerConstants";

import {
  FAILURE_NOTIFICATION,
  SUCCESS_NOTIFICATION,
} from "../constants/notificationConstants";

import axios from "axios";
import { config } from "../url/url";
import { history } from "../store/index";

const URL = config.url.URL;

export const getConsumerByID = (ID, path) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.GET_CONSUMER_BY_ID_REQUEST,
    });

    const {
      userReducer: { User },
    } = await getState();

    const { data } = await axios.get(`${URL}/user/${ID}`, {
      headers: {
        Authorization: `Bearer ${User?.token}`,
      },
    });

    dispatch({
      type: types.GET_CONSUMER_BY_ID_SUCCESS,
      payload: data.data,
    });

    if (path) {
      history.push(path);
    }
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.GET_CONSUMER_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const archiveConsumerById = (ID, reason) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.ARCHIVE_CONSUMER_BY_ID_REQUEST,
    });

    const {
      userReducer: { User },
    } = await getState();

    const { data } = await axios.put(
      `${URL}/user/delete/${ID}`,
      { reason },
      {
        headers: {
          Authorization: `Bearer ${User?.token}`,
        },
      }
    );

    dispatch({
      type: types.ARCHIVE_CONSUMER_BY_ID_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getConsumerByID(ID));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.ARCHIVE_CONSUMER_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const restoreConsumerById = (ID) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.RESTORE_CONSUMER_BY_ID_REQUEST,
    });

    const {
      userReducer: { User },
    } = await getState();

    const { data } = await axios.put(`${URL}/user/restore/${ID}`, null, {
      headers: {
        Authorization: `Bearer ${User?.token}`,
      },
    });

    dispatch({
      type: types.RESTORE_CONSUMER_BY_ID_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getConsumerByID(ID));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.ARCHIVE_CONSUMER_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
