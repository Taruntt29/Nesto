import actionNames from "@nestoHub/utils/actionNames";

const initialState = {}

export const notificationReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case actionNames.NOTIFICATION_REDUCER:
            return { ...state, ...action.payload }
        case actionNames.CLEAR_NOTIFICATION_REDUCER:
            return {}
        default:
            return state;
    }
}