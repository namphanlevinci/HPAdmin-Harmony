import axios from 'axios'
import { select } from 'redux-saga/effects'

export function* getAll_Merchant_Requests_api(){
    const getInfoLogin = (state) => state.User
    const infoLogin = yield select(getInfoLogin);
    let config = {
        headers: {
          'Authorization': 'Bearer ' + infoLogin.User.token
        }
      }
    const kq = yield axios.get('http://api2.levincidemo.com/api/merchant/pending', config)
    .then((result) => {
      return result.data.data;
    }).catch((err) => {
        console.log(err);
    });
        return kq;
};
