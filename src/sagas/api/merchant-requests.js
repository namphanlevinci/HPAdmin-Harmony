import axios from "axios";
import { select } from "redux-saga/effects";
import URL from "../../url/url";

//! GET ALL MERCHANT REQUEST
export function* getAll_Merchant_Requests_api() {
  const getInfoLogin = state => state.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.User.token
    }
  };
  const kq = yield axios
    .get(URL + "/merchant/pending", config)
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
  return kq;
}

//! SEND APPROVAL REQUEST
export function* Send_Approval_api(data) {
  const getInfoLogin = state => state.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.User.token
    }
  };
  const { merchantCode, merchantToken, transactionsFee, ID } = data;
  const kq = yield axios
    .put(
      URL + "/merchant/approve/" + ID,
      { merchantCode, merchantToken, transactionsFee },
      config
    )
    .then(result => {
      return result.data;
    })
    .catch(err => {
      console.log(err);
    });
  return kq;
}

//! SEND REJECT REQUEST
export function* Send_Reject_api(data) {
  const getInfoLogin = state => state.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.User.token
    }
  };
  const { reason, ID } = data;
  const kq = yield axios
    .put(URL + "/merchant/reject/" + ID, { reason }, config)
    .then(result => {
      return result.data;
    })
    .catch(err => {
      console.log(err);
    });
  return kq;
}
