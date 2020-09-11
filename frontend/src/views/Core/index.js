import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createStyles,
  jssPreset, makeStyles,
  StylesProvider,
  ThemeProvider
} from "@material-ui/core";
import { NotificationContainer } from "react-notifications";
import rtl from "jss-rtl";
import { create } from "jss";

import { ACTION_STATUS, THEMES } from "src/constants";
import { createTheme } from "src/theme";
import LoadingScreen from "src/components/LoadingScreen";
import { Creators, Types as authTypes } from "src/redux/actions/auth";
import { Types as userTypes } from "src/redux/actions/user";
import routes from "./routes";
import "react-notifications/lib/notifications.css";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const useStyles = makeStyles(() => createStyles({
  "@global": {
    "*": {
      boxSizing : "border-box",
      margin    : 0,
      padding   : 0
    },
    html: {
      "-webkit-font-smoothing"  : "antialiased",
      "-moz-osx-font-smoothing" : "grayscale",
      height                    : "100%",
      width                     : "100%",
      fontFamily                : "Arial, Helvetica, sans-serif"
    },
    body: {
      height : "100%",
      width  : "100%"
    },
    "#root": {
      height : "100%",
      width  : "100%"
    }
  },
}));

const View = ({ checkToken, global: { status } }) => {
  useStyles();

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  const loadingTypes = [
    authTypes.CHECK_TOKEN,
    authTypes.SIGN_IN,
    authTypes.REQUEST_RESET_PASSWORD,
    authTypes.RESET_PASSWORD,
    userTypes.GET_SELF,
    userTypes.SEARCH_USER,
    userTypes.GET_USER,
    userTypes.UPDATE_USER,
    userTypes.CREATE_USER,
  ];
  const theme = createTheme({
    direction           : "ltr",
    responsiveFontSizes : true,
    theme               : THEMES.LIGHT
  });
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>
        { [ACTION_STATUS.SUCCESS, ACTION_STATUS.FAILURE].includes(status[authTypes.CHECK_TOKEN])
        && routes }
        { loadingTypes.map(t => status[t]).includes(ACTION_STATUS.REQUEST)
        && <LoadingScreen /> }
        <NotificationContainer />
      </StylesProvider>
    </ThemeProvider>
  );
};

View.propTypes = {
  global     : PropTypes.object.isRequired,
  checkToken : PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  global: store.global
});
const mapDispatchToProps = {
  ...Creators
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
