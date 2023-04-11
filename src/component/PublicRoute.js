import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../App";
function PublicRoute({ children }) {
 
  //   const Navigate = useNavigate();
  const [user, setUser] = useContext(AppContext);
 

  if (user.user.email) {
    return <div> {children}</div>;
  } else {
    return <Navigate to="/Login" />;
  }
}

export default PublicRoute;
