import actionNames from "@nestoHub/utils/actionNames";

const initialState = {}

export const masterReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case actionNames.MASTER_REDUCER:
            return { ...state, ...action.payload }
        default:
            return state;
    }
}