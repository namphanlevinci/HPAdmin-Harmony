import axios from 'axios'

export function* login_Agent_api({email,password}){
    const kq = yield axios.post("http://api2.levincidemo.com/api/adminuser/login",{
        email,password
    })
    .then((result) => {
        return result.data;
    }).catch((err) => {
        console.log(err);
    });
    return kq;
}

