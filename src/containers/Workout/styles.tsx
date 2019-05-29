import { StyleSheet, Platform } from 'react-native';
// import { Colors } from '../../Theme';

export const COLOR = {
    RED: "#b71221",
    BLUE: '#ff6f61',
    BLACK: "#ffffff",
    WHITE: "#fff",

};

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
    },
    logoiPad: {
        height: 80,
        width: 80,   
        marginLeft: 20,     
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoiPhone: {
        height: 40,
        width: 40,
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    MainContainer: {
        flex: 1,
        paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
        alignItems: 'center',
        justifyContent: 'center',
      }    
});