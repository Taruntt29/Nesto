import actionNames from "@nestoHub/utils/actionNames";

const initialState = {}

export const brokerHomeReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case actionNames.BROKER_HOME_REDUCER:
            return { ...state, ...action.payload }
        case actionNames.CLEAR_BROKER_HOME_REDUCER:
            return {}
        default:
            return state;
    }
}