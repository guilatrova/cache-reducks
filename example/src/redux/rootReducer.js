import { combineReducers } from 'redux';
import weather from '../weather/duck';

const rootReducer = combineReducers({
    weather
});

export default rootReducer;