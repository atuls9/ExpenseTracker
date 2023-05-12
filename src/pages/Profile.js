import React, { useContext, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../store/AuthContext";
import { Container, Col, Row } from "react-bootstrap";
import ExpenseShowOnScreen from "../components/ExpenseShowOnScreen";
import axios from "axios";

const Profile = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const moneyRef = useRef();
  const url = "https://expensetracker-8b210-default-rtdb.firebaseio.com";
  const emailEx = localStorage.getItem("email").replace(/[^a-zA-Z0-9 ]/g, "");

  const goToPrifile = () => {
    history.push("/profilepage");
  };

  function getData() {
    axios
      .get(`${url}/expenses/${emailEx}.json`)
      .then((res) => {
        // console.log(Object.keys(res.data));
        const firebaseIDs = Object.keys(res.data);
        // console.log("firebaseIDs,", firebaseIDs);
        const newItems = [];
        Object.values(res.data).forEach((el) => {
          newItems.push({
            ...JSON.parse(el.body),
            key: firebaseIDs[newItems.length],
            firebaseID: firebaseIDs[newItems.length],
          });
        });
        // console.log("newItems", newItems);
        authCtx.setItems(newItems);
      })
      .catch((error) => console.log(error.message));
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);
  const addExpenseHandler = () => {
    const item = {
      category: categoryRef.current.value,
      description: descriptionRef.current.value,
      money: moneyRef.current.value,
    };
    // console.log("item in profile", item);

    axios
      .post(`${url}/expenses/${emailEx}.json`, {
        body: JSON.stringify(item),
      })
      .then((res) => {
        // console.log("res data from axios", res.data.name);

        authCtx.addExpense({
          ...item,
          firebaseID: res.data.name,
          key: res.data.name,
        });
        categoryRef.current.value = "Category";
        descriptionRef.current.value = "";
        moneyRef.current.value = "";
      })
      .catch((error) => console.log(error.message));
  };

  const editItem = (item) => {
    getData();
    categoryRef.current.value = item.category;
    descriptionRef.current.value = item.description;
    moneyRef.current.value = item.money;

    axios
      .delete(`${url}/expenses/${emailEx}/${item.firebaseID}.json`)
      .then((res) => {
        console.log(res);

        authCtx.removeExpense(item.firebaseID);
      })
      .catch((error) => console.log(error.message));
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
      {authCtx.items.length && <ExpenseShowOnScreen editItem={editItem} />}
    </>
  );
};

export default Profile;
