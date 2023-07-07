import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '@nestoHub/reducers';
import { applyMiddleware, legacy_createStore as createStore, compose } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'

const enhancers = [
    applyMiddleware(
        thunkMiddleware,
        createLogger({
            collapsed: true,
        }),
    ),
]
const enhancer: any = compose(...enhancers);

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['authReducer', 'userReducer', 'brokerHomeReducer', 'masterReducer'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = createStore(persistedReducer, {}, enhancer);
export const persistor = persistStore(store);