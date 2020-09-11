import React from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  Breadcrumbs,
  Link,
  Typography,
  makeStyles
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { ROUTE_PATH } from "src/constants";

const useStyles = makeStyles(() => ({
  root: {}
}));

const Header = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link
          variant="body1"
          color="inherit"
          to={ROUTE_PATH.USERS_LIST}
          component={RouterLink}
        >
          Users
        </Link>
        <Typography
          variant="body1"
          color="textPrimary"
        >
          Edit User
        </Typography>
      </Breadcrumbs>
      <Typography
        variant="h3"
        color="textPrimary"
      >
        Edit User
      </Typography>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
