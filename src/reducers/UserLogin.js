
import * as typeAgent from '../actions/user/types'


const initialState = {
    agent: JSON.parse(localStorage.getItem('agent_login')) ? JSON.parse(localStorage.getItem('agent_login')) : '',
    message_error: '',
}

const UserLogin = (state = initialState, action) => {
    switch (action.type) {

        case typeAgent.checkLogin_Agent_Success:
            state.agent = action.payload;
            console.log(action.payload)
            localStorage.setItem('timeout_agentLogin', Date.now());
            localStorage.setItem('agent_login', JSON.stringify(action.payload));
            window.location.href = '/app/merchants'
            return { ...state }

        case typeAgent.checkLogin_Agent_Error:
            state.message_error = action.payload;
            return { ...state }

        case typeAgent.logout_Agent:
            state.agent = '';
            localStorage.removeItem('agent_login');
            window.location.href = "/signin";
            return { ...state }
        default:
            return state
    }
}
export default UserLogin;
