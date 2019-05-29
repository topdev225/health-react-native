import * as React from 'react'
//  import React, { Component } from './node_modules/react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';

import { createBottomTabNavigator } from 'react-navigation';
import Home from '../Home';
import Workout from '../Workout'
import Profile from '../Profile'
import Settings from '../Settings'
import LeadrBoard from '../LeadrBoard'


class TabNavigator extends React.Component {
    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.welcome}>Welcome to React Native!</Text>
            </View>
        );
    }
}

// const TabNavigator = createBottomTabNavigator({
//     Home: {
//         screen: Home,
//         navigationOptions: {
//             tabBarLabel: 'HOME'
//         }
//     },
//     Workout: {
//         screen: Workout,
//         navigationOptions: {
//             tabBarLabel: 'WORKOUT'
//         }
//     },
//     Profile: {
//         screen: Profile,
//         navigationOptions: {
//             tabBarLabel: 'PROFILE'
//         }
//     },
//     Settings: {
//         screen: Settings,
//         navigationOptions: {
//             tabBarLabel: 'SETTINGS'
//         }
//     },
//     LeadrBoard: {
//         screen: LeadrBoard,
//         navigationOptions: {
//             tabBarLabel: 'LEADRBOARD'
//         }
//     },
// }, {
//     tabBarOptions: {
//         activeTintColor: '#ff944d',
//         inactiveTintColor: 'grey',
//         style: {
//             backgroundColor: "white",
//             borderTopWidth: 0,
//             shadowOffset: { width: 5, height: 3 },
//             shadowColor: "black",
//             shadowOpacity: 0.5,
//             elevation: 5
//         }
//     }
// });


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: 'center',
//         margin: 10,
//     },
//     instructions: {
//         textAlign: 'center',
//         color: '#333333',
//         marginBottom: 5,
//     },
// });

export default TabNavigator;