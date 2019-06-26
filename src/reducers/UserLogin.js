
import * as typeAgent from '../actions/user/types'


const initialState = {
    User: JSON.parse(localStorage.getItem('User_login')) ? JSON.parse(localStorage.getItem('User_login')) : '',
    message_error: '',
}

const UserLogin = (state = initialState, action) => {
    switch (action.type) {
        
        case typeAgent.checkLogin_Agent_Success:
            state.User = action.payload;
            localStorage.setItem('timeout_agentLogin', Date.now());
            localStorage.setItem('User_login', JSON.stringify(action.payload));
            window.location.href = '/app/merchants'
            return { ...state }

        case typeAgent.checkLogin_Agent_Error:
            state.message_error = 'Wrong email or password please try again!';
            return { ...state }

        case typeAgent.logout_Agent:
            state.User = '';
            localStorage.removeItem('User_login');
            window.location.href = "/signin";
            return { ...state }
        default:
            return state
    }
}
export default UserLogin;
