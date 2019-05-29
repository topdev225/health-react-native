// import React, { Component } from 'react';
import * as React from 'react'
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Image,
    AsyncStorage, ImageBackground
} from 'react-native';
import styles, { COLOR } from './styles';
import { Actions } from 'react-native-router-flux';
// import console = require('console');

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class Splash extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id:''

        };
    };
    async componentDidMount() {
        // const user_id =  await AsyncStorage.getItem('user_id')
        //  console.log(user_id)
     
            try {
              
                setTimeout(() => {
                        Actions.Signin();
                      //  Actions.letsplay('Letsplay');

                    
                  
                    
                }, 500);
            
        }
            catch (error) {
                console.log('error' + error)
            }
                
    }
    //  componentDidMount() {
    //     // const user_id = await AsyncStorage.getItem('user_id');
    //     // console.log(user_id,"user_id")
    //     try {
    //         setTimeout(() => {
    //             //this.props.navigation.navigate('Login');
    //             Actions.Login()
    //         }, 1500);
    //     }
    //     catch (error) {
    //         console.log('error' + error)
    //     }
    // }
    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.container, { marginTop: 5 }]}>
                    <Image resizeMode="contain" style={styles.Images}
                        source={require('./../../Images/download.jpeg')} />
                    <Text style={styles.Text}>PITON</Text>
                </View>

            </View>
        );
    }
}
export default Splash;

