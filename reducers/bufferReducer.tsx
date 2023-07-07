import actionNames from "@nestoHub/utils/actionNames";

const initialState = {}

export const bufferReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case actionNames.BUFFER_REDUCER:
            return { ...state, ...action.payload }
        case actionNames.CLEAR_BUFFER_REDUCER:
            return {}
        default:
            return state;
    }
}