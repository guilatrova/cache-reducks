import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

import WeatherSearch from '../components/WeatherSearch';
import WeatherTable from '../components/WeatherTable';
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

    render() {
        const { classes, history, onSearch } = this.props;

        return (
            <div>
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
        onSearch: (location) => dispatch(operations.fetchWeatherWithCache(location))
    };
};

export default withStyles(styles)(
    connect(mapStateToProps, mapDispatchToProps)(WeatherPage)
);