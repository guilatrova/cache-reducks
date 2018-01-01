const getHistory = (state) => state.weather.history.slice().reverse();

export default {
    getHistory
};