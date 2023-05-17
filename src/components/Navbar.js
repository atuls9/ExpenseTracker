import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { NavLink } from "react-router-dom";
import { themeActions } from "../store/theme";
import "./Navbar.css";

const Navbar = () => {
  const [showTotal, setShowTotal] = useState(false);
  const [premiumActivate, setPremiumActivate] = useState(false);

  const history = useHistory();
  const auth = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const total = useSelector((state) => state.expenses.total);
  const theme = useSelector((state) => state.theme.darkTheme);

  console.log("total", total);
  useEffect(() => {
    if (total > 10000) {
      setShowTotal(true);
    } else {
      setShowTotal(false);
    }
  }, [total]);
  const dispatch = useDispatch();

  const verifyEmailHandler = () => {
    axios

      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDLLMTZRT-kIaaMJfTn3TFJKlmvB179Yvc",
        {
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err.response.data.error.message);
        alert(err.response.data.error.message);
      });
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push("/");
  };
  const changeTheme = () => {
    dispatch(themeActions.changeTheme());
  };

  return (
    <nav
      style={{
        position: "fixed",
        width: "100%",
      }}
      className={`${
        theme
          ? "navbar navbar-expand-lg bg-warning p-3"
          : "navbar navbar-expand-lg bg-dark p-3"
      }`}
      // "navbar navbar-expand-lg bg-dark p-3"
    >
      <div className="container-fluid ">
        {/* <h4 className="navbar-brand">Navbar</h4> */}
        <div className="heading waviy rounded-3 ps-3 pe-3 ">
          <span style={{ "--i": "1" }}>E</span>
          <span style={{ "--i": "2" }}>x</span>
          <span style={{ "--i": "3" }}>p</span>
          <span style={{ "--i": "4" }}>e</span>
          <span style={{ "--i": "5" }}>n</span>
          <span style={{ "--i": "6" }}>s</span>
          <span style={{ "--i": "7" }}>e</span>
          <span style={{ "--i": "8" }}>&nbsp; &nbsp;</span>
          <span style={{ "--i": "9" }}>T</span>
          <span style={{ "--i": "10" }}>r</span>
          <span style={{ "--i": "11" }}>a</span>
          <span style={{ "--i": "12" }}>c</span>
          <span style={{ "--i": "13" }}>k</span>
          <span style={{ "--i": "14" }}>e</span>
          <span style={{ "--i": "15" }}>r</span>

          {/* <span style="--i:2">o</span> */}
        </div>
        <div className="collapse navbar-collapse ps-5 " id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item fw-bolder">
              {auth && <NavLink to="/profile">Home</NavLink>}
              {!auth && <NavLink to="/">Home</NavLink>}
            </li>
          </ul>
          {auth && (
            <div className="mx-auto ">
              <button
                className="btn btn-secondary "
                onClick={verifyEmailHandler}
              >
                Verify Email
              </button>

              <button className="btn btn-danger ms-4 " onClick={logoutHandler}>
                Logout
              </button>

              {showTotal && (
                <>
                  {!premiumActivate && (
                    <button
                      className="btn btn-success ms-4 "
                      onClick={() => setPremiumActivate(true)}
                    >
                      Activate Premium
                    </button>
                  )}
                  {premiumActivate && (
                    <button className="btn btn-success ms-4 ">
                      <div className="form-check form-switch">
                        <label className="form-check-label">Change Theme</label>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckDefault"
                          onClick={() => changeTheme()}
                        />
                      </div>
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
