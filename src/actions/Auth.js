import {
    ON_HIDE_LOADER,
    ON_SHOW_LOADER
} from 'constants/ActionTypes';




export const showAuthLoader = () => {
    return {
        type: ON_SHOW_LOADER,
    };
};
export const hideAuthLoader = () => {
    return {
        type: ON_HIDE_LOADER,
    };
};
