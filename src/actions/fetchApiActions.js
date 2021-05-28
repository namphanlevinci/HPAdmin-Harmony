import {
  FETCH_API_REQUEST,
  FETCH_API_SUCCESS,
  FETCH_API_FAILURE,
} from "../constants/fetchApiConstants";
import { FAILURE_NOTIFICATION } from "../constants/notificationConstants";
import { config } from "../url/url";

import axios from "axios";

const URL = config.url.URL;

export const fetchApiByPage = (url) => async (dispatch, getState) => {

  try {
    dispatch({
      type: FETCH_API_REQUEST,
    });

    const {
      verifyUser: { user },
    } = await getState();
    const { data } = await axios.get(`${URL}/${url}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
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
