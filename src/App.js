import "./App.css";
import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ProfilePage from "./pages/ProfilePage";
// import {  } from "react-router-dom/cjs/react-router-dom.min";
import Navbar from "./components/Navbar";
import ForgetPassword from "./pages/ForgetPassword";
import AuthContext from "./store/AuthContext";
// import { Navbar } from "react-bootstrap";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      {/* <SignUp /> */}
      <Navbar />

      <Switch>
        <Route exact path={"/"}>
          <SignUp />
        </Route>
        {authCtx.isLoggedIn && (
          <Route path={"/profile"}>
            <Profile />
          </Route>
        )}

        <Route path={"/forgetpassword"}>
          <ForgetPassword />
        </Route>
        {authCtx.isLoggedIn && (
          <Route path={"/profilepage"}>
            <ProfilePage />
          </Route>
        )}
        <Route path={"*"}>
          <SignUp />
        </Route>
      </Switch>
    </>
  );
}

export default App;
