import {
    JsonHubProtocol
  } from '@aspnet/signalr';
  
  // action for user authentication and receiving the access_token
  import * as typeUser from '../actions/user/types'
//   const onNotifReceived = res => {
//     console.log('****** NOTIFICATION ******',JSON.parse(res));
//     // localStorage.setItem('Noti', res);
//   };
  const initialState = {
    User: JSON.parse(localStorage.getItem('User_login')) ? JSON.parse(localStorage.getItem('User_login')) : '',
    message_error: '',
    }
  const startSignalRConnection = connection => connection.start()
    .then(() => console.info('SignalR Connected'))
    .catch(err => console.error('SignalR Connection Error: ', err));
  
  const signalRMiddleware = ( state = initialState ) => next => async (action) => {
    // register signalR after the user logged in
    if (action.type === typeUser.checkLogin_User_Success) {
        switch (action.type) {
            case typeUser.checkLogin_User_Success:
                    state.User = action.payload;
                    // localStorage.setItem('timeout_UserLogin', Date.now());
                    localStorage.setItem('User_login', JSON.stringify(action.payload));
                    let token = action.payload.token
                    const protocol = new JsonHubProtocol();
                    const signalR = require("@aspnet/signalr");
                    let connection = new signalR.HubConnectionBuilder()
                        .withUrl("https://api2.levincidemo.com/notification/", { accessTokenFactory: () => token })
                        .withHubProtocol(protocol)
                        .build();
  
                    // event handlers, you can use these to dispatch actions to update your Redux store
                    connection.on('ListWaNotification', data => {   
                        // console.log('data', data)           
                        localStorage.setItem('Noti', data )
                    })
                
                    // re-establish the connection if connection dropped
                    connection.onclose(() => setTimeout(startSignalRConnection(connection), 5000));
                            
                    startSignalRConnection(connection);
           
                    window.location.href = '/app'
                    return { ...state }
                    default:
                            return
    }
}
    return next(action);
  };
  
  export default signalRMiddleware;