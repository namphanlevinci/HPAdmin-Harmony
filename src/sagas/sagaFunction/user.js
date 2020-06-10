import * as typeUser from "../../actions/user/types";
import {
  login_User_api,
  getAll_User_api,
  Verify_User_api,
  add_Admin_api,
} from "../api/user";
import { takeLatest, put, takeLeading } from "redux-saga/effects";

//! login user admin
export function* login_User_Saga() {
  yield takeLeading(typeUser.checkLogin_User, function*(action) {
    try {
      const { email, password } = action.payload;
      const check = yield login_User_api({ email, password });
      if (check.data !== null) {
        yield put({
          type: typeUser.checkLogin_User_Success,
          payload: check.data,
        });
      }
      if (check.data === null) {
        yield put({
          type: typeUser.checkLogin_User_Error,
          payload: check.message,
        });
      }
    } catch (error) {
      yield put({ type: typeUser.checkLogin_User_Error, payload: error });
    }
  });
}

//! Verify user admin
export function* Verify_User_Saga() {
  yield takeLatest(typeUser.Verify, function*(action) {
    try {
      const { SERIAL, code } = action.payload;
      const check = yield Verify_User_api({ SERIAL, code });
      if (check.data !== null) {
        yield put({ type: typeUser.Verify_Success, payload: check.data });
      }
      if (check.data === null) {
        yield put({ type: typeUser.Verify_Error, payload: check.message });
      }
    } catch (error) {
      yield put({ type: typeUser.Verify_Error, payload: error });
    }
  });
}

//! get all user admin
export function* getAll_User_Saga() {
  yield takeLatest(typeUser.getAll_User, function*() {
    try {
      const UserList = yield getAll_User_api();
      if (UserList.data !== null) {
        yield put({ type: typeUser.getAll_User_Success, payload: UserList });
      } else {
        yield put({
          type: typeUser.getAll_User_Error,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

//! ADD ADMIN USER
export function* add_Admin_Saga() {
  yield takeLatest(typeUser.ADD_ADMIN, function*(action) {
    try {
      const check = yield add_Admin_api(action.payload);
      if (check.data !== null) {
        yield put({
          type: typeUser.ADD_ADMIN_SUCCESS,
          payload: check.data.message,
        });
      }
      if (check.data === null) {
        yield put({ type: typeUser.ADD_ADMIN_ERROR, payload: check.message });
      }
    } catch (error) {
      yield put({ type: typeUser.ADD_ADMIN_ERROR, payload: error });
    }
  });
}
