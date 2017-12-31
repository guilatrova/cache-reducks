import React from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

export default class WeatherSearch extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
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
            <form>
                <TextField 
                    id="search-field"
                    name="search-field"
                    value={this.state.value}
                    onChange={e => this.setState({ value: e.target.value })}
                />

                <Button raised color="primary" onClick={this.handleSubmit}>
                    Search
                </Button>
            </form>
        );
    }
}