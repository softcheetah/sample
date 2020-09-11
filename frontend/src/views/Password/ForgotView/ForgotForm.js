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

const ForgotForm = ({ className, requestResetPassword, ...rest }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      })}
      onSubmit={values => requestResetPassword(values.email)}
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
              Send
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

ForgotForm.propTypes = {
  className            : PropTypes.string,
  requestResetPassword : PropTypes.func.isRequired,
};

export default ForgotForm;
