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
import UserEditForm from "./UserEditForm";

const styles = theme => ({
  root: {
    backgroundColor : theme.palette.background.dark,
    minHeight       : "100%",
    paddingTop      : theme.spacing(3),
    paddingBottom   : theme.spacing(3)
  }
});

class UserEditView extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount = () => {
    const {
      match,
      getUser,
    } = this.props;
    getUser(match.params.userId);
  }

  render() {
    const {
      user: { editingUser },
      classes,
      updateUser
    } = this.props;

    return (
      <Page
        className={classes.root}
        title="User Edit"
      >
        <Container maxWidth="lg">
          <Header />
          <Box mt={3}>
            { editingUser && (
              <UserEditForm
                user={editingUser}
                updateUser={updateUser}
              />
            )}
          </Box>
        </Container>
      </Page>
    );
  }
}

UserEditView.propTypes = {
  user       : PropTypes.object.isRequired,
  match      : PropTypes.object.isRequired,
  classes    : PropTypes.object.isRequired,
  getUser    : PropTypes.func.isRequired,
  updateUser : PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  user: store.user,
});
const mapDispatchToProps = {
  ...Creators
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(UserEditView)
);
