import * as types from "../constants/userConstants";
import {
  SUCCESS_NOTIFICATION,
  FAILURE_NOTIFICATION,
} from "../constants/notificationConstants";

import axios from "axios";
import { config } from "../url/url";
import { history } from "../store/index";

const URL = config.url.URL;

export const getUserByID = (ID, path) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.GET_USER_BY_ID_REQUEST,
    });

    const {
      userReducer: { User },
    } = await getState();

    const { data } = await axios.get(`${URL}/adminuser/${ID}`, {
      headers: {
        Authorization: `Bearer ${User?.token}`,
      },
    });

    dispatch({
      type: types.GET_USER_BY_ID_SUCCESS,
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
      type: types.GET_USER_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const archiveUserById = (ID) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.ARCHIVE_USER_BY_ID_REQUEST,
    });

    const {
      userReducer: { User },
    } = await getState();

    const { data } = await axios.delete(`${URL}/adminuser/${ID}`, {
      headers: {
        Authorization: `Bearer ${User?.token}`,
      },
    });

    dispatch({
      type: types.ARCHIVE_USER_BY_ID_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getUserByID(ID));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.ARCHIVE_USER_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const restoreUserById = (ID) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.RESTORE_USER_BY_ID_REQUEST,
    });

    const {
      userReducer: { User },
    } = await getState();

    const { data } = await axios.put(`${URL}/adminuser/enable/${ID}`, null, {
      headers: {
        Authorization: `Bearer ${User?.token}`,
      },
    });

    dispatch({
      type: types.RESTORE_USER_BY_ID_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getUserByID(ID));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.RESTORE_USER_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserById = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.UPDATE_USER_ADMIN_REQUEST,
    });

    const {
      userReducer: { User },
    } = await getState();

    const { ID, isCurrentUserPage, path } = payload;

    const { data } = await axios.put(
      `${URL}/adminuser/${ID}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${User?.token}`,
        },
      }
    );

    dispatch({
      type: types.UPDATE_USER_ADMIN_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    if (isCurrentUserPage) {
      dispatch(getUserByID(ID, path));
    } else {
      const path = "/app/accounts/admin/profile";
      dispatch(getUserByID(ID, path));
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
      type: types.UPDATE_USER_ADMIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const changeUserPasswordById = (payload) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: types.UPDATE_USER_PASSWORD_REQUEST,
    });

    const {
      userReducer: { User },
    } = await getState();

    const { ID } = payload;

    const { data } = await axios.put(
      `${URL}/adminUser/changepassword/${ID}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${User?.token}`,
        },
      }
    );

    dispatch({
      type: types.UPDATE_USER_PASSWORD_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    const path = "/app/accounts/admin/profile";

    dispatch(getUserByID(ID, path));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.UPDATE_USER_PASSWORD_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
