import axios from 'axios'
import { select } from 'redux-saga/effects'
const url = 'http://api2.levincidemo.com/api'

export function* login_User_api({email,password}){
    const kq = yield axios.post(url + "/adminuser/login",{
        email,password
    })
    .then((result) => {
        return result.data;
    }).catch((err) => {
        console.log(err);
    });
    return kq;
}

export function* getAll_User_api(){
    const getInfoLogin = (state) => state.User
    const infoLogin = yield select(getInfoLogin);
    let config = {
        headers: {
          'Authorization': 'Bearer ' + infoLogin.User.token
        }
      }
    const kq = yield axios.get("http://api2.levincidemo.com/api/adminuser", config)
    .then((result) => {
        return result.data.data;
    }).catch((err) => {
        console.log(err);
    });
    return kq;
}