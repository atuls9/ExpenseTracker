import React, { useContext, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../store/AuthContext";
import { Container, Col, Row } from "react-bootstrap";
import ExpenseShowOnScreen from "../components/ExpenseShowOnScreen";

const Profile = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const moneyRef = useRef();

  const goToPrifile = () => {
    history.push("/profilepage");
  };

  const addExpenseHandler = () => {
    const item = {
      category: categoryRef.current.value,
      description: descriptionRef.current.value,
      money: moneyRef.current.value,
    };
    console.log("item in profile", item);

    authCtx.addExpense(item);
  };
  return (
    <>
      <div>
        <h1>Welcome to Expense Tracker!!!</h1>
        {!authCtx.isProfileCompleted && (
          <h3 className="float-end me-4">
            Your profile is incomplete
            <button
              className="btn btn-link"
              style={{ marginTop: "-1rem" }}
              onClick={goToPrifile}
            >
              Complete Now{" "}
            </button>
          </h3>
        )}
      </div>
      <h3 className="text-center mt-3">Add Expenses</h3>
      <Container className="mt-2 bg-info p-4 rounded-3">
        <Row>
          <Col>
            <label className="fw-bold me-1 text-danger fs-5">
              {" "}
              Select Category :
            </label>
            <select
              aria-label="Default select example"
              className="rounded-pill ms-2 p-1 ps-3"
              style={{ width: "14rem" }}
              ref={categoryRef}
            >
              <option>Category</option>
              <option value="Food">Food</option>
              <option value="Fees">Fees</option>
              <option value="Rent">Rent</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </Col>
          <Col>
            <form>
              <label className="fw-bold me-1 text-danger fs-5">
                {" "}
                Description :
              </label>
              <input
                type="text"
                ref={descriptionRef}
                className="rounded-pill ms-2 p-1 ps-3"
                style={{ width: "16rem" }}
              />
            </form>
          </Col>
          <Col>
            <form>
              <label className="fw-bold me-1 text-danger fs-5">
                Money Spend : ₹
              </label>
              <input
                type="number"
                ref={moneyRef}
                className="rounded-pill ms-2 p-1 ps-3"
              />
            </form>
          </Col>
        </Row>
        <Row className="text-end mt-3 me-4 ">
          <Col xs={8}>
            <h4>
              Beware of little expenses. A small leak will sink a great ship...
            </h4>
          </Col>
          <Col xs={4}>
            <button
              className="btn btn-danger rounded-pill fw-bold"
              style={{ width: "190px", marginRight: "12px" }}
              onClick={addExpenseHandler}
            >
              {" "}
              Add Expence
            </button>
          </Col>
        </Row>
      </Container>
      {authCtx.items.length && <ExpenseShowOnScreen />}
    </>
  );
};

export default Profile;
