import types from './types';

const fetchWeather = (location) => {
    return {
        type: types.FETCH_WEATHER,
        location
    };
};

const receiveFetchWeather = (result, location, data) => {
    const time = Date.now();
    if (result === 'success') {
        return {
            type: types.FETCH_WEATHER,
            result,
            entry: {
                location,
                temp: data.temp,
                cached: data.cached || false,
                time
            }
        };
    }

    return {
        type: types.FETCH_WEATHER,
        result,
        errors: data,
        entry: {
            location,
            temp: null,
            cached: false,
            time
        }
    };
};

export default {
    fetchWeather,
    receiveFetchWeather
};