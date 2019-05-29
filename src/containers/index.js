import React, { Component } from 'react';
// import * as React from 'react'
import { Router, Scene } from "react-native-router-flux";
import { connect } from "react-redux";
import { AsyncStorage, Text } from "react-native";
import Loader from '../constants/Loader';
import Splash from '../containers/Splash'
import Login from './../containers/Login';
// import Main from '../components/home/Main';
import Signup from './../containers/Signup';

import HomeComponent from './../containers/Home'
import Workout from './../containers/Workout'
import Profile from './../containers/Profile'
import Settings from './../containers/Settings'
import LeadrBoard from './../containers/LeadrBoard'
import FooterApp from './../containers/FooterApp'
import LastWeek from './../containers/LastWeek'
import Month from './../containers/Month'
import LevelComponent from './Level'
import SpeechComponent from './Speech'
import SpinnerComponent from './../containers/Spinner'
import SigninComponent from './../containers/Signin'




const RouterWithRedux = connect()(Router);

class Root extends Component{
    constructor(props){
        super(props);

        this.state = {
            token: null,
            isStorageLoaded: false
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('token').then((token) => {
            this.setState({
                token: token !== null,
                isStorageLoaded: true
            })
        });
    }

    render(){
        let { isLogged } = this.props.login;
        let { token, isStorageLoaded } = this.state;
        if(!isStorageLoaded){
            return (
                <Loader loading={true} />
            )
        }else{
            return(
                <RouterWithRedux>
                    <Scene key='root'>
                    <Scene
                            component={Splash}
                            initial={false}
                            hideNavBar={true}
                            key='Splash'
                            title='Splash'
                        />
                        <Scene
                            component={Login}
                            initial={true}
                            hideNavBar={true}
                            key='Login'
                            title='Login'
                        />
                         <Scene
                            component={Signup}
                            initial={false}
                            hideNavBar={true}
                            key='Signup'
                            title='Signup'
                        />
                         <Scene
                            component={HomeComponent}
                            initial={false}
                            hideNavBar={true}
                            key='Home'
                            title='Home'
                        />
                         <Scene
                            component={Workout}
                            initial={false}
                            hideNavBar={true}
                            key='Workout'
                            title='Workout'
                        />
                        <Scene
                            component={Profile}
                            initial={false}
                            hideNavBar={true}
                            key='Profile'
                            title='Profile'
                        />
                        <Scene
                            component={Settings}
                            initial={false}
                            hideNavBar={true}
                            key='Settings'
                            title='Settings'
                        />
                        <Scene
                            component={LeadrBoard}
                            initial={false}
                            hideNavBar={true}
                            key='LeadrBoard'
                            title='LeadrBoard'
                        />
                         <Scene
                            component={FooterApp}
                            initial={false}
                            hideNavBar={true}
                            key='FooterApp'
                            title='FooterApp'
                        />
                         <Scene
                            component={LastWeek}
                            initial={false}
                            hideNavBar={true}
                            key='LastWeek'
                            title='LastWeek'
                        />
                         <Scene
                            component={Month}
                            initial={false}
                            hideNavBar={true}
                            key='Month'
                            title='Month'
                        />
                         <Scene
                            component={LevelComponent}
                            initial={false}
                            hideNavBar={true}
                            key='Level'
                            title='Level'
                        />
                        <Scene
                            component={SpeechComponent}
                            initial={false}
                            hideNavBar={true}
                            key='Speech'
                            title='Speech'
                        />
                         <Scene
                            component={SpinnerComponent}
                            initial={false}
                            hideNavBar={true}
                            key='Spinner'
                            title='Spinner'
                        />
                         {/* <Scene
                            component={SigninComponent}
                            initial={true}
                            hideNavBar={true}
                            key='Signin'
                            title='Signin'
                        /> */}
                        </Scene>
                </RouterWithRedux>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        login: state.login
    }
};

export default connect(mapStateToProps)(Root)
