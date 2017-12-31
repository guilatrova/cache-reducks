import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import WeatherSearch from '../components/WeatherSearch';
import { operations } from '../duck';

class WeatherPage extends React.Component {
    static propTypes = {
        onSearch: PropTypes.func.isRequired
    }

    render() {
        return <WeatherSearch onSubmit={this.props.onSearch} />;
    }
}

const mapStateToProps = (state) => {};
const mapDispatchToProps = (dispatch) => {
    return {
        onSearch: (location) => dispatch(operations.fetchWeatherWithCache(location))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherPage);