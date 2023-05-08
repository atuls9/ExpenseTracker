import axios from "axios";
import React, { useRef, useState } from "react";

const SignUp = () => {
  const [errorShow, setErrorShow] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  //   const firebaseKey = "AIzaSyDLLMTZRT-kIaaMJfTn3TFJKlmvB179Yvc";

  const submitHandler = (e) => {
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
          console.log("user has successful registered");
          //   console.log("res.data", res.data);
        })
        .catch((error) => {
          alert(error.response.data.error.message);
        });
    } else {
      setErrorShow(true);
    }
  };
  return (
    <div className="container ">
      <div className="row">
        <div className="col-md-6 mx-auto mt-5 p-3 bg-primary text-white text-center rounded-2">
          <h3>Sign Up</h3>
        </div>
      </div>
      <div className="row ">
        <div className="col-md-5 mx-auto mt-3">
          <form onSubmit={submitHandler}>
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
                ref={passwordRef}
              />
            </div>
            <div className="form-group mt-3">
              <label className="form-label fw-bolder">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-control"
                ref={confirmPasswordRef}
              />
            </div>

            <div className="d-grid ">
              {errorShow && (
                <h4 className="text-center mt-3 text-danger">
                  All Fields Are Mandatory !!!
                </h4>
              )}
              <button
                className="btn btn-primary mt-3 p-2 rounded-pill"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>{" "}
    </div>
  );
};

export default SignUp;
