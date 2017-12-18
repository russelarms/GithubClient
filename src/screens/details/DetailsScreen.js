import React, {Component} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {connect} from "react-redux";
import {hideRepo} from "../../actions/ScreenActions";

Date.prototype.yyyymmdd = function () {
    let mm = this.getMonth() + 1;
    let dd = this.getDate();

    return [this.getFullYear(),
        (mm > 9 ? '' : '0') + mm,
        (dd > 9 ? '' : '0') + dd
    ].join(' ');
};

class DetailsScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `${navigation.state.params.name}`,
        headerStyle: {
            backgroundColor: 'white',
        },
    });

    renderBox(value) {
        return (
            <View style={{
                minHeight: 36,
            }}>
                <Text style={{
                    paddingLeft: 16,
                    paddingTop: 16,
                    paddingRight: 16,
                    fontSize: 16
                }}>{value}</Text>
            </View>
        )
    }

    render() {
        let repo = this.props.repo;

        return (
            <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
                {this.renderBox('Full Name: ' + repo.full_name)}
                {this.renderBox('Private: ' + repo.private.toString())}
                {this.renderBox('Is fork: ' + repo.fork.toString())}
                {this.renderBox('Description: ' + repo.description)}
                {this.renderBox('Created at: ' + new Date(repo.created_at).yyyymmdd())}
                {this.renderBox('Updated at: ' + new Date(repo.updated_at).yyyymmdd())}
                {this.renderBox('Ssh url: ' + repo.ssh_url)}
                {this.renderBox('Size: ' + repo.size)}
                {this.renderBox('Default branch: ' + repo.default_branch)}
            </ScrollView>
        );
    }
}

export const mapStateToProps = (inputState) => {
    let state = inputState.ScreenReducers;

    return {
        repo: state.chosenRepo,
    }
};


export default connect(mapStateToProps, {hideRepo})(DetailsScreen)
