import React from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import RefreshIcon from 'material-ui-icons/Refresh';

const styles = ({
    green: {
        color: '#2ECC40'
    },
    red: {
        color: '#FF4136'
    }
});

const WeatherTable = ({ classes, data, onRetry }) => {
    const rows = data.map(entry => {
        return (
            <TableRow key={entry.time}>
                <TableCell>
                    <IconButton aria-label="Refresh" onClick={() => onRetry(entry.location)}>
                        <RefreshIcon />
                    </IconButton>
                    {entry.location}
                </TableCell>
                <TableCell numeric>{entry.temp}</TableCell>
                <TableCell numeric>{moment(entry.time).format('HH:mm:ss')}</TableCell>
                <TableCell>
                    <span className={entry.cached ? classes.green : classes.red}>
                        {entry.cached ? 'Yes' : 'No'}
                    </span>
                </TableCell>
            </TableRow>
        );
    });

    return (
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell numeric>Temp</TableCell>
                    <TableCell numeric>Time</TableCell>
                    <TableCell>Cached result?</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows}
            </TableBody>
        </Table>
    );    
};

WeatherTable.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
    onRetry: PropTypes.func.isRequired
};

export default withStyles(styles)(WeatherTable);