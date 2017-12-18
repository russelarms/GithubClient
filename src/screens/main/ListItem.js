import React, {Component} from 'react';
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CLR_GRAY_0, CLR_GRAY_1, CLR_GREEN_0, fetchLangColor} from "../../common/colors";
import {connect} from "react-redux";
import {openRepo} from "../../actions/ScreenActions";
import {withNavigation} from "react-navigation";

class ListItem extends Component {

    renderDescription(item) {
        let description = item.description;
        if (description) {
            return (
                <Text style={itemStyles.description}>{item.description}</Text>
            );
        } else {
            return <View style={{flex: 1}}/>
        }
    }

    renderSubline(item) {
        return (
            <View style={[{flexDirection: 'row'}, itemStyles.description]}>
                {this.renderDescription(item)}
                {this.renderArrowRight()}
            </View>
        );
    }

    renderStars(item) {
        let stargazersCount = item.stargazers_count;
        if (stargazersCount) {
            return (
                <View style={itemStyles.row}>
                    <Image style={itemStyles.icon}
                           resizeMode='contain'
                           source={require('../../../assets/star.png')}/>
                    <Text>{stargazersCount}</Text>
                </View>
            );
        }
    }

    renderLang(item) {
        let lang = item.language;
        if (lang) {
            return (
                <View style={itemStyles.row}>
                    <View style={[itemStyles.circle, {backgroundColor: fetchLangColor(lang)}]}/>
                    <Text>{lang}</Text>
                </View>
            );
        }
    }


    renderForkOrOwn(item) {
        let fork = item.fork;
        if (fork) {
            return (
                <View style={itemStyles.fork}>
                    <View style={{flex: 1}}/>
                    <Text style={{color: CLR_GRAY_0}}>
                        Forked
                    </Text>
                </View>
            );
        }
    }

    renderForksCount(item) {
        let forksCount = item.forks_count;
        if (forksCount) {
            return (
                <View style={itemStyles.row}>
                    <Image style={itemStyles.icon}
                           resizeMode='contain'
                           source={require('../../../assets/repo-forked.png')}/>
                    <Text>{forksCount}</Text>
                </View>
            );
        }
    }

    renderArrowRight() {
        if (Platform.OS === 'ios') {
            return (<Image
                style={itemStyles.arrow}
                source={require('../../../assets/arrow_right.png')}

            />)
        }
    }

    renderTitle(name) {
        return (
            <View style={itemStyles.firstLine}>
                <Text style={itemStyles.title}>{name}</Text>
            </View>
        )
    }


    render() {
        let item = this.props.item;

        return (
            <TouchableOpacity
                style={itemStyles.container}
                onPress={() => {
                    this.props.openRepo(item.name);
                    this.props.navigation.navigate('Details', {name: item.name});
                }}
            >
                {this.renderTitle(item.name)}
                {this.renderSubline(item)}
                <View style={itemStyles.subline}>
                    {this.renderLang(item)}
                    {this.renderStars(item)}
                    {this.renderForksCount(item)}
                    {this.renderForkOrOwn(item)}
                </View>
            </TouchableOpacity>
        );
    }
}

const itemStyles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingLeft: 12,
        height: 115,
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderBottomColor: CLR_GRAY_1
    },
    fork: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    description: {
        flex: 1,
    },
    firstLine: {
        flexDirection: 'row',
    },
    arrow: {
        height: 15,
        width: 15,
        marginRight: 5
    },
    icon: {
        height: 15,
        width: 15,
        marginRight: 5,
        marginLeft: 5
    },
    circle: {
        height: 15,
        width: 15,
        borderRadius: 8,
        marginRight: 5,
        backgroundColor: CLR_GREEN_0
    },
    subline: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    row: {
        flexDirection: 'row',
    }
});

export default connect(null, {openRepo})(withNavigation(ListItem))
