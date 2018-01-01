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
        const { classes, history, onSearch } = this.props;

        return (
            <div>
                <CacheConfig 
                    enableCache={this.state.enableCache}
                    onEnableCacheChange={enableCache => this.setState({ enableCache })}
                    timeout={this.state.timeout}
                    onTimeoutChange={this.handleTimeoutChange}
                />

                <WeatherSearch onSubmit={onSearch} />

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
        onSearchCache: (location) => dispatch(operations.fetchWeatherWithCache(location, 2)),
        onSearch: (location) => dispatch(operations.fetchWeatherWithoutCache(location))
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(WeatherPage)
);