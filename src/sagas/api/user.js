import axios from 'axios'

export function* login_Agent_api({email,password}){
    const kq = yield axios.post("http://localhost:4001/login",{
        email,password
    })
    .then((result) => {
        return result.data;
        console.log(result)
    }).catch((err) => {
        console.log(err);
    });
    return kq;
}

