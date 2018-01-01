import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import PersonPinIcon from 'material-ui-icons/PersonPin';

import { drawerWidth, anchor, title } from '../contants';
import GithubIcon from '../../icons/Github';

const styles = theme => ({
    appBar: {
        position: 'absolute',
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
    'appBarShift-left': {
		marginLeft: drawerWidth,
	},
	'appBarShift-right': {
		marginRight: drawerWidth,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 20,
    },
    hide: {
      display: 'none',
    },
});

const openLink = (link) => () => window.open(link, "_blank");

const AppToolbar = ({ classes, open, handleDrawerOpen }) => {
    return (
    <AppBar 
        className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
            [classes[`appBarShift-${anchor}`]]: open,
        })}
    >
        <Toolbar disableGutters={!open}>
            <IconButton
                color="contrast"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon />
            </IconButton>

            <Typography type="title" color="inherit" noWrap className={classes.flex}>
                {title}
            </Typography>

            <IconButton color="contrast" onClick={openLink("https://github.com/guilatrova/cache-reducks")}>
                <GithubIcon />
            </IconButton>

            <IconButton color="contrast" onClick={openLink("https://www.linkedin.com/in/guilhermelatrova")}>
                <PersonPinIcon />
            </IconButton>
        </Toolbar>
    </AppBar>);
};

AppToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    handleDrawerOpen: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(AppToolbar);