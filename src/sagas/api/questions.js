import axios from "axios";
import { select } from "redux-saga/effects";
import URL from "../../url/url";

export function* GET_ALL_QUESTION_API() {
  const getInfoLogin = (state) => state.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .get(URL + "/question", config)
    .then((result) => {
      return result.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

// UPDATE QUESTIONS
export function* UPDATE_QUESTION_API(Data) {
  const getInfoLogin = (state) => state.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const ID = Data.ID;
  const value = Data.value;
  const kq = yield axios
    .put(URL + "/question/" + ID, { value }, config)
    .then((result) => {
      return result.data.message;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

export function* GET_ALL_USER_API() {
  const getInfoLogin = (state) => state.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .get(URL + "/user", config)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}
