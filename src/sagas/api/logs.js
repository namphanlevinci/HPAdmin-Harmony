import { select } from "redux-saga/effects";

import URL from "../../url/url";
import axios from "axios";

export function* GET_LOG_API() {
  const getInfoLogin = (state) => state.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .get(URL + "/merchantapprovallog", config)
    .then((result) => {
      return result.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}
