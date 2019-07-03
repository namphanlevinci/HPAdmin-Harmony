import * as typeLog from "../../actions/Logs/types"

const initialState = []

const getAll_Logs = (state = initialState, action) => {
    switch(action.type) {
        case typeLog.getAll_Logs_Success:
            state = action.payload;
            return [...state];
        default:
            return [...state];
    }
}
export default getAll_Logs;