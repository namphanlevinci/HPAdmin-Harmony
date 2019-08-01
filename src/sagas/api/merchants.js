import axios from "axios";
import { select } from "redux-saga/effects";
import URL from "../../url/url";

//! GET ALL MERCHANT API
export function* getAll_Merchants_api() {
  const getInfoLogin = state => state.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.User.token
    }
  };
  const kq = yield axios
    .get(URL + "/merchant/", config)
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
  return kq;
}

//! UPDATE MERCHANT INFO (GENERAL)
export function* updateMerchant_Infor_api(data) {
  const { ID, address, businessName, cellphone, city, email, stateId } = data;
  const getInfoLogin = state => state.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.User.token
    }
  };
  const kq = yield axios
    .put(
      URL + "/merchant/" + ID,
      { businessName, email, cellphone, address, city, stateId },
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

//! GET MERCHANT BY ID
export function* getMerchant_byID_api(ID) {
  const getInfoLogin = state => state.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.User.token
    }
  };
  const kq = yield axios
    .get(URL + "/merchant/" + ID, config)
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
  return kq;
}
