import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {connect} from "react-redux";
import ListItem from "./ListItem";


function compareRepos(a, b) {
    let number = b.stargazers_count - a.stargazers_count;
    if (!number) {
        return Date.parse(b.updated_at) - Date.parse(a.updated_at);
    }
    return number;

}

class RepositoryList extends Component {

    render() {
        let repositories = this.props.list;
        repositories.sort(compareRepos);
        return (
            <FlatList
                data={repositories}
                keyExtractor={item => item.name}
                renderItem={({item}) =>
                    <ListItem item={item}/>}
            />
        );
    }
}


export default connect(null, null)(RepositoryList)
