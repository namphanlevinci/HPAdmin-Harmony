import axios from "axios";
import { select } from "redux-saga/effects";
import { config } from "../../url/url";

const URL = config.url.URL;

// GET ALL MERCHANT API
export function* GET_ALL_MERCHANT_API() {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .get(URL + "/merchant/?page=0", config)
    .then((result) => {
      return result.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

// UPDATE MERCHANT INFO (GENERAL)
export function* UPDATE_MERCHANT_API(data) {
  const {
    ID,
    emailContact,
    legalBusinessName,
    tax,
    address,
    city,
    stateId,
    phoneBusiness,
    zip,
    phoneContact,
    firstName,
    lastName,
    title,
    doBusinessName,
    dbaAddress,
  } = data;
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);

  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .put(
      URL + "/general/" + ID,
      {
        emailContact,
        legalBusinessName,
        doBusinessName,
        tax,
        address,
        city,
        stateId,
        phoneBusiness,
        zip,
        phoneContact,
        firstName,
        lastName,
        title,
        dbaAddress,
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

// GET MERCHANT BY ID
export function* GET_MERCHANT_BY_ID_API(ID) {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .get(URL + "/merchant/" + ID, config)
    .then((result) => {
      return result.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

// GET REJECTED MERCHANT API
export function* GET_ALL_REJECTED_MERCHANT_API() {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .get(URL + "/merchant/reject", config)
    .then((result) => {
      return result.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

// GET ALL MERCHANT REQUEST
export function* GET_ALL_MERCHANT_REQUEST_API() {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .get(URL + "/merchant/pending", config)
    .then((result) => {
      return result.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

// SEND APPROVAL REQUEST
export function* APPROVE_MERCHANT_API(data) {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const {
    merchantCode,
    merchantToken,
    transactionsFee,
    ID,
    discountRate,
    totalAmountLimit,
  } = data;
  const kq = yield axios
    .put(
      URL + "/merchant/approve/" + ID,
      {
        merchantCode,
        merchantToken,
        transactionsFee,
        discountRate,
        totalAmountLimit,
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

// SEND REJECT REQUEST
export function* REJECT_MERCHANT_API(data) {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const { reason, ID } = data;
  const kq = yield axios
    .put(URL + "/merchant/reject/" + ID, { reason }, config)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

// DELETE MERCHANT
export function* DELETE_MERCHANT_API(ID) {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .delete(URL + `/merchant/delete/${ID}`, config)
    .then((result) => {
      return result.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

// ARCHIVE MERCHANT
export function* ARCHIVE_MERCHANT_API(payload) {
  console.log("payload", payload);
  const { ID, reason } = payload;
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  const kq = yield axios
    .delete(URL + `/merchant/${ID}`, {
      headers: {
        Authorization: "Bearer " + infoLogin.token,
      },
      data: { reason },
    })
    .then((result) => {
      return result.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

// RESTORE MERCHANT
export function* RESTORE_MERCHANT_API(ID) {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const kq = yield axios
    .put(URL + `/merchant/enable/${ID}`, null, config)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}

// Set status pending merchant
export function* SET_PENDING_STATUS_API(payload) {
  const getInfoLogin = (state) => state.userReducer.User;
  const infoLogin = yield select(getInfoLogin);
  let config = {
    headers: {
      Authorization: "Bearer " + infoLogin.token,
    },
  };
  const { ID, status } = payload;
  const kq = yield axios
    .put(URL + `/merchant/updateStatus/${ID}`, { Status: status }, config)
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      console.log(err);
    });
  return kq;
}
