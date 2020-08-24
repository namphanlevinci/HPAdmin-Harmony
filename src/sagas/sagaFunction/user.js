import * as typeUser from "../../actions/user/types";
import * as typeNotification from "../../actions/notifications/types";
import { history } from "../../store/index";

import {
  USER_LOGIN_API,
  GET_ALL_USER_API,
  USER_VERIFY_API,
  ADD_USER_API,
  GET_USER_BY_ID_API,
  GET_PERMISSION_BY_ROLE_ID_API,
  GET_PERMISSION_ON_LOGIN_API,
  GET_ALL_PERMISSION_API,
  UPDATE_PERMISSION_API,
  UPDATE_USER_API,
  USER_LOGOUT_API,
  GET_CURRENT_USER_API,
  ENABLE_USER_API,
  DISABLE_USER_API,
  CHANGE_USER_PASSWORD_API,
} from "../api/user";
import { takeLatest, put } from "redux-saga/effects";

// USER ADMIN LOGIN
export function* USER_LOGIN_SAGA() {
  yield takeLatest(typeUser.USER_LOGIN_REQUEST, function*(action) {
    try {
      const { email, password } = action.payload;
      const check = yield USER_LOGIN_API({ email, password });
      if (check.data !== null) {
        yield put({
          type: typeUser.USER_LOGIN_SUCCESS,
          payload: check.data,
        });
        history.push("/verify");
      }
      if (check.data === null) {
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
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
  yield takeLatest(typeUser.VERIFY_USER, function*(action) {
    try {
      const { serial, code, token, roleID } = action.payload;

      const check = yield USER_VERIFY_API({ serial, code, token });

      if (check.data !== null) {
        yield put({ type: typeUser.VERIFY_SUCCESS, payload: check.data });
        yield put({ type: typeUser.GET_PERMISSION_ON_LOGIN, payload: roleID });
      }
      if (check.data === null) {
        yield put({ type: typeUser.VERIFY_FAILURE, payload: false });
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
          payload: check.message,
        });
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
        yield put({
          type: typeNotification.SUCCESS_NOTIFICATION,
          payload: check.data.message,
        });
        history.push("/app/accounts/admin");
      }
      if (check.data === null) {
        yield put({ type: typeUser.ADD_ADMIN_FAILURE, payload: check.message });
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
          payload: "Something went wrong!",
        });
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

// Get current login user
export function* GET_CURRENT_USER_SAGA() {
  yield takeLatest(typeUser.GET_CURRENT_USER, function*(action) {
    try {
      const check = yield GET_CURRENT_USER_API(action.payload);
      if (check.data !== null) {
        yield put({
          type: typeUser.GET_CURRENT_USER_SUCCESS,
          payload: check.data,
        });
      }
      if (check.data === null) {
        yield put({
          type: typeUser.GET_CURRENT_USER_FAILURE,
          payload: check.message,
        });
      }
    } catch (error) {
      yield put({ type: typeUser.GET_CURRENT_USER_FAILURE, payload: error });
    }
  });
}

export function* GET_PERMISSION_BY_ROLE_ID_SAGA() {
  yield takeLatest(typeUser.GET_PERMISSION_BY_ID, function*({ payload }) {
    try {
      const check = yield GET_PERMISSION_BY_ROLE_ID_API(payload);
      if (check.data !== null) {
        yield put({
          type: typeUser.GET_PERMISSION_BY_ID_SUCCESS,
          payload: check.data,
        });
      }
      if (check.data === null) {
        yield put({
          type: typeUser.GET_PERMISSION_BY_ID_FAILURE,
          payload: check.message,
        });
      }
    } catch (error) {
      yield put({
        type: typeUser.GET_PERMISSION_BY_ID_FAILURE,
        payload: error,
      });
    }
  });
}

export function* GET_PERMISSION_ON_LOGIN_SAGA() {
  yield takeLatest(typeUser.GET_PERMISSION_ON_LOGIN, function*({ payload }) {
    try {
      const check = yield GET_PERMISSION_ON_LOGIN_API(payload);
      if (check.data !== null) {
        yield put({
          type: typeUser.GET_PERMISSION_ON_LOGIN_SUCCESS,
          payload: check.data,
        });
        yield put({ type: typeUser.VERIFY_FAILURE, payload: false });
        history.push("/app/merchants/list");
      }
      if (check.data === null) {
        yield put({
          type: typeUser.GET_PERMISSION_BY_ID_FAILURE,
          payload: check.message,
        });
      }
    } catch (error) {
      yield put({
        type: typeUser.GET_PERMISSION_BY_ID_FAILURE,
        payload: error,
      });
    }
  });
}

export function* GET_ALL_PERMISSION_SAGA() {
  yield takeLatest(typeUser.GET_ALL_PERMISSION, function*({ action, payload }) {
    try {
      const check = yield GET_ALL_PERMISSION_API(payload);
      if (check.data !== null) {
        yield put({
          type: typeUser.GET_ALL_PERMISSION_SUCCESS,
          payload: check.data,
        });
      }
      if (check.data === null) {
        yield put({
          type: typeUser.GET_ALL_PERMISSION_FAILURE,
          payload: check.message,
        });
      }
    } catch (error) {
      yield put({
        type: typeUser.GET_ALL_PERMISSION_FAILURE,
        payload: error,
      });
    }
  });
}

export function* UPDATE_PERMISSION_SAGA() {
  yield takeLatest(typeUser.UPDATE_PERMISSIONS, function*(action) {
    try {
      const check = yield UPDATE_PERMISSION_API(action.payload);
      if (check.data !== null) {
        yield put({
          type: typeUser.UPDATE_PERMISSIONS_SUCCESS,
          payload: check.data,
        });
        yield put({
          type: typeNotification.SUCCESS_NOTIFICATION,
          payload: "Update Permissions Success",
        });
      }
      if (check.data === null) {
        yield put({
          type: typeUser.UPDATE_PERMISSIONS_FAILURE,
          payload: check.message,
        });
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
          payload: "Something went wrong!",
        });
      }
    } catch (error) {
      yield put({ type: typeUser.UPDATE_PERMISSIONS_FAILURE, payload: error });
    }
  });
}

// Update user
export function* UPDATE_USER_SAGA() {
  yield takeLatest(typeUser.UPDATE_USER_ADMIN, function*(action) {
    try {
      const check = yield UPDATE_USER_API(action.payload);
      const ID = action.payload.ID;
      const isCurrentUserPage = action.payload.isCurrentUserPage;
      if (check.data !== null) {
        yield put({
          type: typeUser.UPDATE_USER_ADMIN_SUCCESS,
          payload: check.data,
        });
        yield put({
          type: typeNotification.SUCCESS_NOTIFICATION,
          payload: "Success",
        });

        if (isCurrentUserPage) {
          yield put({
            type: typeUser.GET_CURRENT_USER,
            payload: ID,
          });
        } else {
          yield put({
            type: typeUser.GET_USER_BY_ID,
            payload: ID,
          });
          history.goBack();
        }
      }
      if (check.data === null) {
        yield put({
          type: typeUser.UPDATE_USER_ADMIN_FAILURE,
          payload: check.message,
        });
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
          payload: "Something went wrong!",
        });
      }
    } catch (error) {
      yield put({ type: typeUser.UPDATE_USER_ADMIN_FAILURE, payload: error });
    }
  });
}

// Change user password
export function* CHANGE_USER_PASSWORD_SAGA() {
  yield takeLatest(typeUser.UPDATE_USER_PASSWORD, function*(action) {
    try {
      const check = yield CHANGE_USER_PASSWORD_API(action.payload);
      const ID = action.payload.ID;
      const isCurrentUserPage = action.payload.isCurrentUserPage;

      if (check.data !== null) {
        yield put({
          type: typeNotification.SUCCESS_NOTIFICATION,
          payload: "Success",
        });

        if (isCurrentUserPage) {
          yield put({
            type: typeUser.GET_CURRENT_USER,
            payload: ID,
          });
        } else {
          yield put({
            type: typeUser.GET_USER_BY_ID,
            payload: ID,
          });
          history.goBack();
        }

        history.goBack();
      } else {
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
          payload: "Something went wrong!",
        });
      }
    } catch (error) {
      yield put({
        type: typeNotification.FAILURE_NOTIFICATION,
        payload: "Something went wrong!",
      });
    }
  });
}

// Logout
export function* USER_LOGOUT_SAGA() {
  yield takeLatest(typeUser.USER_LOGOUT, function*(action) {
    try {
      const check = yield USER_LOGOUT_API(action.payload);
      if (check.data !== null) {
        localStorage.removeItem("User_login");
        history.push("/");
      } else {
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
          payload: "Something went wrong!",
        });
      }
    } catch (error) {
      yield put({
        type: typeNotification.FAILURE_NOTIFICATION,
        payload: "Something went wrong!",
      });
    }
  });
}

// Disable user
export function* DISABLE_USER_SAGA() {
  yield takeLatest(typeUser.DISABLE_USER, function*({ payload }) {
    try {
      const check = yield DISABLE_USER_API(payload);
      if (check.data !== null) {
        yield put({
          type: typeNotification.SUCCESS_NOTIFICATION,
          payload: check.message,
        });
        yield put({
          type: typeUser.GET_USER_BY_ID,
          payload: payload,
        });
      }
      if (check.data === null) {
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
          payload: check.message,
        });
      }
    } catch (error) {
      yield put({
        type: typeNotification.FAILURE_NOTIFICATION,
        payload: "Something went wrong!",
      });
    }
  });
}

// Restore user
export function* ENABLE_USER_SAGA() {
  yield takeLatest(typeUser.ENABLE_USER, function*({ payload }) {
    try {
      const check = yield ENABLE_USER_API(payload);
      if (check.data !== null) {
        yield put({
          type: typeNotification.SUCCESS_NOTIFICATION,
          payload: check.message,
        });
        yield put({
          type: typeUser.GET_USER_BY_ID,
          payload: payload,
        });
      }
      if (check.data === null) {
        yield put({
          type: typeNotification.FAILURE_NOTIFICATION,
          payload: check.message,
        });
      }
    } catch (error) {
      yield put({
        type: typeNotification.FAILURE_NOTIFICATION,
        payload: "Something went wrong!",
      });
    }
  });
}
