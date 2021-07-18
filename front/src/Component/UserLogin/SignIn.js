import React, { Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import { API } from "../../config";
import Header from "./Header";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@material-ui/core";

import AuthApi from "../../utils/AuthApi";


import { useFormik } from "formik";
import * as yup from "yup";

export default function SignIn() {
  const history = useHistory();

  const authApi = React.useContext(AuthApi);


  const formik = useFormik({
    initialValues: {
      userEmail: "anfusanu@gmail.com",
      passKey: "admin",
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
    }),

    onSubmit: (userInfo) => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      };

      fetch(`${API}/login`, requestOptions)
        .then((response) =>  response.json())
        .then((data) => {
          if (data.loginStatus){
            localStorage.setItem('token',JSON.stringify(data))
            authApi.setAuth(true)
            history.push(`dashboard`)
          }
          else{
            alert('Username or password is invalid')
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <Fragment>
      <Header mainHeading="LOGIN" />
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

          <div className="row">
            <Button
              className="fw-bold"
              color="primary"
              size="large"
              variant="outlined"
              type="submit  "
            >
              LOGIN
            </Button>
            <Link to="/signup">
              <p className="text-center text-primary w-100 pt-2 fw-bold">
                Or Signup if you are not a member
              </p>
            </Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
}
