import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Card,
  Checkbox,
  CardContent,
  Grid,
  TextField,
  FormControlLabel,
  Typography,
  makeStyles
} from "@material-ui/core";
import { USER_STATUS, USER_PERMISSION } from "src/constants";

const useStyles = makeStyles(() => ({
  root: {}
}));

const UserEditForm = ({
  className,
  user,
  updateUser,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        firstName : user.firstName || "",
        lastName  : user.lastName || "",
        email     : user.email || "",
        status    : user.status || USER_STATUS.ACTIVE,
        ...Object.keys(USER_PERMISSION).reduce((obj, key) => ({
          ...obj,
          [key]: user.permissions.includes(USER_PERMISSION[key])
        }), {})
      }}
      validationSchema={Yup.object().shape({
        firstName : Yup.string().max(255).required("First name is required"),
        lastName  : Yup.string().max(255).required("Last name is required"),
        email     : Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      })}
      onSubmit={values => updateUser(
        user._id,
        {
          firstName   : values.firstName,
          lastName    : values.lastName,
          email       : values.email,
          status      : values.status,
          permissions : Object.keys(USER_PERMISSION).filter(
            key => values[key]
          ).map(
            key => USER_PERMISSION[key]
          ),
        }
      )}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values
      }) => (
        <form
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <Card>
            <CardContent>
              <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    fullWidth
                    helperText={touched.firstName && errors.firstName}
                    label="First name"
                    name="firstName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.firstName}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.lastName && errors.lastName)}
                    fullWidth
                    helperText={touched.lastName && errors.lastName}
                    label="Last name"
                    name="lastName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.lastName}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={12}
                  xs={12}
                >
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email address"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    required
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Typography
                    variant="h5"
                    color="textPrimary"
                  >
                    Permissions
                  </Typography>
                  <Grid
                    container
                    spacing={0}
                  >
                    { Object.keys(USER_PERMISSION).map(key => (
                      <Grid
                        item
                        md={6}
                        key={key}
                      >
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={values[key]}
                              name={key}
                              onChange={handleChange}
                            />
                          )}
                          label={key}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Typography
                    variant="h5"
                    color="textPrimary"
                  >
                    User status
                  </Typography>
                  <br />
                  <TextField
                    fullWidth
                    name="status"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.status}
                    variant="outlined"
                  >
                    {Object.keys(USER_STATUS).map(key => (
                      <option
                        key={key}
                        value={USER_STATUS[key]}
                      >
                        {key}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                >
                  Update
                </Button>
              </Box>
            </CardContent>
          </Card>
        </form>
      )}
    </Formik>
  );
};

UserEditForm.propTypes = {
  className  : PropTypes.string,
  user       : PropTypes.object.isRequired,
  updateUser : PropTypes.func.isRequired,
};

export default UserEditForm;
