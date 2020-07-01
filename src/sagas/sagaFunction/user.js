import * as typeUser from "../../actions/user/types";
import {
  USER_LOGIN_API,
  GET_ALL_USER_API,
  USER_VERIFY_API,
  ADD_USER_API,
  GET_USER_BY_ID_API,
} from "../api/user";
import { takeLatest, put, takeLeading } from "redux-saga/effects";

// USER ADMIN LOGIN
export function* USER_LOGIN_SAGA() {
  yield takeLeading(typeUser.USER_LOGIN_REQUEST, function*(action) {
    try {
      const { email, password } = action.payload;
      const check = yield USER_LOGIN_API({ email, password });
      if (check.data !== null) {
        yield put({
          type: typeUser.USER_LOGIN_SUCCESS,
          payload: check.data,
        });
      }
      if (check.data === null) {
        yield put({
          type: typeUser.USER_LOGIN_FAILURE,
          payload: check.message,
        });
      }
    } catch (error) {
      yield put({ type: typeUser.USER_LOGIN_FAILURE, payload: error });
    }
  });
}

// USER VERIFY
export function* USER_VERIFY_SAGA() {
  yield takeLatest(typeUser.Verify, function*(action) {
    try {
      const { serial, code, token } = action.payload;
      const check = yield USER_VERIFY_API({ serial, code, token });
      if (check.data !== null) {
        yield put({ type: typeUser.VERIFY_SUCCESS, payload: check.data });
      }
      if (check.data === null) {
        yield put({ type: typeUser.VERIFY_FAILURE, payload: check.message });
      }
    } catch (error) {
      yield put({ type: typeUser.VERIFY_FAILURE, payload: error });
    }
  });
}

// GET ALL USER
export function* GET_ALL_USER_SAGA() {
  yield takeLatest(typeUser.GET_USER_REQUEST, function*() {
    try {
      const UserList = yield GET_ALL_USER_API();
      if (UserList.data !== null) {
        yield put({ type: typeUser.GET_USER_SUCCESS, payload: UserList });
      } else {
        yield put({
          type: typeUser.GET_USER_FAILURE,
          payload: "Something went wrong, please try again later!",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });
}

// ADD ADMIN USER
export function* ADD_USER_SAGA() {
  yield takeLatest(typeUser.ADD_ADMIN, function*(action) {
    try {
      const check = yield ADD_USER_API(action.payload);
      if (check.data !== null) {
        yield put({
          type: typeUser.ADD_ADMIN_SUCCESS,
          payload: check.data.message,
        });
      }
      if (check.data === null) {
        yield put({ type: typeUser.ADD_ADMIN_FAILURE, payload: check.message });
      }
    } catch (error) {
      yield put({ type: typeUser.ADD_ADMIN_FAILURE, payload: error });
    }
  });
}

// GET USER BY ID
export function* GET_USER_BY_ID_SAGA() {
  yield takeLatest(typeUser.GET_USER_BY_ID, function*(action) {
    try {
      const check = yield GET_USER_BY_ID_API(action.payload);
      if (check.data !== null) {
        yield put({
          type: typeUser.GET_USER_BY_ID_SUCCESS,
          payload: check.data,
        });
      }
      if (check.data === null) {
        yield put({
          type: typeUser.GET_USER_BY_ID_FAILURE,
          payload: check.message,
        });
      }
    } catch (error) {
      yield put({ type: typeUser.GET_USER_BY_ID_FAILURE, payload: error });
    }
  });
}
