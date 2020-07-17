import axios from "axios";
import { select } from "redux-saga/effects";
import { config } from "../../url/url";
const URL = config.url.URL;
export function* GET_APPROVED_API(data) {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
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
