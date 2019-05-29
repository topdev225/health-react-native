import * as ActionTypes from '../constants/ActionTypes'

const initialState = {
    isSignuped: false,
    hasError : false,
    isLoading: false,
    name:'',
    email: '',
  password: ''
};

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type){
        case ActionTypes.IS_SIGNUPED:
            // return action.isLogged;
            // console.log('islogged', action);

            return Object.assign({}, state, {
                isSignuped: action.isSignuped,
            });
        case ActionTypes.SIGNUP_HAS_ERROR:
            // return action.loginHasError;
            // console.log('haserror', action);

            return Object.assign({}, state, {
                hasError: action.hasError,
            });
        case ActionTypes.SIGNUP_IS_LOADING:
            return Object.assign({}, state, {
                isLoading: action.isLoading,
            });
        case ActionTypes.SIGNUP:
            return Object.assign({}, state, {
                isSignuped: false,
                 name: payload.name,
                email: payload.username,
                password: payload.password
            });
        case ActionTypes.LOGOUT:
            return Object.assign({}, state, {
                isSignuped: false,
               name :'',
                email: '',
                password: ''
            });
        default:
            return state
    }
}
