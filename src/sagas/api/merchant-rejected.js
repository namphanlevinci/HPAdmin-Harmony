import axios from 'axios'
import { select } from 'redux-saga/effects'
import URL  from '../../url/url'

export function* getAll_Rejected_Merchant_api(){
    const getInfoLogin = (state) => state.User
    const infoLogin = yield select(getInfoLogin);
    let config = {
        headers: {
          'Authorization': 'Bearer ' + infoLogin.User.token
        }
      }
    const kq = yield axios.get( URL + '/merchant/reject', config)
    .then((result) => {
      return result.data.data;
    }).catch((err) => {
        console.log(err);
    });
        return kq;
};