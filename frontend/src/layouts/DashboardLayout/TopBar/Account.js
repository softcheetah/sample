import React, {
  useRef,
  useState
} from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Box,
  ButtonBase,
  Hidden,
  Menu,
  MenuItem,
  Typography,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  avatar: {
    height      : 32,
    width       : 32,
    marginRight : theme.spacing(1)
  },
  name: {
    color: theme.palette.text.primary
  },
  popover: {
    width: 200
  }
}));

const Account = ({ auth, signOut }) => {
  const classes = useStyles();
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (!auth.user) return null;

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
        ref={ref}
      >
        <Avatar
          alt="User"
          className={classes.avatar}
          src={auth.user.avatar}
        />
        <Hidden smDown>
          <Typography
            variant="h6"
            className={classes.name}
          >
            {auth.user.email}
          </Typography>
        </Hidden>
      </Box>
      <Menu
        onClose={handleClose}
        anchorOrigin={{
          vertical   : "bottom",
          horizontal : "center"
        }}
        keepMounted
        PaperProps={{ className: classes.popover }}
        getContentAnchorEl={null}
        anchorEl={ref.current}
        open={isOpen}
      >
        <MenuItem
          component={RouterLink}
          to="/app/social/profile"
        >
          Profile
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to="/app/account"
        >
          Account
        </MenuItem>
        <MenuItem onClick={() => signOut()}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};
Account.propTypes = {
  auth    : PropTypes.object.isRequired,
  signOut : PropTypes.func.isRequired,
};

export default Account;
