import React from 'react';
import PropTypes from 'prop-types';

import { FormControlLabel } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';
import Typography from 'material-ui/Typography';

const CacheConfig = ({ enableCache, onEnableCacheChange, timeout, onTimeoutChange }) => {
    return (
        <div>
            <FormControlLabel
                control={
                    <Switch
                        checked={enableCache}
                    />                            
                }
                label="Enable cache?"
                onClick={() => onEnableCacheChange(!enableCache)}
            />

            {enableCache && <TextField 
                id="timeout"
                name="timeout"
                label="Timeout (in minutes)"
                value={timeout}
                onChange={e => onTimeoutChange(e.target.value)}
            />}

            <br />

            <Typography type="body1">
                You can disable cache by unchecking switch or even passing 0 as timeout.
            </Typography>
        </div>
    );
};

CacheConfig.propTypes = {
    enableCache: PropTypes.bool.isRequired,
    onEnableCacheChange: PropTypes.func.isRequired,
    timeout: PropTypes.number.isRequired,
    onTimeoutChange: PropTypes.func.isRequired
};

export default CacheConfig;