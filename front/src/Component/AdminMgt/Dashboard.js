import React, { Fragment } from "react";
import SideMenu from "./SideMenu";
import MenuHeader from "./MenuHeader";

const Dashboard = () => {

  const userToken = JSON.parse(localStorage.getItem('token'));

    const gogo = () =>{
      fetch("http://localhost:3001/api/puppy", {
        method: "POST",
        headers: {"Authorization" : `Bearer ${userToken.token}`},
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

  return (
    <Fragment>
      <div className="row">
        <MenuHeader />
      </div>
      <div className="row">
        <div className="col-md-3 col-lg-3">
          <SideMenu activeLink="dashboard" />
        </div>
        <div className="col-md-9">
          <div className="row container py-5 justify-content-center">
            <h1>THIS IS Dashboard</h1>
            <p>Hi</p>
            <button onClick={gogo}> CLICKME</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
