import axios from "axios";
import { select } from "redux-saga/effects";
import URL from "../../url/url";

// GET GENERATION LIST
export function* GET_GIFT_CARD_API() {
  const getInfoLogin = (state) => state.User;
  const InfoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + InfoLogin.User.token,
    },
  };
  const kq = yield axios
    .get(URL + "/giftcardgeneral?page=0", config)
    .then((result) => {
      return result.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

// GET GENERATION CODE BY ID
export function* GET_GIFT_CARD_BY_ID_API(ID) {
  const getInfoLogin = (state) => state.User;
  const InfoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + InfoLogin.User.token,
    },
  };
  const kq = yield axios
    .get(URL + "/giftcardgeneral/" + ID, config)
    .then((result) => {
      return result.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

// GET GENERATION CODE LOG BY ID
export function* GET_GIFT_CARD_CODE_LOG_BY_ID_API(ID) {
  const getInfoLogin = (state) => state.User;
  const InfoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + InfoLogin.User.token,
    },
  };
  const kq = yield axios
    .get(URL + "/giftcardlog/" + ID, config)
    .then((result) => {
      return result.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}
// GET TEMPLATE LIST
export function* GET_TEMPLATE_API() {
  const getInfoLogin = (state) => state.User;
  const InfoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + InfoLogin.User.token,
    },
  };
  const kq = yield axios
    .get(URL + "/giftcardtemplate", config)
    .then((result) => {
      return result.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}
