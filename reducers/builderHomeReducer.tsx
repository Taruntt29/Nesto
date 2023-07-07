import actionNames from "@nestoHub/utils/actionNames";

const initialState = {}

export const builderHomeReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case actionNames.BUILDER_HOME_REDUCER:
            return { ...state, ...action.payload }
        case actionNames.CLEAR_BUILDER_HOME_REDUCER:
            return {}
        default:
            return state
    }
}