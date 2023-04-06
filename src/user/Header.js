import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
function Header(props) {
  const nav = useNavigate();
  const [user, setUser] = useContext(AppContext);
  // console.log("----------user", user);
  const Logout = () => {
    localStorage.removeItem("Loginuser");
    localStorage.removeItem("Admin");
    user.user = "";
    user.admin="";
    nav("/Login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg  bg-body-tertiary navbar bg-dark ">
        <div className="container-fluid">
          <div className="navbar bg-dark" data-bs-theme="dark">
            <ul className="navbar-nav">
              <li className="nav-link">
                <Link to="/Registration">Registration</Link>
              </li>
              {user.user.email == undefined && user.admin.email == undefined ? (
                <li className="nav-link">
                  <Link to="/Login">Login </Link>
                </li>
              ) : (
                <li>
                  <Link to="/Login" onClick={Logout}>
                    Logout
                  </Link>
                </li>
              )}
            
           
              {user.user.email === undefined  && user.admin.email===undefined ? (
                ""
              ) : (
                <li className="nav-link">
                  <Link to="/Home">Home</Link>
                </li>
              )}

              {user.user.email === undefined && user.admin.email===undefined ? (
                ""
              ) : (
                <li className="nav-link">
                  <Link to="/About">About</Link>
                </li>
              )}
             
                <li className="nav-link">
                  <Link to="/Apidata">Apidata</Link>
                </li>
            

              {user.admin.email === undefined 
              ? (
                ""
              ) : (
                <li className="nav-link">
                  <Link to="/Menu">Menu</Link>
                </li>
              )}

              <li className="nav-link">
                <Link to="/Contacts">Contacts</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
