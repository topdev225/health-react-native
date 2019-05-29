// import React, { Component } from 'react';
import * as React from 'react'
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Image,
    AsyncStorage, ImageBackground, TextInput, TouchableOpacity,Platform,AlertIOS,ToastAndroid, Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import SignupAction from '../../actions/ActionSigup';
import { connect } from 'react-redux';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import styles, { COLOR } from './styles';
import { IS_SIGNUPED } from '../../constants/SignupActionTypes';
import Spinner from '../../containers/Spinner'
import Loader from './../../constants/Loader';
let showSpinner = false
 class Signup extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email:null,
            password:null,
            first_name:null,
        };
    };
    

    componentDidMount(){
        this.props.resetSignUpAPI()
    }

    signupBtn(){
        let { first_name,email, password } = this.state;
        this.props.signupAPI(first_name,email, password);
        showSpinner = true
    }
    alertok(){
        
              Platform.select({
                ios: () => {
                  AlertIOS.alert('', 'You have successfully registered. We have sent an verification email on your email address. Please verify your email to login.', [
                  //  { text: 'CANCEL', onPress: () => console.log('CANCEL Pressed'), style: 'cancel' },
                    { text: 'Ok', onPress: () => { 
                        Actions.Login() 
                        showSpinner = false
                        this.forceUpdate()
                    } },
                  ])
                },
                android: () => {
                  Alert.alert('', 'You have successfully registered. We have sent an verification email on your email address. Please verify your email to login.', [
                    //{ text: 'CANCEL', onPress: () => console.log('CANCEL Pressed'), style: 'cancel' },
                    { text: 'Ok', onPress: () => { 
                        Actions.Login() 
                        showSpinner = false
                        this.forceUpdate()
                    } },
                  ]);
                }
              })();
    }
   
   render() {
        const { hasError, isSignuped ,isLoading} = this.props;
        console.log(hasError, isSignuped ,isLoading)

        if(hasError !== undefined && hasError !== false){
            showSpinner = false
            alert(hasError);            
        }
        if(isSignuped === true){                                    
            Platform.select({
                ios: () => {
                  AlertIOS.alert('', 'You have successfully registered. We have sent an verification email on your email address. Please verify your email to login.', [
                  //  { text: 'CANCEL', onPress: () => console.log('CANCEL Pressed'), style: 'cancel' },
                    { text: 'Ok', onPress: () => { 
                        this.props.navigation.goBack() 
                        this.props.resetSignUpAPI()
                        showSpinner = false
                        this.forceUpdate()
                    } },
                  ])
                },
                android: () => {
                  Alert.alert('', 'You have successfully registered. We have sent an verification email on your email address. Please verify your email to login.', [
                    //{ text: 'CANCEL', onPress: () => console.log('CANCEL Pressed'), style: 'cancel' },
                    { text: 'Ok', onPress: () => {
                        this.props.navigation.goBack() 
                        this.props.resetSignUpAPI()
                        showSpinner = false
                        this.forceUpdate()
                    } },
                  ]);
                }
              })();         
        }
        return (
            <View style={styles.container}>
                <View style={styles.ViewImage}>
                     <Image resizeMode="cover" style={Platform.isPad?styles.logoiPad:styles.logoiPhone}
                        source={require('./../../Images/loggedin_logo.png')} />
                </View>
                <View style={styles.View1}>
                    <Text style={styles.EmailText}>Name</Text>
                    <TextInput
                        style={{ fontSize: 16, marginLeft: 3 }}

                        underlineColorAndroid='gray'
                        onChangeText={(text) => this.setState({ first_name: text })}
                        value={this.state.name}
                        returnKeyType='next'
                         />
                    <View style={{ height: 1, backgroundColor: '#000', marginTop: 3 }} />

                </View>
                <View style={styles.View1}>
                    <Text style={styles.EmailText}>Email</Text>
                    <TextInput
                        style={{ fontSize: 16, marginLeft: 3 }}

                        underlineColorAndroid='gray'
                        onChangeText={(text) => this.setState({ email: text })}
                        value={this.state.email}
                        returnKeyType='next'
                         />
                    <View style={{ height: 1, backgroundColor: '#000', marginTop: 3 }} />

                </View>
                <View style={styles.View2}>

                    <Text style={styles.EmailText}>Password</Text>
                    <TextInput
                        style={{ fontSize: 16, marginLeft: 3 }}
                        secureTextEntry={true} 
                        underlineColorAndroid='gray'
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                        returnKeyType='next'
                        />
                    <View style={{ height: 1, backgroundColor: '#000', marginTop: 3 }} />
                </View>
                <TouchableOpacity onPress={() => { this.signupBtn() }} >
                    <View style={styles.View3}>
                        <Text style={styles.SignText}>Sign Up</Text>
                    </View>
                </TouchableOpacity>
                <View>
                    <View style={styles.View4}>
                        <View style={styles.View5}></View>

                        <Text style={{ fontSize: 13, color: '#000' }}> or connect with </Text>

                        <View style={styles.View5}></View>

                    </View>
                </View>

                <View>
                    {/* <View style={styles.View6}>
                        <TouchableOpacity style={styles.google}>

                            <Image resizeMode="contain" style={styles.googleImg}
                                source={require('./../../Images/google.png')} />
                            <Text style={{ color: '#fff', fontSize: 15 }}>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.google, {
                            backgroundColor: '#232390',
                            marginRight: 15
                        }]} >
                            <Image resizeMode="contain" style={[styles.googleImg, { marginTop: 5 }]}

                                source={require('./../../Images/facebook.png')} />
                            <Text style={{ color: '#fff', fontSize: 15 }}>FaceBook</Text>
                        </TouchableOpacity>
                    </View> */}

                    <View style={[styles.View6, { justifyContent: 'center', alignItems: 'center' }]}>
                        <Text>Already have an account?</Text>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate("Login") }} >
                            <Text style={{ color: '#000', fontWeight: 'bold' }}> Sign In</Text>
                        </TouchableOpacity>


                    </View>
                </View>
              
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isSignuped: state.signup.isSignuped,
        hasError : state.signup.hasError,
        isLoading: state.signup.isLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signupAPI: (first_name,email, password) => dispatch(SignupAction.signupAPI(first_name,email, password)),
        resetSignUpAPI: () => dispatch(SignupAction.resetSignUpAPI())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);

