import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { ROUTE_PATH } from "src/constants";

const AuthGuard = ({ auth, children }) => {
  if (!auth.user) {
    return <Redirect to={ROUTE_PATH.SIGN_IN} />;
  }

  return (
    <>
      {children}
    </>
  );
};
AuthGuard.propTypes = {
  auth     : PropTypes.object.isRequired,
  children : PropTypes.node.isRequired
};

const mapStateToProps = store => ({
  auth: store.auth
});
const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(AuthGuard);
