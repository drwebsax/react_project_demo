import { combineReducers } from 'redux';
import userInfo from './userInfo';
import {userData} from './userInfo';


import commonUtils from './commonUtils';

const rootReducer = combineReducers({
    userInfo,
    commonUtils,
    userData,
});

export default rootReducer;