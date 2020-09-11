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

const ResetForm = ({ token, className, resetPassword, ...rest }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        password: "",
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string().max(255).required("Password is required")
      })}
      onSubmit={values => resetPassword(token, values.password)}
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
              Reset
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

ResetForm.propTypes = {
  token         : PropTypes.string,
  className     : PropTypes.string,
  resetPassword : PropTypes.func.isRequired,
};

export default ResetForm;
