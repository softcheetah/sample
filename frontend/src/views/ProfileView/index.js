import React from "react";
import {
  Container,
  makeStyles
} from "@material-ui/core";
import Page from "src/components/Page";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor : theme.palette.background.dark,
    minHeight       : "100%",
    paddingTop      : theme.spacing(3),
    paddingBottom   : theme.spacing(3)
  }
}));

const AccountView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Profile"
    >
      <Container maxWidth="lg">
        Profile page
      </Container>
    </Page>
  );
};

export default AccountView;
