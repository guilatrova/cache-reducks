import React from 'react';
import Typography from 'material-ui/Typography';

const AuthorPage = () => {
    return (
        <div>
            <Typography type="subheading">
                Example project created by Guilherme Magalhães Latrova to show how to
                combine Re-ducks proposal with cache operations.
            </Typography>

            <Typography>
                To know more see <a href="https://github.com/guilatrova/cache-reducks">repository</a> and take 
                a look into <a href="http://www.latrovacommits.com">my blog</a> :)
            </Typography>
        </div>
    );
};

export default AuthorPage;