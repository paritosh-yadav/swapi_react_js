/**
 * Root Reducer
 */
import { combineReducers } from 'redux';
import landingPage from './landing-page/reducer';
import login from './login/reducer';

const rootReducer = combineReducers({
    landingPage,
    login
})

export default rootReducer