import axios from "axios";
import { select } from "redux-saga/effects";
import URL from "../../url/url";

export function* GET_ALL_NOTIFICATION_API() {
  const getInfoLogin = (state) => state.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .get(URL + "/notification/", config)
    .then((result) => {
      return result.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}
