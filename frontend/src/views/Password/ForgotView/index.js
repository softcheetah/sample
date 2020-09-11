import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  makeStyles
} from "@material-ui/core";
import Page from "src/components/Page";
import { ROUTE_PATH } from "src/constants";
import { Creators } from "../../../redux/actions/auth";
import ForgotForm from "./ForgotForm";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor : theme.palette.background.dark,
    display         : "flex",
    flexDirection   : "column",
    minHeight       : "100vh"
  },
  banner: {
    backgroundColor : theme.palette.background.paper,
    paddingBottom   : theme.spacing(2),
    paddingTop      : theme.spacing(2),
    borderBottom    : `1px solid ${theme.palette.divider}`
  },
  bannerChip: {
    marginRight: theme.spacing(2)
  },
  methodIcon: {
    height      : 30,
    marginLeft  : theme.spacing(2),
    marginRight : theme.spacing(2)
  },
  cardContainer: {
    paddingBottom : 80,
    paddingTop    : 80,
  },
  cardContent: {
    padding       : theme.spacing(4),
    display       : "flex",
    flexDirection : "column",
    minHeight     : 400
  },
  currentMethodIcon: {
    height    : 40,
    "& > img" : {
      width     : "auto",
      maxHeight : "100%"
    }
  }
}));

const ForgotView = ({ requestResetPassword }) => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Forgot password"
    >
      <Container
        className={classes.cardContainer}
        maxWidth="sm"
      >
        <Box
          mb={8}
          display="flex"
          justifyContent="center"
        >
          <img
            alt="Logo"
            src="/static/logo192.png"
          />
        </Box>
        <Card>
          <CardContent className={classes.cardContent}>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mb={3}
            >
              <div>
                <Typography
                  color="textPrimary"
                  gutterBottom
                  variant="h2"
                >
                  Send password reset email
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                >
                  Input your email address
                </Typography>
              </div>
              <div className={classes.currentMethodIcon}>
                <img
                  alt="Auth method"
                  src="/static/images/jwt.svg"
                />
              </div>
            </Box>
            <Box
              flexGrow={1}
              mt={3}
            >
              <ForgotForm
                requestResetPassword={requestResetPassword}
              />
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
            <Box>
              <Link to={ROUTE_PATH.SIGN_IN}> Back to SignIn </Link>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};
ForgotView.propTypes = {
  requestResetPassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  ...Creators
};

export default connect(null, mapDispatchToProps)(ForgotView);
