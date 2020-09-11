import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core";
import NavBar from "./NavBar";
import TopBar from "./TopBar";
import { Creators as authCreators } from "../../redux/actions/auth";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor : theme.palette.background.dark,
    display         : "flex",
    height          : "100%",
    overflow        : "hidden",
    width           : "100%"
  },
  wrapper: {
    display                      : "flex",
    flex                         : "1 1 auto",
    overflow                     : "hidden",
    paddingTop                   : 64,
    [theme.breakpoints.up("lg")] : {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display  : "flex",
    flex     : "1 1 auto",
    overflow : "hidden"
  },
  content: {
    flex     : "1 1 auto",
    height   : "100%",
    overflow : "auto"
  }
}));

const DashboardLayout = ({ children, auth, signOut }) => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>
      <TopBar
        auth={auth}
        signOut={signOut}
        onMobileNavOpen={() => setMobileNavOpen(true)}
      />
      <NavBar
        auth={auth}
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
DashboardLayout.propTypes = {
  auth     : PropTypes.object.isRequired,
  children : PropTypes.node.isRequired,
  signOut  : PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  auth: store.auth
});
const mapDispatchToProps = {
  ...authCreators
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);
