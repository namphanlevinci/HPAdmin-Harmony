import axios from 'axios'
import { select } from 'redux-saga/effects'
import URL  from '../../url/url'

export function* getAll_Transactions_api(){
    // const getInfoLogin = (state) => state.User
    // const infoLogin = yield select(getInfoLogin);
    // let config = {
    //     headers: {
    //       'Authorization': 'Bearer ' + infoLogin.User.token
    //     }
    //   }
    const kq = yield axios.get(URL + '/paymenttransaction')
    .then((result) => {
      return result.data;
  }).catch((err) => {
      console.log(err);
  });
    return kq;
};