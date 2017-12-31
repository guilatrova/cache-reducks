import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

import { operations } from '../duck';

export default class WeatherSearch extends React.Component {
    state = {
        value: ""
    }

    static propTypes = {
        onSubmit: PropTypes.func.isRequired
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