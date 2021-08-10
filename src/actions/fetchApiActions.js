import {
  FETCH_API_REQUEST,
  FETCH_API_SUCCESS,
  FETCH_API_FAILURE,
} from "../constants/fetchApiConstants";
import { FAILURE_NOTIFICATION } from "../constants/notificationConstants";
import { config } from "../url/url";

import axios from "axios";

const URL = config.url.URL;

let cancelToken;

export const fetchApiByPage = (url) => async (dispatch, getState) => {

  try {
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel("cancel token");
    }

    dispatch({
      type: FETCH_API_REQUEST,
    });
    cancelToken = axios.CancelToken.source()

    const {
      verifyUser: { user },
    } = await getState();
    const { data } = await axios.get(`${URL}/${url}`, {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
      cancelToken: cancelToken.token
    });

    dispatch({
      type: FETCH_API_SUCCESS,
      payload: data,
    });
  } catch (error) {
    if (error.message !== "cancel token") {
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
  }
};
