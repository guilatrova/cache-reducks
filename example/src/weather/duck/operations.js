import actions from './actions';
import { Operation } from '../../services/operations';
import handleError from '../../services/genericErrorHandler';

class FetchWeatherOperation extends Operation {
    constructor(location) {
        super(actions.fetchWeather, actions.receiveFetchWeather);
        this.location = location;
    }

    onRequest(dispatch, requestAction) {
        dispatch(requestAction(this.location));
    }

    getSucceedData = (raw) => raw.main.temp;

    onSucceed(dispatch, receiveAction, data) {
        return dispatch(receiveAction('success', this.location, data));
    }

    onFailed(dispatch, receiveAction, errors) {        
        return dispatch(receiveAction('fail', this.location, handleError(errors)));
    }    

    getApiPromise(api) {
        const url = `?q=${this.location}&appid=${process.env.WEATHER_APP_ID}&units=imperial`;
        return api.get(url);
    }
}

const fetchWeatherWithCache = (location, timeout) => new FetchWeatherOperation(location).dispatch();
const fetchWeatherWithoutCache = (location) => new FetchWeatherOperation(location).dispatch();

export default {
    fetchWeatherWithCache,
    fetchWeatherWithoutCache
};