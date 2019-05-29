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
    footer: {
        position: 'absolute',

        bottom: 1
    },
    View1: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b71221',
        height: 40, marginTop: 1
    },
    HeaderText: {
        color: '#fff', fontSize: 18, justifyContent: 'center', alignItems: 'center'
    },
    View2: {
        flex: 1,
        backgroundColor: 'white', justifyContent: 'center',
        alignItems: 'center'
    },
    View3: {
        flexDirection: 'row', justifyContent: 'center',
        alignItems: 'center',
    },

    bigner: {
        borderColor: 'black', borderWidth: 1, width: 95, height: 40,
        justifyContent: 'center', alignItems: 'center', marginLeft: 8
    },
    intermidate: {
        borderColor: 'black', borderWidth: 1, width: 95, height: 40,
        justifyContent: 'center', alignItems: 'center', marginLeft: 10,
    },
    advance: {
        borderColor: 'black', borderWidth: 1, marginLeft: 10, height: 40,
        width: 95, justifyContent: 'center', alignItems: 'center', marginRight: 5
    },
    Done:{backgroundColor: '#b71221', justifyContent: 'center',
    alignItems: 'center', marginTop: 40, height: 40, borderRadius: 10,
    width: 200

    },


    View4: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    View5: {
        height: 1, backgroundColor: '#000', width: 90
    },
    View6: {
        flexDirection: 'row', justifyContent: 'space-between', marginTop: 25
    },
    google: {
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#ff0000',
        width: 150, height: 40, borderRadius: 5, marginLeft: 12, flexDirection: 'row'
    },
    SignText: {
        fontSize: 20, color: '#fff',
        textAlign: 'center',
        backgroundColor: 'transparent'
    },
    googleImg: {
        height: 25, width: 25, tintColor: '#fff', marginRight: 10
    },
    leftLogoiPhone: {
        height: 50,
        width: 50,
        marginTop: 25,
        marginLeft: 10,
    },
    leftLogoiPad: {
        height: 100,
        width: 100,
        marginTop: 30,
        marginLeft: 10,
    },
    logoutiPhone: {
        height: 40,
        width: 80,        
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#145F82'
    },
    logoutiPad: {
        height: 60,
        width: 100,
        marginRight: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#145F82'
    },
    logoutViewiPhone: {
        height: 40,
        width: 90,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoutViewiPad: {
        height: 60,
        width: 120,
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
    }



});
