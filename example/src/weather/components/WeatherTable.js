import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

const WeatherTable = ({ classes, data }) => {
    const rows = data.map(entry => {
        return (
            <TableRow key={entry.time}>
                <TableCell>{entry.location}</TableCell>
                <TableCell numeric>{entry.temp}</TableCell>
                <TableCell numeric>{entry.time}</TableCell>
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
    data: PropTypes.array.isRequired
};

export default withStyles()(WeatherTable);