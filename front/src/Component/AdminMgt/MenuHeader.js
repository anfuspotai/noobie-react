import React from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import { API } from "../../config";
import AuthApi from "../../utils/AuthApi";

const MenuHeader = () => {

  // const history = useHistory();
  const authApi = React.useContext(AuthApi);

  const logOut = () => {
    fetch(`${API}/logout`, {
      method: "GET",
    })
      .then((response) => {
        authApi.setAuth(false)
        return <Redirect to="/" />;
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/dashboard">
          LoginSys
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
           <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
          </ul> 
          <button
            className="btn btn-outline-danger fw-bold border-2 mx-4 my-2"
            onClick={logOut}
          >
            LOGOUT
          </button>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(MenuHeader);

/* 

<li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" href="#">
                    Action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Another action
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>


*/
