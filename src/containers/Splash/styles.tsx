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
                justifyContent: 'center', alignItems: 'center'
                , backgroundColor: '#b71221'
    },
    Images:{
        height: 100, width: 100, justifyContent: 'center',
        alignItems: 'center',
    },
    Text:{fontSize: 20, color: '#fff', fontWeight: 'bold'

    }
   



});
