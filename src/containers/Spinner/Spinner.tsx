// import React, { Component } from 'react';
import * as React from 'react'
import LoginActions from '../../actions/ActionLogin';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    Dimensions, View, Modal,
    ActivityIndicator,

    Image,
    AsyncStorage, ImageBackground, TextInput, TouchableOpacity, Platform, AlertIOS, ToastAndroid
} from 'react-native';
import { Actions } from 'react-native-router-flux';
//import console = require('console');

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
// import styles, { COLOR } from './styles';


class SpinnerComponent extends React.Component {

    constructor(props) {
        console.log(props)
        super(props);
        this.state = {
            isLoading: props.data,
        };
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Modal
                    transparent={true}
                    supportedOrientations={['portrait', 'landscape']}
                    visible={this.state.isLoading}
                    onRequestClose={() => console.log("sdfdf")}>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        backgroundColor: '#00000040'
                    }}>
                        <View
                            style={{
                                height: 100,
                                width: 100,
                                borderRadius: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-around'
                            }}>
                            <ActivityIndicator
                                color={"white"}
                                size='large'
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}

export default SpinnerComponent