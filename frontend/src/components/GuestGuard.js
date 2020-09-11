import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { ROUTE_PATH } from "src/constants";

const GuestGuard = ({ auth, children }) => {
  if (auth.user) {
    return <Redirect to={ROUTE_PATH.PROFILE} />;
  }

  return (
    <>
      {children}
    </>
  );
};
GuestGuard.propTypes = {
  auth     : PropTypes.object.isRequired,
  children : PropTypes.node.isRequired
};

const mapStateToProps = store => ({
  auth: store.auth
});
const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(GuestGuard);
