import axios from 'axios'
import { select } from 'redux-saga/effects'
import URL  from '../../url/url'
export function* getAll_Questions_api(){
    const getInfoLogin = (state) => state.User
    const infoLogin = yield select(getInfoLogin);
    let config = {
        headers: {
          'Authorization': 'Bearer ' + infoLogin.User.token
        }
      }
    const kq = yield axios.get(URL + '/question', config)
    .then((result) => {
      return result.data.data;
  }).catch((err) => {
      console.log(err);
  });
    return kq;
};
