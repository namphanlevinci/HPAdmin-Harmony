import axios from "axios";
import { select } from "redux-saga/effects";
import { config } from "../../url/url";

const URL = config.url.URL;

// export function* USER_LOGIN_API({ email, password }) {
//   const kq = yield axios
//     .post(URL + "/adminuser/login", {
//       email,
//       password,
//     })
//     .then((result) => {
//       return result.data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   return kq;
// }

// VERIFY USER
export function* USER_VERIFY_API({ serial, code, token }) {
  const kq = yield axios
    .post(URL + "/adminuser/verifycode/" + serial, { code, token })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

export function* GET_ALL_USER_API() {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .get(URL + "/adminuser", config)
    .then((result) => {
      return result.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

// ADD ADMIN USER
export function* ADD_USER_API(Data) {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const {
    stateId,
    WaRoleId,
    firstname,
    lastname,
    email,
    password,
    address,
    city,
    zip,
    BirthDate,
    fullname,
    phone,
    fileId,
  } = Data;
  const kq = yield axios
    .post(
      URL + "/adminuser",
      {
        stateId,
        WaRoleId,
        firstname,
        lastname,
        email,
        password,
        address,
        city,
        zip,
        BirthDate,
        fullname,
        phone,
        fileId,
      },
      config
    )
    .then((result) => {
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

export function* GET_USER_BY_ID_API(ID) {
  const userID = ID;
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .get(URL + `/adminuser/${userID}`, config)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

export function* GET_CURRENT_USER_API(ID) {
  const userID = ID;
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .get(URL + `/adminuser/${userID}`, config)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

// Get permission on login
export function* GET_PERMISSION_ON_LOGIN_API(ID) {
  const waRoleId = ID;
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .get(URL + `/permission/getByRole/${waRoleId}`, config)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

export function* GET_PERMISSION_BY_ROLE_ID_API(ID) {
  const waRoleId = ID;
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .get(URL + `/permission/getByRole/${waRoleId}`, config)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

export function* GET_ALL_PERMISSION_API() {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .get(URL + `/permission`, config)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

export function* UPDATE_PERMISSION_API(data) {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .put(URL + `/permission`, data, config)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

// Update user
export function* UPDATE_USER_API(data) {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const {
    firstName,
    lastName,
    email,
    birthDate,
    address,
    city,
    zip,
    waRoleId,
    phone,
    stateId,
    fileId,
    ID,
  } = data;
  const kq = yield axios
    .put(
      URL + `/adminuser/${ID}`,
      {
        firstName,
        lastName,
        email,
        birthDate,
        address,
        city,
        zip,
        waRoleId,
        phone,
        stateId,
        fileId,
      },
      config
    )
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

// Change user password
export function* CHANGE_USER_PASSWORD_API(data) {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const { oldPassword, newPassword, ID } = data;

  const kq = yield axios
    .put(
      URL + `/adminUser/changepassword/${ID}`,
      {
        oldPassword,
        newPassword,
      },
      config
    )
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

// Logout
export function* USER_LOGOUT_API(ID) {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .put(URL + `/adminUser/logout/${ID}`, null, config)
    .then((result) => {
      console.log("result", result);
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return kq;
}

// Disable user
export function* DISABLE_USER_API(ID) {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .delete(URL + `/adminuser/${ID}`, config)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return kq;
}

// Restore user
export function* ENABLE_USER_API(ID) {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .put(URL + `/adminuser/enable/${ID}`, null, config)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });

  return kq;
}
