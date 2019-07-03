import * as typeNoti from "../../actions/notifications/types"

const initialState = []

const getAll_Notifications = (state = initialState, action) => {
    switch(action.type) {
        case typeNoti.getAll_Notifications_Success:
            state = action.payload;
            return [...state];
        default:
            return [...state];
    }
}
export default getAll_Notifications;