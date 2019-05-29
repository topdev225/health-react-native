import * as React from 'react'
import {
    StyleSheet,
    Text,
    Dimensions,
    View,
    Image,
    AsyncStorage, ImageBackground, TextInput, TouchableOpacity
} from 'react-native';
import { Footer } from 'native-base';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'

import * as shape from 'd3-shape'
var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height; //full height
// import styles, { COLOR } from './styles';

class Month extends React.Component {

    constructor(props) {
        super(props);
        this.state = {


        };
    };




    render() {
        const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 30
        return (
            <View style={{ flex: 1, backgroundColor: 'black' }} >
            <Text>Month</Text>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    footer: {
        position: 'absolute',

        bottom: 1
    },

});

export default Month

