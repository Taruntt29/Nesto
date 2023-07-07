import actionNames from "@nestoHub/utils/actionNames";

const initialState = {}

export const authReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case actionNames.AUTH_REDUCER:
            return { ...state, ...action.payload }
        case actionNames.CLEAR_AUTH_REDUCER:
            return {}
        default:
            return state;
    }
}