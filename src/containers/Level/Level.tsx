// import React, { Component } from 'react';
import * as React from 'react'
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  AsyncStorage, ImageBackground, Alert, Platform, TouchableOpacity
} from 'react-native';
import { } from 'react-native-gesture-handler';
import * as ActionTypes from '../../constants/ActionTypes';
import UpdateActions from '../../actions/ActionDifficulty';
import { connect } from 'react-redux';
import styles, { COLOR } from './styles';
import { Actions } from 'react-native-router-flux';
// import console = require('console');
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height

class LevelComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      begin: false,
      inter: false,
      advance: false,
      token: '',
      status: '',
      difficulty: ''
    };
  };

  async componentWillMount() {
    const status = await AsyncStorage.getItem('difficulty');
    const token = await AsyncStorage.getItem('token');
    this.setState({
      'token': token,
      status: status
    }, () => { });
  }

  async beginner() {
    if (this.state.begin == false) {
      this.setState({
        begin: true,
        inter: false,
        advance: false,
        difficulty: 'B'
      }, () => {
        AsyncStorage.setItem('difficulty', 'B')
      })
   
    }
    else {
      this.setState({
        begin: false
      })
    }
  }
  Inter() {

    if (this.state.inter == false) {
      this.setState({
        inter: true,
        begin: false,
        advance: false,
        difficulty: 'I'
      }, () => {
        AsyncStorage.setItem('difficulty', 'I')
      })
    
    }
    else {
      this.setState({
        inter: false
      })
    }
  }
  Advance() {
    if (this.state.advance == false) {
      this.setState({
        advance: true,
        begin: false,
        inter: false,
        difficulty: 'A'
      }, () => {
        AsyncStorage.setItem('difficulty', 'A')
      })            
    }
    else {
      this.setState({
        advance: false
      })
    }
  }


  UpdateDiffbtn() {
    //let { difficulty } = this.state;
    this.props.updateDifficultyApi(this.state.difficulty, this.state.token);
  }

  render() {
    const { hasError, isLogged } = this.props;
    console.log(isLogged, "is Loaaged")
    console.log(hasError, "is hasError")
    if (hasError !== false && hasError !== undefined) {
      alert(hasError);

    }
    if (isLogged === true) {
      Actions.Home();
    }
    return (
      <View style={styles.container}>
        <View style={styles.View1}>
          <Text style={styles.HeaderText}>Difficulty Level</Text>
        </View>
        <View
          style={styles.View2}>
          <View style={{
            flexDirection: 'row', justifyContent: 'center',
            alignItems: 'center',
          }}>
            {this.state.begin == false &&
              <TouchableOpacity
                onPress={() => { this.beginner() }}
                style={styles.bigner} >
                <Text style={{ color: 'black', fontSize: 15, }}>
                  Beginner
            </Text>
              </TouchableOpacity>}
            {this.state.begin == true &&
              <TouchableOpacity
                style={styles.bigner}>
                <Text style={{ color: '#145F82', fontSize: 15, }}>
                  Beginner
            </Text>
              </TouchableOpacity>
            }

            {this.state.inter == false &&
              <TouchableOpacity
                onPress={() => { this.Inter() }}
                style={styles.intermidate} >
                <Text style={{ color: 'black', fontSize: 15 }}>
                  Intermediate
            </Text>
              </TouchableOpacity>}
            {this.state.inter == true &&
              <TouchableOpacity style={styles.intermidate} >
                <Text style={{ color: '#145F82', fontSize: 15 }}>
                  Intermediate
            </Text>
              </TouchableOpacity>}

            {this.state.advance == false &&
              <TouchableOpacity
                onPress={() => { this.Advance() }}
                style={styles.advance}>
                <Text style={{ color: 'black', fontSize: 15 }}>
                  Advanced
            </Text>
              </TouchableOpacity>}
            {this.state.advance == true &&
              <TouchableOpacity style={styles.advance}>
                <Text style={{ color: '#145F82', fontSize: 15 }}>
                  Advanced
            </Text>
              </TouchableOpacity>}

          </View>
          <TouchableOpacity
            onPress={() => { this.UpdateDiffbtn() }}
            //onPress={() => { this.props.navigation.navigate("Home") }}
            style={styles.Done}>
            <Text style={{ color: 'white', fontSize: 18 }}>
              Done
            </Text>

          </TouchableOpacity>
        </View>
      </View>

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
    updateDifficultyApi: (difficulty, token) => dispatch(UpdateActions.updateDifficultyApi(difficulty, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelComponent);