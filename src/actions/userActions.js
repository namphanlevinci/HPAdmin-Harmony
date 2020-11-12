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
      verifyUser: { user },
    } = await getState();

    const currentUserId = user.userAdmin.waUserId;

    const { data } = await axios.get(`${URL}/adminuser/${ID}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    dispatch({
      type: types.GET_USER_BY_ID_SUCCESS,
      payload: data.data,
    });

    if (Number(ID) === Number(currentUserId)) {
      const token = user?.token;
      dispatch({
        type: types.VERIFY_USER_SUCCESS,
        payload: { userAdmin: data.data, token },
      });
    }

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
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.delete(`${URL}/adminuser/${ID}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
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
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.put(`${URL}/adminuser/enable/${ID}`, null, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
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
      verifyUser: { user },
    } = await getState();

    const { ID, isCurrentUserPage, path } = payload;

    const { data } = await axios.put(
      `${URL}/adminuser/${ID}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
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
      verifyUser: { user },
    } = await getState();

    const { ID } = payload;

    const { data } = await axios.put(
      `${URL}/adminUser/changepassword/${ID}`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
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

export const userLogin = (email, password, path) => async (dispatch) => {
  try {
    dispatch({
      type: types.USER_LOGIN_REQUEST,
    });

    const { data } = await axios.post(`${URL}/adminuser/login`, {
      email,
      password,
    });

    if (Number(data.codeNumber) !== 400) {
      dispatch({
        type: types.USER_LOGIN_SUCCESS,
        payload: data.data,
      });

      history.push(path);
    } else {
      dispatch({
        type: FAILURE_NOTIFICATION,
        payload: data.message,
      });

      dispatch({
        type: types.USER_LOGIN_FAILURE,
        payload: data.message,
      });
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const verifyUser = (code, token) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.VERIFY_USER_REQUEST,
    });
    const { user } = getState();

    const {
      user: { verifyCodeId },
    } = user;

    const { data } = await axios.post(
      `${URL}/adminuser/verifycode/${verifyCodeId}`,
      {
        code,
        token,
      }
    );

    if (Number(data.codeNumber) !== 400) {
      dispatch({
        type: types.VERIFY_USER_SUCCESS,
        payload: data.data,
      });

      const path = "/app/merchants/list";
      dispatch(getUserPermissionByID(path));
    } else {
      dispatch({
        type: FAILURE_NOTIFICATION,
        payload: data.message,
      });

      dispatch({
        type: types.VERIFY_USER_FAILURE,
        payload: data.message,
      });
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
      type: types.VERIFY_USER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserPermissionByID = (path) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.GET_PERMISSION_BY_ID_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(
      `${URL}/permission/getByRole/${user.userAdmin.waRoleId}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({
      type: types.GET_PERMISSION_BY_ID_SUCCESS,
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
      type: types.GET_PERMISSION_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllPermission = (path) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.GET_ALL_PERMISSION_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(`${URL}/permission`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    dispatch({
      type: types.GET_ALL_PERMISSION_SUCCESS,
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
      type: types.GET_ALL_PERMISSION_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePermissions = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.UPDATE_PERMISSION_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.put(`${URL}/permission`, [...payload], {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    dispatch({
      type: types.UPDATE_PERMISSION_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });

    dispatch(getAllPermission());
    dispatch(getUserPermissionByID());
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.UPDATE_PERMISSION_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllUser = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.GET_ALL_USER_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();
    const { data } = await axios.get(`${URL}/adminuser?page=0`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    dispatch({
      type: types.GET_ALL_USER_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.GET_ALL_USER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userLogout = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: types.USER_LOGOUT_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();

    const userId = user.userAdmin.waUserId;

    const { data } = await axios.put(`${URL}/adminUser/logout/${userId}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    dispatch({
      type: types.USER_LOGIN_SUCCESS,
      payload: data.data,
    });

    localStorage.removeItem("user");

    history.push("/");
  } catch (error) {
    localStorage.removeItem("user");
    history.push("/");
    dispatch({
      type: types.USER_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
