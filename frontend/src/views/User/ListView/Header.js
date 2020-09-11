import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Button,
  Grid,
  SvgIcon,
  Typography,
  makeStyles
} from "@material-ui/core";
import {
  PlusCircle as PlusCircleIcon
} from "react-feather";
import { ROUTE_PATH } from "src/constants";

const useStyles = makeStyles(theme => ({
  root   : {},
  action : {
    marginBottom : theme.spacing(1),
    "& + &"      : {
      marginLeft: theme.spacing(1)
    }
  }
}));

const Header = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Grid
      className={clsx(classes.root, className)}
      container
      justify="space-between"
      spacing={3}
      {...rest}
    >
      <Grid item>
        <Typography
          variant="body1"
          color="textPrimary"
        >
          Users
        </Typography>
        <Typography
          variant="h3"
          color="textPrimary"
        >
          All Users
        </Typography>
      </Grid>
      <Grid item>
        <Button
          component={RouterLink}
          to={ROUTE_PATH.USERS_CREATE}
          color="secondary"
          variant="contained"
          startIcon={(
            <SvgIcon fontSize="small">
              <PlusCircleIcon />
            </SvgIcon>
          )}
        >
          New User
        </Button>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
