import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { builderHomeReducer } from './builderHomeReducer';
import { notificationReducer } from './notificationReducer';
import { brokerHomeReducer } from './brokerHomeReducer';
import { userReducer } from './userReducer';
import { bufferReducer } from './bufferReducer';
import { masterReducer } from './masterReducer';

const reducers = combineReducers({
    authReducer,
    userReducer,
    notificationReducer,
    builderHomeReducer,
    brokerHomeReducer,
    bufferReducer,
    masterReducer
})

export default reducers;