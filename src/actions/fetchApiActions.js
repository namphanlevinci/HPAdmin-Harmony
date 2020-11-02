import {
  FETCH_API_REQUEST,
  FETCH_API_SUCCESS,
  FETCH_API_FAILURE,
} from "../constants/fetchApiConstanst";
import { FAILURE_NOTIFICATION } from "../constants/notificationConstants";
import axios from "axios";

export const fetchApiByPage = (url) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_API_REQUEST,
    });

    const {
      userReducer: { User },
    } = await getState();

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${User?.token}`,
      },
    });

    dispatch({
      type: FETCH_API_SUCCESS,
      payload: data,
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
      type: FETCH_API_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
