import axios from "axios";
import { select } from "redux-saga/effects";
import { config } from "../../url/url";

const URL = config.url.URL;

export function* GET_CONSUMER_BY_ID_API(payload) {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const ID = payload;
  const kq = yield axios
    .get(URL + `/user/${ID}`, config)
    .then((result) => {
      return result.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

export function* UPDATE_CONSUMER_API(payload) {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const { ID, email, firstName, lastName, limitAmount, phone } = payload;
  const kq = yield axios
    .put(
      URL + `/user/update/${ID}`,
      { email, firstName, lastName, limitAmount, phone },
      config
    )
    .then((result) => {
      return result.data.message;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

export function* DELETE_CONSUMER_BY_ID_API(payload) {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const { ID, reason } = payload;
  const kq = yield axios
    .put(URL + `/user/delete/${ID}`, { reason }, config)
    .then((result) => {
      return result.data.message;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

export function* RESTORE_CONSUMER_BY_ID_API(payload) {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const ID = payload;
  const kq = yield axios
    .put(URL + `/user/restore/${ID}`, null, config)
    .then((result) => {
      return result.data.message;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}
