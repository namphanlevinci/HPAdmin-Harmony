import axios from "axios";
import URL from "../../url/url";
import { select } from "redux-saga/effects";

//! GET ALL TRANSACTIONS
export function* getAll_Transactions_api() {
  const getInfoLogin = state => state.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.User.token
    }
  };
  const kq = yield axios
    .get(URL + "/paymenttransaction", config)
    .then(result => {
      return result.data;
    })
    .catch(err => {
      console.log(err);
    });
  return kq;
}

//! GET P2P TRANSACTIONS
export function* getAll_P2PTransactions_api() {
  const getInfoLogin = state => state.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.User.token
    }
  };
  const kq = yield axios
    .get(URL + "/p2p/transaction", config)
    .then(result => {
      return result.data;
    })
    .catch(err => {
      console.log(err);
    });
  return kq;
}

//! CONSUMER TRANSACTIONS
export function* getUser_Transaction_api(IDUser) {
  const getInfoLogin = state => state.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.User.token
    }
  };
  const kq = yield axios
    .get(URL + "/paymenttransaction/" + IDUser, config)
    .then(result => {
      return result.data;
    })
    .catch(err => {
      console.log(err);
    });
  return kq;
}

//! CONSUMER ACTIVITY
export function* getUser_Activity_api(IDUser) {
  const getInfoLogin = state => state.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.User.token
    }
  };
  const kq = yield axios
    .get(URL + "/useractivity/" + IDUser, config)
    .then(result => {
      return result.data;
    })
    .catch(err => {
      console.log(err);
    });
  return kq;
}

//! GET BATCH SETTLEMENT
export function* getAll_Batch_api() {
  const getInfoLogin = state => state.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.User.token
    }
  };
  const kq = yield axios
    .get(URL + "/settlement", config)
    .then(result => {
      // console.log("======================", result);
      return result.data;
    })
    .catch(err => {
      console.log(err);
    });
  return kq;
}
