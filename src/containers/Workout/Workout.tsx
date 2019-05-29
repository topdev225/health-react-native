// import React, { Component } from 'react';
import * as React from 'react'
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  AsyncStorage, ImageBackground, Alert, Platform, TextInput, TouchableOpacity, AlertIOS, SafeAreaView
} from 'react-native';

import CountDown from 'react-native-countdown-component';

import { } from 'react-native-gesture-handler';
import CreateActions from '../../actions/ActionExcersiceCreate';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import Tts from "react-native-tts";
import styles from './styles';
import Voice from 'react-native-voice';


import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
var isRecognised = false
class WorkoutComponent extends React.Component {

  constructor(props) {
    super(props);
    Tts.addEventListener("tts-start", event =>
      this.setState({ ttsStatus: "started" })
    );
    Tts.addEventListener("tts-finish", event =>
      this.setState({ ttsStatus: "finished" })
    );
    Tts.addEventListener("tts-cancel", event =>
      this.setState({ ttsStatus: "cancelled" })
    );
    // Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    // Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
    // Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
    // Voice.onSpeechError = this.onSpeechError.bind(this);
    //Tts.getInitStatus().then(this.initTts);
    this.state = {

      isLoading: false,
      totalreps: '',
      totalsets: '',
      token: '',
      pause: true,
      speaks: '',      
    };

  };
  // 
  async componentWillMount() {

    const reps = await AsyncStorage.getItem('reps');
    const sets = await AsyncStorage.getItem('sets');
    const excercise_Name = await AsyncStorage.getItem('excercise_Name');
    console.log(reps,sets,excercise_Name, 'excercise_value')
    const token = await AsyncStorage.getItem('token');
    this.setState({
      'token': token,
    }, () => { });
    this.Exercise_start(reps,sets,excercise_Name)
  }

  async componentDidMount(){
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }

  componentWillUnmount() {
    Voice.stop()
    Voice.removeAllListeners()	
    Voice.destroy().then(Voice.removeAllListeners);    
  }

  dialogopen() {
    this.setState({ dialogclose: true })    
  }

   restartVoice() {
    
    // Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
    // Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
    // Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
    // Voice.onSpeechPartialResults = this.onSpeechPartialResults.bind(this);
    //Voice.start('en-US');
    // try {
    //   Voice.stop()
    //   await Voice.start('en-US');
    // } catch (e) {
    //   console.error("error...........");
    // }
    Voice.stop()
    setTimeout(()=>{
      Voice.start('en-US');
    },100)
    
  }

  setRepsValue(value){
    this.setState({
      totalreps: value
    });
  }

  setSetsValue(value){
    this.setState({
      totalsets: value
    });
  }

  onSpeechStartHandler() {

  }

  onSpeechEndHandler() {
    
  }

  onSpeechError(error) {
    
  }
  
  onSpeechPartialResults(value) {
    //console.log('onSpeechPartialResults: ', value);  
    //Voice.start('en-US');  
  }

  onSpeechResultsHandler(result) {
    console.log('onSpeechRecognized: ', result);
    let output = result.value;
    this.setState({
      speaks: output
    })
    if(output.length > 0){
      console.log("Output")
      if (this.state.dialogclose === true){
        let setsReps = output[0].toLowerCase().split(" ")
        if (setsReps.length > 1){
          if(setsReps[1] == 'reps' && `${Number(setsReps[0])}` != 'NaN'){
            this.setRepsValue(setsReps[0])
          }          
          if(setsReps[1] == 'sets' && `${Number(setsReps[0])}` != 'NaN'){
            this.setSetsValue(setsReps[0])
          }
          console.log("If")
        }
      }else if (output[0].toLowerCase() === 'test'){
        //if (!isRecognised){
          //isRecognised = true
          this.dialogopen()
        //}
        console.log("Else")
      }      
    }
    this.restartVoice()
  }

  onSpeechRecognized = e => {
    // eslint-disable-next-line
    console.log('onSpeechRecognized: ', e);    
  };

  async  createExc() {

    this.props.ExcerciseCreateApi(this.state.totalreps,
      this.state.totalsets,
      this.state.token);
    //AsyncStorage.setItem('totalreps', this.state.totalreps);
    //AsyncStorage.setItem('totalsets', this.state.totalsets)
    //  alert('Updated successfully')
    var exerciseList = JSON.parse(await AsyncStorage.getItem('ExerciseList'));
        // for (let item of ExerciseList) {
            
        // }
    exerciseList.push({"reps": `${this.state.totalreps}`, "steps": `${this.state.totalsets}` })
    AsyncStorage.setItem('ExerciseList',JSON.stringify(exerciseList));
    this.setState({
      dialogclose: false,
      pause: false
    })
    this.props.navigation.navigate('Home')
    //Actions.Home()
    this.props.emitter.emit('updateRepsSets');
  }
  async validation() {
    if (this.state.totalreps == "" || this.state.totalreps == null || this.state.totalreps == undefined || `${Number(this.state.totalreps)}` == 'NaN') {
      Platform.select({
        ios: () => { AlertIOS.alert('Please enter total reps'); },
        android: () => { ToastAndroid.show('Please enter total reps', ToastAndroid.SHORT); }
      })();
      return false;
    }
    if (this.state.totalsets == "" || this.state.totalsets == null || this.state.totalsets == undefined || `${Number(this.state.totalsets)}` == 'NaN') {
      Platform.select({
        ios: () => { AlertIOS.alert('Please enter total sets'); },
        android: () => { ToastAndroid.show('Please enter total sets', ToastAndroid.SHORT); }
      })();
      return false;

    }
    this.createExc()
  }

  // readText = async () => {
  //   Tts.stop();
  //   Tts.speak("Totals reps is" + this.state.totalreps + "Totals sets is" + this.state.totalsets);

  // };
  Exercise_start = async (reps,sets,excercise_Name) => {
    Tts.stop();
    Tts.speak(  excercise_Name + Number(sets) + "sets " + Number(reps) + "reps" );
  };




  render() {

    return (

      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <TouchableOpacity>
          <Image resizeMode="cover" style={Platform.isPad?styles.logoiPad:styles.logoiPhone}
                        source={require('./../../Images/LogoImage.png')} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.dialogopen()}>
            <Image resizeMode="contain" style={{ width: 20, height: 20, marginRight: 15 }}
              source={require('./../../Images/cancel1.png')} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'
          }}>
          <ImageBackground
            source={require('../../Images/timer1.png')}
            style={{
              width: 250,
              height: 250, tintColor: '#ff0000'
            }} >
            <Text style={{ color: '#b71221', marginLeft: 100, marginTop: 70 }}>Exercise</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: 'grey', testWeight: 'bold' }}>:</Text>
              <CountDown
                until={60}
                size={20}
                onFinish={() => this.dialogopen()}
                digitStyle={{ backgroundColor: '#FFF' }}
                digitTxtStyle={{ color: 'grey' }}
                running={this.state.pause}
                timeToShow={['S']}
                timeLabels={{ s: null }}

              />
            </View>
          </ImageBackground>

          <Dialog
            visible={this.state.dialogclose}
            onTouchOutside={() => {
              this.setState({ dialogclose: false });
            }}>
            <DialogContent style={{
              borderRadius: Platform.OS === 'ios' ? 30 : 0,
              width: width - 80, shadowRadius: 10, justifyContent: 'center', paddingTop: 10,
            }}>
              <View>
                {/* <Text style={{color:'#b71221',fontSize:15,marginLeft:20}}>CHANGE PASSWORD</Text> */}
                <View style={{
                  marginTop: 10,
                }}>
                  <Text style={{ fontSize: 15, color: 'black', }}>Total reps</Text>
                  <TextInput
                    style={{ fontSize: 16, borderColor: 'black', borderWidth: 1, padding: 7 }}

                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({ totalreps: text })
                    }
                    value={this.state.totalreps}
                    returnKeyType='next'
                  />
                </View>
                <View style={{
                  marginTop: 10,
                }}>
                  <Text style={{ fontSize: 15, color: 'black', }}>Total sets</Text>
                  <TextInput
                    style={{ fontSize: 16, borderColor: 'black', borderWidth: 1, padding: 7 }}

                    underlineColorAndroid='transparent'
                    onChangeText={(text) => this.setState({ totalsets: text })}
                    value={this.state.totalsets}
                    returnKeyType='next'

                  />

                </View>

                <View style={{ marginTop: 10 }}>
                  <TouchableOpacity onPress={() => this.validation()}

                    style={{
                      backgroundColor: '#145F82', borderRadius: 10, marginTop: 10, width: '98%', height: 40,
                      justifyContent: 'center', alignItems: 'center'
                    }}>
                    <Text style={{ color: 'white' }}>Done</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                  <Text>{`${this.state.speaks}`}</Text>
                </View>
              </View>
            </DialogContent>
          </Dialog>

        </View>
        {this.state.isLoading &&
          <Spinner />
        }
      </SafeAreaView>


    );
  }
}

const mapStateToProps = (state) => {
  return {
    // hasError : state.level.hasError
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ExcerciseCreateApi: (totalreps, totalsets, token) => dispatch(CreateActions.ExcerciseCreateApi(totalreps, totalsets, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutComponent)