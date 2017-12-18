import React, {Component} from 'react';
import LoginScreen from "./screens/login/LoginScreen";
import {connect} from "react-redux";
import {View} from "react-native";
import RootNavigator from "./navigators/RootNavigator";


class Root extends Component {


    render() {
        return (
            <View style={{flex:1}}>
                {this.props.user && <RootNavigator/>}
                {!this.props.user && <LoginScreen/>}
            </View>
        );
    }

}

export const mapStateToProps = (inputState) => {
    let state = inputState.ScreenReducers;

    return {
        user: state.user,
        chosenRepo: state.chosenRepo
    }
};


export default connect(mapStateToProps, null)(Root);


