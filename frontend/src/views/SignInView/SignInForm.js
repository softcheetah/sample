import React from "react";
import clsx from "clsx";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Formik } from "formik";
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {}
}));

const SignInForm = ({ className, signIn, ...rest }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email    : "",
        password : "",
        submit   : null
      }}
      validationSchema={Yup.object().shape({
        email    : Yup.string().email("Must be a valid email").max(255).required("Email is required"),
        password : Yup.string().max(255).required("Password is required")
      })}
      onSubmit={values => signIn(values.email, values.password)}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form
          noValidate
          onSubmit={handleSubmit}
          className={clsx(classes.root, className)}
          {...rest}
        >
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            autoFocus
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          {errors.submit && (
            <Box mt={3}>
              <FormHelperText error>
                {errors.submit}
              </FormHelperText>
            </Box>
          )}
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Sign In
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

SignInForm.propTypes = {
  className : PropTypes.string,
  signIn    : PropTypes.func.isRequired,
};

export default SignInForm;
