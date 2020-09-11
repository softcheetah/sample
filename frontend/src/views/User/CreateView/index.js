import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Box,
  Container
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Creators } from "src/redux/actions/user";
import Page from "src/components/Page";
import Header from "./Header";
import UserCreateForm from "./UserCreateForm";

const styles = theme => ({
  root: {
    backgroundColor : theme.palette.background.dark,
    minHeight       : "100%",
    paddingTop      : theme.spacing(3),
    paddingBottom   : theme.spacing(3)
  }
});

class UserCreateView extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  render() {
    const {
      classes,
      createUser
    } = this.props;

    console.log(this.props);

    return (
      <Page
        className={classes.root}
        title="User Create"
      >
        <Container maxWidth="lg">
          <Header />
          <Box mt={3}>
            <UserCreateForm
              createUser={createUser}
            />
          </Box>
        </Container>
      </Page>
    );
  }
}

UserCreateView.propTypes = {
  classes    : PropTypes.object.isRequired,
  createUser : PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  ...Creators
};

export default connect(null, mapDispatchToProps)(
  withStyles(styles)(UserCreateView)
);
