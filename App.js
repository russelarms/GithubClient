import React, {Component} from 'react';
import {PersistGate} from 'redux-persist/es/integration/react'

import configureStore from './src/config/configureStore'
import {Provider} from "react-redux";
import {ActivityIndicator} from "react-native";
import Root from "./src/Root";

const {persistor, store} = configureStore();

const onBeforeLift = () => {
    // take some action before the gate lifts
}

export default class App extends Component {

    render() {
        return (<Provider store={store}>
            <PersistGate
                loading={<ActivityIndicator/>}
                onBeforeLift={onBeforeLift}
                persistor={persistor}>
                <Root/>
            </PersistGate>
        </Provider>)
    }
};
