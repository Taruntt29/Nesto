import actionNames from "@nestoHub/utils/actionNames";

const initialState = {}

export const userReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case actionNames.USER_REDUCER:
            return { ...state, ...action.payload }
        case actionNames.CLEAR_USER_REDUCER:
            return {}
        default:
            return state;
    }
}