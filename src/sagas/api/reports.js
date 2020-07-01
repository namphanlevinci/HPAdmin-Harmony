import axios from "axios";
import { select } from "redux-saga/effects";
import URL from "../../url/url";

export function* GET_APPROVED_API(data) {
  const getInfoLogin = (state) => state.User;
  const infoLogin = yield select(getInfoLogin);
  console.log("infoLogin", infoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const fromDate = data.fromDate;
  const toDate = data.toDate;
  const kq = yield axios
    .put(URL + "/statistic ", { fromDate, toDate }, config)
    .then((result) => {
      return result.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}
