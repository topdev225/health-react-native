import { combineReducers } from 'redux';
import Login from "./../reducers/Login";

export default combineReducers({
    loginApi: Login,
})