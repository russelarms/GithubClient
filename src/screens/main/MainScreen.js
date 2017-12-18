import React, {Component} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {connect} from "react-redux";
import {fetchList} from "../../actions/ScreenActions";
import RepositoryList from "./RepositoryList";
import ImageLoad from "../../common/ImageLoad";


class MainScreen extends Component {

    static navigationOptions = ({navigation}) => {
        let title = 'Main';
        let placeHolder = require("../../../assets/mark.png");
        let avatar;
        if (navigation.state.params) {
            let userName = navigation.state.params.title;
            avatar = navigation.state.params.avatar;
            title = userName ? userName : title;
            console.log("user! " + JSON.stringify(avatar));
        }

        return {
            title: title,
            headerRight: navigation.state.params ?
                <TouchableOpacity onPress={() => navigation.navigate('Profile', {name: title})}>
                    <ImageLoad
                        style={styles.avatar}
                        loadingStyle={{size: 'large', color: 'black'}}
                        source={{uri: avatar}}
                        placeholderSource={placeHolder}
                        borderRadius={17}
                    />
                </TouchableOpacity>
                : <View/>
        };
    };

    componentWillMount() {
        let {auth, user} = this.props;

        let reposUrl = user.repos_url;
        this.props.fetchList(reposUrl, auth);
        this.props.navigation.setParams({title: user.name, avatar: user.avatar_url})
    }

    render() {
        let {navigation, repositories} = this.props;

        return (
            <View style={styles.main}>
                {repositories && <RepositoryList list={repositories}/>}
                {!repositories && <ActivityIndicator/>}
            </View>
        );
    }
}

const styles = {
    header: {
        marginTop: 25,
        marginLeft: 8,
        padding: 5,
        flexDirection: 'row'
    },
    main: {
        flex: 1,
        backgroundColor: 'white'
    },
    avatar: {
        height: 32,
        width: 32,
        borderRadius: 16,
        marginRight: 6
    }
};

export const mapStateToProps = (inputState) => {
    let state = inputState.ScreenReducers;

    return {
        user: state.user,
        auth: state.auth,
        repositories: state.repositories,
    }
};


export default connect(mapStateToProps, {fetchList})(MainScreen)
