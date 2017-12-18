import React, {Component} from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    Dimensions,
    Image,
    Platform,
    ProgressBarAndroid,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import {connect} from "react-redux";
import {login} from "../../actions/ScreenActions";
import {CLR_GRAY_1, CLR_RED_0} from "../../common/colors";

const window = Dimensions.get('window');


class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            login: null,
            password: null,
            showError: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.resetShowError(nextProps)
    }

    resetShowError(nextProps) {
        if (nextProps.error && !this.state.showError) {
            this.state.showError = true;
        }
    }

    onLoginClick() {
        let login = this.state.login;
        let password = this.state.password;
        if (login && login.length >= 5 && password && password.length >= 5) {
            this.props.performLogin(login, password)
        } else {
            Alert.alert('Data incorrect');
        }
    }

    hideError() {
        this.setState({showError: false});
    }

    renderError() {
        let error = this.props.error;
        let showError = this.state.showError;
        if (error && showError) {
            return (
                <View style={loginStyles.errorContainer}>
                    <Text style={loginStyles.errorText}>
                        {"Error: " + error}
                    </Text>
                    <TouchableOpacity
                        style={loginStyles.errorClose}
                        onPress={this.hideError.bind(this)}>
                        <Image source={require('../../../assets/ic_close.png')}/>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return <View/>
        }
    }

    renderProgress() {
        if (!this.props.showLoader) return <View/>;

        if (Platform.OS === 'ios') {
            let alertWidth = 100;
            let alertHeight = 100;

            let progressStyle = {
                position: 'absolute',
                top: window.height / 2 - alertHeight / 2,
                left: window.width / 2 - alertWidth / 2,
                width: alertWidth,
                height: alertHeight,
            };
            return <View style={[progressStyle, {
                opacity: 0.5,
                borderRadius: 10,
                backgroundColor: CLR_GRAY_1,
                alignItems: 'center',
                justifyContent: 'center'
            }]}>
                <ActivityIndicator/>
            </View>
        } else {
            let alertWidth = 50;
            let alertHeight = 50;

            let progressStyle = {
                position: 'absolute',
                top: window.height / 3 - alertHeight / 3,
                left: window.width / 2 - alertWidth / 2,
                width: alertWidth,
                height: alertHeight,
            };
            return <ProgressBarAndroid
                style={progressStyle}
                styleAttr="Inverse"/>;
        }
    }

    render() {
        let {container, logo, inputContainer, button, input} = loginStyles;
        return (
            <View style={container}>
                <Image style={logo}
                       source={require('../../../assets/GitHub_Logo.png')}/>
                <View style={inputContainer}>
                    <TextInput
                        style={input}
                        placeholder="login"
                        blurOnSubmit={true}
                        onChangeText={(text) => this.setState({login: text})}
                        onSubmitEditing={() => {
                            this.refs.SecondInput.focus();
                        }}
                    />
                    <TextInput
                        ref='SecondInput'
                        style={input}
                        secureTextEntry={true}
                        placeholder="password"

                        onChangeText={(text) => this.setState({password: text})}
                        onSubmitEditing={() => {
                            this.onLoginClick();
                        }}

                    />
                </View>
                <View style={button}>
                    <Button
                        color='grey'
                        title='Login'
                        onPress={this.onLoginClick.bind(this)}
                    />
                </View>
                {this.renderProgress()}
                {this.renderError()}
            </View>
        );
    }
}

const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    logo: {
        height: 70,
        width: 300,
        marginBottom: 30,
        alignSelf: 'center'
    },
    inputContainer: {marginBottom: 20},
    input: {
        marginLeft: 40,
        marginRight: 40,
        marginTop: 8,
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
        borderBottomColor: '#b9bfc0',
        alignSelf: 'stretch',
        fontSize: 20
    },
    button: {
        marginLeft: 42,
        marginRight: 42
    },
    errorContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        maxHeight: 100,
        flexDirection: 'row',
        paddingTop: 15,
        width: window.width,
        opacity: 0.8,
        backgroundColor: CLR_RED_0,
    },
    errorText: {flex: 1, padding: 26, color: 'white', fontSize: 16},
    errorClose: {paddingTop: 20, paddingRight: 6}
});

export const mapStateToProps = (inputState) => {
    let state = inputState.ScreenReducers;

    return {
        showLoader: state.showLoader,
        error: state.error,
    }
};

export default connect(mapStateToProps, {performLogin: login})(LoginScreen)
