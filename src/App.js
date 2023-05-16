import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import ForgetPassword from "./pages/ForgetPassword";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/auth";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(" start reloading in app");
    if (localStorage.getItem("token")) {
      dispatch(authActions.login());
    }
    // eslint-disable-next-line
  }, []);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  return (
    <>
      <Navbar />

      <Switch>
        <Route exact path={"/"}>
          <SignUp />
        </Route>
        {isLoggedIn && (
          <Route exact path={"/profile"}>
            <Profile />
          </Route>
        )}

        <Route path={"/forgetpassword"}>
          <ForgetPassword />
        </Route>
        {isLoggedIn && (
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
