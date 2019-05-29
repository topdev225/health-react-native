import * as React from 'react'
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Image,
    AsyncStorage, ImageBackground, TextInput, TouchableOpacity, SafeAreaView, ScrollView, FlatList, Platform
} from 'react-native';
import { Footer } from 'native-base';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import ListActions from '../../actions/ActionExcersiceList';
import DifficultListActions from '../../actions/ActionExcersiceDifficultList';
import * as shape from 'd3-shape'
import { connect } from 'react-redux';
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
import styles, { COLOR } from './styles';
import Spinner from '../../containers/Spinner'
import { Actions } from 'react-native-router-flux';
// import console = require('console');
import Voice from 'react-native-voice';
import EventEmitter from 'events';



class HomeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            Name: '',
            isLoading: false,
            totalreps: '00',
            totalsets: '00',
            token: '',
            first_name: '',
            no_of_rep: [],
            no_of_sets: [],
            elist: [],
            numberreps:'00',
            numbersets:'00'
        };
        this._emitter = new EventEmitter();
    };

    async componentWillMount() {
        // this.willFocus = this.props.navigation.addListener('willFocus', () => {    
        // });
        this.listapi()
        this.difficultlist()
        const first_name = await AsyncStorage.getItem('first_name');
        this.setState({
            first_name: first_name,
        })
        this._emitter.addListener('updateRepsSets', () => {
            this.totalWorkoutHomeScreen()
        });
    }

    //----this function for excerciselist api-----//
    listapi = async () => {
        const token = await AsyncStorage.getItem('token');
        this.props.ExcerciseListApi(token);
    }

    difficultlist = () => {
        this.props.diffcultiListApi();
    }

    async componentDidMount() {
        this.totalWorkoutHomeScreen()
        Voice.isAvailable().then((isAllowed)=>{
            if (isAllowed){
                console.log("isSpeechAvailable==========Success")
            }
        }).catch((error)=>{
            if (error){
                console.log("isSpeechAvailable==========Error")
            }
        })
        Voice.isRecognizing().then((isAllowed)=>{
            console.log("isRecognizing==========then")
        }).catch((error)=>{
            console.log("isRecognizing==========Catch")
        });
    }


    async totalWorkoutHomeScreen(){
        //----random number selection and get exlist------//
        var no_of_rep = []
        var no_of_sets = []
        var excercise = []
        var ExercisedifficultyList = JSON.parse(await AsyncStorage.getItem('ExerciseDificultyList'));
        var excerciselist = ExercisedifficultyList[Math.floor(Math.random() * ExercisedifficultyList.length)];
        console.log(excerciselist.reps,"randomrepsList")
        console.log(excerciselist.steps,"randomstepsList")
        console.log(excerciselist.excercise,"randomexList")
      
      
    
        AsyncStorage.setItem('reps', excerciselist.reps.toString())
        AsyncStorage.setItem('sets', excerciselist.steps.toString())
        AsyncStorage.setItem('excercise_Name', excerciselist.excercise)
     
        this.setState({
            no_of_rep: no_of_rep,
            no_of_sets: no_of_sets
        })
       //------------end--------------//

      //-------addition of exercise-----//
        var noofrep = []
        var noofsets = []
        var ExerciseList = JSON.parse(await AsyncStorage.getItem('ExerciseList'));
        for (let item of ExerciseList) {
            noofrep.push(Number(item.reps))
        }
        for (let item of ExerciseList) {
            noofsets.push(Number(item.steps))
        }
        var treps = 0;
        var tsets = 0;
        var i;
        for (i = 0; i < noofrep.length; i++) {
            if(Number(noofrep[i]) != NaN){
                treps += noofrep[i];
            }            
        }
        for (i = 0; i < noofsets.length; i++) {
            if(`${Number(noofsets[i])}` != 'NaN'){
                console.log("=================================",Number(noofsets[i]))
                tsets += noofsets[i];
            }            
        }
        this.setState({
            numberreps: treps,
            numbersets: tsets,
        })
        //---------end--------//      
        this.props.diffcultiListApi();
        this.setState({
            elist: ExercisedifficultyList,
        })
    }
  
    componentWillUnmount() {
        this._emitter.removeAllListeners();
      }

    componentWillReceiveProps(nextProps){
        console.log("componentWillReceiveProps");
        this.totalWorkoutHomeScreen()
    }

    stepreps(item) {
        console.log(item)
        // AsyncStorage.setItem('totalreps', item.totalreps);
        // AsyncStorage.setItem('totalsets', this.state.totalsets
    }

    async WorkoutComponent() {
        var ExercisedifficultyList = JSON.parse(await AsyncStorage.getItem('ExerciseDificultyList'));
        var excerciselist = ExercisedifficultyList[Math.floor(Math.random() * ExercisedifficultyList.length)];
        console.log(excerciselist.reps,"randomrepsList")
        console.log(excerciselist.steps,"randomstepsList")
        console.log(excerciselist.excercise,"randomexList")
      
      
    
        AsyncStorage.setItem('reps', excerciselist.reps.toString())
        AsyncStorage.setItem('sets', excerciselist.steps.toString())
        AsyncStorage.setItem('excercise_Name', excerciselist.excercise)
        //Actions.Workout()
        this.props.navigation.navigate('Workout',{
            emitter:this._emitter
        })
    }

    async logoutButtonPressed(){
        AsyncStorage.removeItem('token')
        this.props.navigation.navigate('Login') 
    }


    render() {
        const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
        const axesSvg = { fontSize: 12, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30

        return (
            <SafeAreaView style={styles.container} >
                <View style={{backgroundColor:'transparent', position:'absolute', width:width, flexDirection: 'row',justifyContent: 'space-between'}}>
                    <Image resizeMode="contain" style={Platform.isPad? styles.leftLogoiPad : styles.leftLogoiPhone}
                        source={require('./../../Images/LogoImage.png')} />
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: Platform.isPad? 60:30 }}>
                        <Text style={{ fontSize: 18 }}>Good Afternoon</Text>
                        <Text style={{ fontWeight: 'bold' }}>{this.state.first_name}</Text>
                    </View>
                    <View style={Platform.isPad? styles.logoutViewiPad : styles.logoutViewiPhone}>
                        <TouchableOpacity style={Platform.isPad? styles.logoutiPad : styles.logoutiPhone} onPress={()=>this.logoutButtonPressed()}>
                            <Text style={{color:'white'}}> LOGOUT </Text>
                        </TouchableOpacity> 
                    </View>                       
                </View>
                <ScrollView style={{backgroundColor:'transparent', marginTop: Platform.isPad? 120:60 }}>                    
                    <View>
                        <View style={{ flexDirection: 'row', }}>
                            <Text style={{ marginTop: 15, marginLeft: 30 }}>Current</Text>
                            <Text style={{ marginTop: 15, marginLeft: 7 }}>LastWeek</Text>
                            <Text style={{ marginTop: 15, marginLeft: 7 }}>Month</Text>
                        </View>
                        <View style={{ height: 300, padding: 20, flexDirection: 'row' }}>
                            <YAxis
                                data={data}
                                style={{ marginBottom: xAxisHeight }}
                                contentInset={verticalContentInset}
                                svg={axesSvg}
                            />
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <LineChart
                                    style={{ flex: 1 }}
                                    data={data}
                                    contentInset={verticalContentInset}
                                    svg={{ stroke: 'rgb(134, 65, 244)' }}
                                >
                                    <Grid />
                                </LineChart>
                                {/* <XAxis
                                    style={{ marginHorizontal: -10, height: xAxisHeight }}
                                    data={this.state.no_of_sets.length !== 0 ? this.state.no_of_sets : data}
                                    formatLabel={(value, index) => index}
                                    contentInset={{ left: 10, right: 10 }}
                                    svg={axesSvg}
                                /> */}
                            </View>
                        </View>
                    </View>
                    <View style={{ marginLeft: 30, marginRight: 30 }}>
                        <FlatList
                            data={this.state.elist}
                            horizontal={true}
                            renderItem={({ item }) =>
                                <View style={{ marginLeft: 20 }}>
                                    <TouchableOpacity onPress={() => { this.stepreps(item) }}>

                                        <Text>{item.excercise}</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ flexDirection: 'row' }}>

                            <Image resizeMode="contain" style={{ width: 20, height: 20, marginTop: 10 }}
                                source={require('./../../Images/strong.png')} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 15, color: '#b71221', marginLeft: 10 }}>{this.state.numberreps}</Text>
                                <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Total reps</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>

                            <Image resizeMode="contain" style={{ width: 20, height: 20, marginTop: 10, marginRight: 3 }}
                                source={require('./../../Images/dumbell.png')} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ justifyContent: 'center', alignItems: 'center', fontSize: 15, color: '#b71221', marginLeft: 10 }}>{this.state.numbersets}</Text>
                                <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Total sets</Text>
                            </View>
                        </View>

                    </View>
                    <View>
                    </View>
                    <TouchableOpacity onPress={() => { this.WorkoutComponent() }}>
                        <View style={{
                            borderRadius: 10,
                            height: 40, alignItems: 'center',
                            marginLeft: 30, marginRight: 30, marginTop: 35,
                            justifyContent: 'center', backgroundColor: '#145F82'
                        }}>
                            <Text style={{
                                fontSize: 20, color: '#fff',
                                textAlign: 'center',
                                backgroundColor: 'transparent'
                            }}>Start</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity >
                        <View style={{
                            borderRadius: 10,
                            height: 40, alignItems: 'center',
                            marginLeft: 30, marginRight: 30, marginTop: 25,
                            justifyContent: 'center', backgroundColor: '#fff', borderColor: '#145F82', borderWidth: 1
                        }}>
                            <Text style={{
                                fontSize: 20, color: '#145F82',
                                textAlign: 'center',
                                backgroundColor: 'transparent'
                            }}>Workout Routine</Text>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
                <Footer style={styles.footer}>
                    <View
                        style={{
                            width: width,
                            justifyContent: 'space-around',
                            backgroundColor: "#fff",
                            flexDirection: 'row',
                            alignItems: "center"
                        }}>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity >


                                <Image
                                    source={require('../../Images/home.png')}
                                    style={{
                                        width: 25,
                                        height: 25, tintColor: '#b71221'
                                    }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity >


                                <Image
                                    resizeMode={'contain'}
                                    source={require('../../Images/target.png')}
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: '#000'
                                    }} />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <TouchableOpacity>


                                <Image
                                    source={require('../../Images/user.png')}
                                    style={{
                                        width: 25,
                                        height: 25, tintColor: '#000'
                                    }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity

                                style={{
                                    marginRight: 0
                                }}>
                                <Image
                                    resizeMode={'contain'}
                                    source={require('../../Images/settings.png')}
                                    style={{
                                        width: 25,
                                        height: 25, tintColor: '#000'
                                    }} />
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity
                                // onPress={() => this.props.navigation.navigate("userProfile")}
                                style={{
                                    marginRight: 0
                                }}>
                                <Image
                                    source={require('../../Images/treadmill.png')}
                                    style={{
                                        width: 25,
                                        height: 25, tintColor: '#000'
                                    }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Footer>

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
        ExcerciseListApi: (token) => dispatch(ListActions.ExcerciseListApi(token)),
        diffcultiListApi: () => dispatch(DifficultListActions.diffcultiListApi())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)