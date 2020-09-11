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
import Results from "./Results";

const styles = theme => ({
  root: {
    backgroundColor : theme.palette.background.dark,
    minHeight       : "100%",
    paddingTop      : theme.spacing(3),
    paddingBottom   : theme.spacing(3)
  }
});

class UserListView extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  componentDidMount = () => {
    const { searchUser } = this.props;
    searchUser();
  }

  render() {
    const {
      classes,
      user: { users }
    } = this.props;

    return (
      <Page
        className={classes.root}
        title="User List"
      >
        <Container maxWidth="lg">
          <Header />
          <Box mt={3}>
            <Results customers={users} />
          </Box>
        </Container>
      </Page>
    );
  }
}

UserListView.propTypes = {
  user       : PropTypes.object.isRequired,
  classes    : PropTypes.object.isRequired,
  searchUser : PropTypes.func.isRequired,
};

const mapStateToProps = store => ({
  user: store.user,
});
const mapDispatchToProps = {
  ...Creators
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(UserListView)
);
