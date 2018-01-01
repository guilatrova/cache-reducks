import { combineReducers } from 'redux';
import weather from '../weather/duck';
import app from '../app/duck';

const rootReducer = combineReducers({
    app,
    weather
});

export default rootReducer;