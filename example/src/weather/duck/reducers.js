import types from './types';

const initialState = {
    history: [],
    isFetching: false
};

const fetchWeatherReducer = (state, action) => {
    switch (action.result) {
        case 'success':
        case 'fail':
            return {
                ...state,
                isFetching: false,
                history: [
                    ...state.history,
                    action.entry
                ]
            };

        default:
            return {
                ...state,
                isFetching: true
            };
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_WEATHER:
            return fetchWeatherReducer(state, action);

        default:
            return state;
    }
};

export default reducer;