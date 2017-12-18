import React, {Component} from 'react';
import {Button, View} from 'react-native';
import {connect} from "react-redux";
import {hideRepo, logout} from "../../actions/ScreenActions";

class ProfileScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.name}`,
        headerStyle: {
            backgroundColor: 'white',
        },
    });


    render() {

        return (
            <View style={styles.main}>
                <View
                    style={styles.button}
                >
                    <Button
                        onPress={() => {
                            this.props.logout()
                        }}
                        color='grey'
                        title='Logout'/>
                </View>
            </View>
        );
    }
}


const styles = {
    main: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: 'white'
    },
    button: {
        marginLeft: 16,
        marginRight: 16
    }
};

export const mapStateToProps = (inputState) => {
    let state = inputState.ScreenReducers;

    return {
        repo: state.chosenRepo,
    }
};


export default connect(mapStateToProps, {hideRepo, logout})(ProfileScreen)
