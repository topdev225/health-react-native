import { StyleSheet } from 'react-native';
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
    indicatorContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0,0.5)",
        alignItems: "center",
        justifyContent: "center"
        },
        indicator: {
        width: 80,
        height: 80,
        borderRadius: 5,
        shadowColor: "black",
        alignItems: "center",
        justifyContent: "center",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        backgroundColor: "white"
        },
    ViewImage: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    Text: {
        fontSize: 20, color: '#000',
        fontWeight: 'bold'
    },
    View1: {
        marginTop: 40,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'center'

    },
    EmailText: {
        fontSize: 15,
        color: '#000',
        marginBottom: 10,
        marginLeft: 1
    },
    View2: {

        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        justifyContent: 'center'

    },
    View3: {
        borderRadius: 10,
        height: 40, alignItems: 'center',
        marginLeft: 30, marginRight: 30, marginTop: 30,
        justifyContent: 'center', backgroundColor: '#145F82'
    },
    View4: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    View5:{
         height: 1, backgroundColor: '#000', width: 90 
    },
    View6:{
        flexDirection: 'row', justifyContent: 'space-between', marginTop: 25
    },
    google:{
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#ff0000',
        width: 150, height: 40, borderRadius: 5, marginLeft: 12, flexDirection: 'row'
    },
    SignText: {
        fontSize: 20, color: '#fff',
        textAlign: 'center', 
        backgroundColor: 'transparent'
    },
    googleImg:{
        height: 25, width: 25, tintColor: '#fff', marginRight: 10
    },
    logoiPad: {
        height: 300,
        width: 300,        
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoiPhone: {
        height: 150,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },



});
