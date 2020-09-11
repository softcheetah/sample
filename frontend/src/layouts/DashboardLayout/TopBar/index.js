import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
  makeStyles,
  SvgIcon
} from "@material-ui/core";
import { Menu as MenuIcon } from "react-feather";
import Account from "./Account";

const useStyles = makeStyles(theme => ({
  root: {
    zIndex          : theme.zIndex.drawer + 100,
    backgroundColor : theme.palette.background.default
  },
  toolbar: {
    minHeight: 64
  },
  logo: {
    maxHeight: 33
  },
  logoText: {
    color: theme.palette.text.primary
  }
}));

const TopBar = ({
  className,
  auth,
  signOut,
  onMobileNavOpen,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <AppBar
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <img
            className={classes.logo}
            alt="Logo"
            src="/static/logo192.png"
          />
          <Typography
            variant="h4"
            className={classes.logoText}
          >
            &nbsp;people&apos;s <b>fibre</b>
          </Typography>
        </Hidden>
        <Box
          ml={2}
          flexGrow={1}
        />
        <Box ml={2}>
          <Account auth={auth} signOut={signOut} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className       : PropTypes.string,
  auth            : PropTypes.object.isRequired,
  signOut         : PropTypes.func.isRequired,
  onMobileNavOpen : PropTypes.func.isRequired
};

export default TopBar;
