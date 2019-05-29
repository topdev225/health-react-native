import * as ActionTypes from '../constants/ActionTypes';
import { AsyncStorage } from 'react-native';
import * as React from 'react'
import { Actions } from 'react-native-router-flux';





const ExcersiceDifficultListHasError = (message) => {
    return {
        type: ActionTypes.ExcersiceDifficultList_HAS_ERROR,
        hasError: message
    }
};

const ExcersiceDifficultListIsLoading = (bool) => {
    return {
        type: ActionTypes.ExcersiceDifficultList_IS_LOADING,
        isLoading: bool
    }
};

const diffcultiListApi = (token) => {
   console.log(
    token)
    return (dispatch) => {
        fetch('https://health-mvp-api.herokuapp.com/api/v1.0/core/ExcersiceDifficultList/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
               
            },
           
        }).then((res) => res.json())
        .then(res => {
            console.log('ExcersiceDifficultList',res)
            if(res.status === true){
                dispatch(ExcersiceDifficultListHasError(false));
                AsyncStorage.setItem('ExerciseDificultyList', JSON.stringify(res.data));
            }else{
                dispatch(ExcersiceDifficultListHasError(res.msg));
            }
        })
        .catch((e) => {
            console.log(e)
            dispatch(ExcersiceDifficultListHasError("Oops, something went wrong, server error!"));
        });
    }
};



export default {
    ExcersiceDifficultListHasError,
    ExcersiceDifficultListIsLoading,
     diffcultiListApi,
}
