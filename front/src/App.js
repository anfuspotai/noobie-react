import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";


import SignIn from "./Component/UserLogin/SignIn";
import SignUp from "./Component/UserLogin/SignUp";

import Dashboard from "./Component/AdminMgt/Dashboard";
import UserMgt from "./Component/AdminMgt/UserMgt";
import RequestMgt from "./Component/AdminMgt/RequestMgt";
import IncubatorMgt from "./Component/AdminMgt/IncubatorMgt";

import AuthApi from "./utils/AuthApi";

export default function Routes() {
  const [auth, setAuth] = useState(false);
  return (
    <BrowserRouter>
      <AuthApi.Provider value={{ auth, setAuth }}>
        <Switch>
          <PrivateRouter exact path="/dashboard" component={Dashboard} />
          <PrivateRouter exact path="/user-mgt" component={UserMgt} />
          <PrivateRouter exact path="/incubator-mgt" component={IncubatorMgt} />
          <PrivateRouter exact path="/request-mgt" component={RequestMgt} />

          <PublicRouter path="/" exact component={SignIn} />
          <PublicRouter exact path="/signup" component={SignUp} />
          <PublicRouter component={NotFound} />
        </Switch>
      </AuthApi.Provider>
    </BrowserRouter>
  );
}

const PrivateRouter = ({ component: Component, ...rest }) => {
  const authApi = React.useContext(AuthApi);
  return (
    <Route
      {...rest}
      render={(props) => authApi.auth ? <Component {...props} /> : <Redirect to="/"/> }

    />
  );
};

const PublicRouter = ({ component: Component, ...rest }) => {
  const authApi = React.useContext(AuthApi);

  return (
    <Route
      {...rest}
      render={(props) => !authApi.auth ? <Component {...props} /> : <Redirect to="/dashboard"/> }
    />
  );
};

const NotFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
    </div>
  );
};
