import axios from "axios";
import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import { expenseActions } from "../store/expenses";
const SignUp = () => {
  const [errorShow, setErrorShow] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const switchHandler = () => {
    setIsLogin(!isLogin);
    setErrorShow(false);
  };

  const goToforgetpassword = (e) => {
    e.preventDefault();
    history.push("/forgetpassword");
  };

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(expenseActions.removeAll());
    setErrorShow(false);
    if (emailRef.current.value && passwordRef.current.value) {
      localStorage.setItem("email", emailRef.current.value);
      axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLLMTZRT-kIaaMJfTn3TFJKlmvB179Yvc`,
          {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            returnSecureToken: true,
          }
        )
        .then((res) => {
          console.log("user has logged in successfully");
          localStorage.setItem("token", res.data.idToken);
          history.push("/profile");

          dispatch(authActions.login());
          console.log(res.data);
          if (res.data.displayName && res.data.profilePicture) {
          } else {
          }
        })
        .catch((error) => {
          alert(error.response.data.error.message);
        });
    } else {
      setErrorShow(true);
    }
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    setErrorShow(false);
    if (
      emailRef.current.value &&
      passwordRef.current.value &&
      confirmPasswordRef.current.value
    ) {
      axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLLMTZRT-kIaaMJfTn3TFJKlmvB179Yvc`,
          {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            returnSecureToken: true,
          }
        )
        .then((res) => {
          setIsLogin(!isLogin);
        })
        .catch((error) => {
          alert(error.response.data.error.message);
        });
    } else {
      setErrorShow(true);
    }
  };
  return (
    <div
      className="container-fluid"
      style={{ height: "100vh", paddingTop: "100px" }}
    >
      <div className="row">
        <div className="col-md-6 mx-auto mt-5 p-3  text-white text-center ">
          <div
            className={`${
              isLogin ? "bg-info p-3 rounded-2 " : "bg-warning p-3 rounded-2 "
            }`}
          >
            <h3>{isLogin ? "Sign Up" : "Login"}</h3>
          </div>
        </div>
      </div>
      <div className="row  ">
        <div className="col-md-5 mx-auto mt-3 border border-3 border-info rounded-3 p-3 ">
          <form>
            <div className="form-group">
              <label className="form-label fw-bolder">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                ref={emailRef}
              />
            </div>
            <div className="form-group mt-3">
              <label className="form-label fw-bolder">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="form-control"
                autoComplete="on"
                ref={passwordRef}
              />
            </div>
            {isLogin && (
              <div className="form-group mt-3">
                <label className="form-label fw-bolder">Confirm Password</label>
                <input
                  placeholder="Confirm Password"
                  className="form-control"
                  ref={confirmPasswordRef}
                />
              </div>
            )}

            <div className="d-grid ">
              {errorShow && (
                <h4 className="text-center mt-3 text-danger">
                  All Fields Are Mandatory !!!
                </h4>
              )}
              {isLogin && (
                <button
                  className="btn btn-info mt-3 p-2 fw-bold rounded-pill"
                  onClick={signUpHandler}
                >
                  Sign Up
                </button>
              )}
              {!isLogin && (
                <button
                  className="btn btn-warning mt-3 p-2 rounded-pill fw-bold"
                  onClick={loginHandler}
                >
                  Login
                </button>
              )}
              {!isLogin && (
                <button
                  className="btn btn-link fw-bold"
                  onClick={goToforgetpassword}
                >
                  Forget Password
                </button>
              )}
            </div>
          </form>
          <div className="d-grid">
            <button
              className="btn btn-outline-success mt-3 p-2 rounded fw-bold"
              onClick={switchHandler}
            >
              {isLogin ? " Have an account?? Login " : "create acount"}
            </button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default SignUp;
