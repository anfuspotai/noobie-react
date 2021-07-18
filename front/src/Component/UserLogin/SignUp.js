import React, {Fragment} from "react";
import { Link } from "react-router-dom";
import { API } from "../../config";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@material-ui/core";

import { useFormik } from "formik";
import * as yup from "yup";
import Header from "./Header";

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      userEmail: "",
      passKey: "",
      firstName: "",
      lastName: "",
    },

    validationSchema: yup.object({
      passKey: yup
        .string()
        .max(40, "Password too long")
        .required("Please Enter a password"),

      userEmail: yup
        .string()
        .email("Invalid email address")
        .required("Please Enter Email Id"),

      firstName: yup
        .string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .max(40)
        .required(),

      lastName: yup
        .string()
        .matches(/^[A-Za-z ]*$/, "Please enter valid name")
        .max(40)
        .required(),
    }),

    onSubmit: (userInfo) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      };

      fetch(`${API}/signup`, requestOptions).then((response) => {
        console.log(response);
      });
    },
  });
  return (
    <Fragment>
      <Header mainHeading="SIGNUP" />
      <div className="container pt-5 col-md-8 offset-md-2">
        <form onSubmit={formik.handleSubmit}>
          <FormControl className="w-100 py-4">
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input {...formik.getFieldProps("userEmail")} />
            <FormHelperText>
              {formik.touched.userEmail && formik.errors.userEmail ? (
                <span className="text-danger">{formik.errors.userEmail}</span>
              ) : (
                <span>We'll never share your email. </span>
              )}
            </FormHelperText>
          </FormControl>

          <FormControl className="w-100 py-4">
            <InputLabel htmlFor="my-input">Password</InputLabel>
            <Input type="password" {...formik.getFieldProps("passKey")} />
            <FormHelperText>
              {formik.touched.passKey && formik.errors.passKey ? (
                <span style={{ color: "red" }}>{formik.errors.passKey}</span>
              ) : (
                <span>Password should contain atleast 8 characters</span>
              )}
            </FormHelperText>
          </FormControl>

          <FormControl className="w-100 py-4">
            <InputLabel htmlFor="my-input">First Name</InputLabel>
            <Input type="text" {...formik.getFieldProps("firstName")} />
            <FormHelperText>
              {formik.touched.firstName && formik.errors.firstName ? (
                <span style={{ color: "red" }}>{formik.errors.firstName}</span>
              ) : (
                <span>Enter your last name</span>
              )}
            </FormHelperText>
          </FormControl>

          <FormControl className="w-100 py-4">
            <InputLabel htmlFor="my-input">Last Name</InputLabel>
            <Input type="text" {...formik.getFieldProps("lastName")} />
            <FormHelperText>
              {formik.touched.lastName && formik.errors.lastName ? (
                <span style={{ color: "red" }}>{formik.errors.lastName}</span>
              ) : (
                <span> Enter your last name </span>
              )}
            </FormHelperText>
          </FormControl>

          <div className="row">
            <Button
              className="fw-bold"
              color="primary"
              size="large"
              variant="outlined"
              type="submit  "
            >
              SIGNUP
            </Button>
            <Link to="/">
              <p className="text-center text-primary w-100 pt-2 fw-bold">
                Or Login if you are a member
              </p>
            </Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default SignUp;
