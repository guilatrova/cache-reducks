import React from 'react';
import PropTypes from 'prop-types';

import { FormControlLabel } from 'material-ui/Form';
import TextField from 'material-ui/TextField';
import Switch from 'material-ui/Switch';

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