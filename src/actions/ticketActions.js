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
