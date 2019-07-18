import * as typeLog from "../../actions/business/types"

const initialState = []

const getAll_Questions = (state = initialState, action) => {
    switch(action.type) {
        case typeLog.getAll_Questions_Success:
            state = action.payload;
            return [...state];
        default:
            return [...state];
    }
}
export default getAll_Questions;