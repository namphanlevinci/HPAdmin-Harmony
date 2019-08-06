import axios from "axios";
// import { select } from "redux-saga/effects";
import URL from "../../url/url";

export function* login_User_api({ email, password }) {
  const kq = yield axios
    .post(URL + "/adminuser/login", {
      email,
      password
    })
    .then(result => {
      return result.data;
    })
    .catch(err => {
      console.log(err);
    });
  return kq;
}

//!  VERIFY USER
export function* Verify_User_api({ SERIAL, code }) {
  const kq = yield axios
    .post(URL + "/adminuser/verifycode/" + SERIAL, { code })
    .then(result => {
      return result.data;
    })
    .catch(err => {
      console.log(err);
    });
  return kq;
}

export function* getAll_User_api() {
  // const getInfoLogin = state => state.User;
  // const infoLogin = yield select(getInfoLogin);
  // let config = {
  //   headers: {
  //     Authorization: "Bearer " + infoLogin.User.token
  //   }
  // };
  const kq = yield axios
    .then(result => {
      return result.data.data;
    })
    .catch(err => {
      console.log(err);
    });
  return kq;
}
