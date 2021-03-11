import * as types from "../constants/ticketConstants";

import {
  FAILURE_NOTIFICATION,
  SUCCESS_NOTIFICATION,
} from "../constants/notificationConstants";

import axios from "axios";
import { config } from "../url/url";
import { history } from "../store/index";

const URL = config.url.URL;

export const getTicketByID = (ID, path) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.GET_TICKET_BY_ID_REQUEST });

    const {
      verifyUser: { user },
    } = await getState();
    const { data } = await axios.get(`${URL}/ticket/${ID}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    dispatch({
      type: types.GET_TICKET_BY_ID_SUCCESS,
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
      type: types.GET_TICKET_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addTicketFile = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.ADD_TICKET_FILE_REQUEST });
    const { id, fileId } = payload;
    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.post(
      `${URL}/ticket/${id}/fileAttach`,
      {
        id,
        fileId,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    dispatch({ type: types.ADD_TICKET_FILE_SUCCESS, payload: data });
    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });
    dispatch(getTicketByID(id));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.ADD_TICKET_FILE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTicketLogById = (ID, path) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.GET_TICKET_LOG_REQUEST });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.get(`${URL}/ticket/${ID}/activity`, {
      headers: { Authorization: `Bearer ${user?.token}` },
    });
    dispatch({ type: types.GET_TICKET_LOG_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.GET_TICKET_LOG_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTicketCommentById = (ID, path) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: types.GET_TICKET_COMMENT_REQUEST });

    const {
      verifyUser: { user },
    } = await getState();
    const { data } = await axios.get(`${URL}/ticket/${ID}/comment`, {
      headers: { Authorization: `Bearer ${user?.token}` },
    });

    dispatch({ type: types.GET_TICKET_COMMENT_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.GET_TICKET_COMMENT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendComment = (payload, ID) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.SEND_COMMENT_REQUEST });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.post(
      `${URL}/ticket/${ID}/comment`,
      {
        ...payload,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    dispatch({ type: types.SEND_COMMENT_SUCCESS, payload: data });
    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message,
    });
    dispatch(getTicketCommentById(ID));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.SEND_COMMENT_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addTicket = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.ADD_TICKET_REQUEST });

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.post(
      `${URL}/ticket`,
      { ...payload },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    if (data.codeNumber === 200) {
      dispatch({
        type: types.ADD_TICKET_SUCCESS,
        payload: data,
      });
      dispatch({
        type: SUCCESS_NOTIFICATION,
        payload: data?.message,
      });
      dispatch(getTicketByID(data.data));
      if (payload.path) {
        history.push(payload.path);
      }
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
      type: types.ADD_TICKET_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const changeStatus = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.CHANGE_STATUS_REQUEST });

    const {
      verifyUser: { user },
    } = await getState();

    const { id, status } = payload;

    const { data } = await axios.put(
      `${URL}/ticket/${id}/stateChange`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    dispatch({ type: types.CHANGE_STATUS_SUCCESS, payload: data });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data.message,
    });

    dispatch(getTicketByID(id));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.CHANGE_STATUS_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateTicketById = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.UPDATE_TICKET_REQUEST });

    const { clientApp, clientName, title, status, description, id } = payload;

    const {
      verifyUser: { user },
    } = await getState();

    const { data } = await axios.put(
      `${URL}/ticket/${id}`,
      {
        clientApp,
        clientName,
        title,
        status,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );

    dispatch({ type: types.UPDATE_TICKET_SUCCESS, payload: data });

    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data.message,
    });
    dispatch(getTicketByID(id));
    if (payload.path) {
      history.push(payload.path);
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
      type: types.UPDATE_TICKET_FAILURES,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTicketFile = (payload) => async (dispatch, getState) => {
  try {
    dispatch({ type: types.DELETE_TICKET_FILE_REQUEST });

    const { id, fileId } = payload;

    const {
      verifyUser: { user },
    } = await getState();
    const { data } = await axios.delete(`${URL}/ticket/${id}/fileAttach`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      data: {
        id: fileId,
      },
    });
    dispatch({ type: types.DELETE_TICKET_FILE_SUCCESS, payload: data });
    dispatch({
      type: SUCCESS_NOTIFICATION,
      payload: data?.message || "Success",
    });
    dispatch(getTicketByID(id));
  } catch (error) {
    dispatch({
      type: FAILURE_NOTIFICATION,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch({
      type: types.DELETE_TICKET_FILE_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
