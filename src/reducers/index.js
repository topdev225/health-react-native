import { combineReducers } from 'redux';
import Login from "./Login";
import Signup from "./Signup"


export default combineReducers({
    login: Login,
    signup: Signup
})