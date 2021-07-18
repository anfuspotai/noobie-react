import React, { Fragment } from "react";
import SideMenu from "./SideMenu";
import MenuHeader from "./MenuHeader";

const IncubatorMgt = () => {
  return (
    <Fragment>
      <div className="row">
        <MenuHeader />
      </div>
      <div className="row">
        <div className="col-md-3 col-lg-3">
          <SideMenu activeLink="incubator-mgt"/>
        </div>
        <div className="col-md-9">
          <div className="row container py-5 justify-content-center">
          <h1>THIS IS INCUBATOR MANAGEMENT</h1>
          <p>Hi</p>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default IncubatorMgt;
