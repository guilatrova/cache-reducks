import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import WeatherSearch from '../components/WeatherSearch';
import WeatherTable from '../components/WeatherTable';
import CacheConfig from '../components/CacheConfig';
import { operations, selectors } from '../duck';

const styles = theme => ({
    paper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    }
});

class WeatherPage extends React.Component {
    static propTypes = {
        onSearch: PropTypes.func.isRequired,
        onSearchWithCache: PropTypes.func.isRequired,
        history: PropTypes.array.isRequired,
        classes: PropTypes.object.isRequired
    }

    state = {
        enableCache: true,
        timeout: 2        
    }

    handleTimeoutChange = (timeout) => {
        if (isNaN(timeout)) {
            this.setState({ timeout: 2 });
        }
        else {
            this.setState({ timeout: Number(timeout) });
        }
    }

    render() {
        const { classes, history, onSearch, onSearchWithCache } = this.props;
        const { enableCache, timeout } = this.state;
        const searchFunc = enableCache ? onSearchWithCache : onSearch;

        return (
            <div>
                <CacheConfig 
                    enableCache={enableCache}
                    onEnableCacheChange={enableCache => this.setState({ enableCache })}
                    timeout={timeout}
                    onTimeoutChange={this.handleTimeoutChange}
                />

                <WeatherSearch onSubmit={searchFunc} />

                <Paper className={classes.paper}>
                    <WeatherTable data={history} />
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        history: selectors.getHistory(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchWithCache: (location, timeout) => dispatch(operations.fetchWeatherWithCache(location, timeout)),
        onSearch: (location) => dispatch(operations.fetchWeatherWithoutCache(location))
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(WeatherPage)
);