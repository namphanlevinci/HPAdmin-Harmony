export * from './Setting';

const REQUEST_LOGIN = 'REQUEST_LOGIN';


export const requestLogin = (payload) => {
    return {
        type: REQUEST_LOGIN,
        payload,
    };
}