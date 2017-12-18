import React from 'react';
import {applyMiddleware, compose, createStore} from 'redux';

import {persistCombineReducers, persistStore} from 'redux-persist'
import {AsyncStorage} from 'react-native';

import * as reducers from '../reducers';
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from "redux-thunk";

const config = {
    key: 'root',
    storage: AsyncStorage,
};


const reducer = persistCombineReducers(config, reducers);

export default function configureStore() {
    const store = createStore(
        reducer,
        compose(
            applyMiddleware(thunk),
            // composeWithDevTools()
        )
    );
    const persistor = persistStore(store);

    return { persistor, store };
}