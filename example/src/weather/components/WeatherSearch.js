import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import Grid from 'material-ui/Grid';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

class WeatherSearch extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
        classes: PropTypes.object.isRequired
    }

    state = {
        value: ""
    }

    handleSubmit = () => {
        this.props.onSubmit(this.state.value);
        this.setState({ value: "" });
    }

    render () {
        return (
            <Grid container>
                <Grid item xs={11}>
                    <TextField 
                        fullWidth 
                        id="search-field"
                        name="search-field"
                        label="Location"
                        value={this.state.value}
                        onChange={e => this.setState({ value: e.target.value })}
                    />
                </Grid>

                <Grid item xs={1}>
                    <Button raised color="primary" 
                        onClick={this.handleSubmit} 
                        className={this.props.classes.button}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(styles)(WeatherSearch);