import { Route, Routes } from "react-router-dom";
import Home from "./Container/Home";
import Header from "./user/Header";
import Login from "./user/Login";
import Registration from "./user/Registration";
import React, { useState, createContext } from "react";
import PublicRoute from "./component/PublicRoute";
import Layout from "./component/Layout";
import About from "./Container/About";
import Menu from "./Container/Menu";
import Contacts from "./Container/Contacts";
import PrivateRoute from "./component/PrivateRoute";
import Apidata from "./Container/Apidata";
import Createuser from "./Container/Createuser";
import Editapidata from "./Container/Editapidata";
export const AppContext = createContext();
function App() {
  const [loginuserdata, setLoginuserdata] = useState({ admin: {}, user: {} });
  //  console.log("------------------user------------",loginuserdata);
  function userdata(data) {
    if (data.email === "kajal123@gmail.com" && data.password === "Kajal@123") {
      setLoginuserdata({
        ...loginuserdata,
        admin: data,
      });
    } else {
      setLoginuserdata({
        ...loginuserdata,
        user: data,
      });
    }
  }
  return (
    <>
      <AppContext.Provider value={[loginuserdata, setLoginuserdata]}>
        <Header />
        <Routes>
          <Route
            path="/Home"
            element={
              <Layout>
                <PublicRoute>
                  <Home />
                </PublicRoute>
              </Layout>
            }
          />
          <Route
            path="/About"
            element={
              <Layout>
                <About />
              </Layout>
            }
          />

          
          <Route
            path="/Login"
            element={
              <Layout>
                <Login data={userdata} />
              </Layout>
            }
          />
          <Route
            path="/Registration"
            element={
              <Layout>
                <Registration />
              </Layout>
            }
          />
          <Route
            path="/Apidata"
            element={
              <Layout>
                <Apidata />
              </Layout>
            }
          />
          <Route
            path="/Menu"
            element={
              <Layout>
                <PrivateRoute>
                  <Menu />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/Contacts"
            element={
              <Layout>
                <Contacts />
              </Layout>
            }
          />
          <Route
            path="/Createuser"
            element={
              <Layout>
                <Createuser />
              </Layout>
            }
          />
          <Route
            path="/Editapidata/:id"
            element={
              <Layout>
                <Editapidata />
              </Layout>
            }
          />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App;
