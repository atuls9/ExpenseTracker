import React from "react";
import { Container, Row, Table } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { expenseActions } from "../store/expenses";
import { CSVLink } from "react-csv";

const headers = [
  { label: "Category", key: "category" },
  { label: "Description", key: "description" },
  { label: "Money", key: "money" },
];

const ExpenseShowOnScreen = (props) => {
  const items = useSelector((state) => state.expenses.items);
  const total = useSelector((state) => state.expenses.total);
  const dispatch = useDispatch();
  const emailEx = localStorage.getItem("email").replace(/[^a-zA-Z0-9 ]/g, "");
  const url = `https://expensetracker-8b210-default-rtdb.firebaseio.com`;

  const removeItem = (item) => {
    const urlRemoveItem = `${url}/expenses/${emailEx}/${item.firebaseID}.json`;

    axios
      .delete(urlRemoveItem)
      .then((res) => {
        console.log("Expense successfuly deleted");
        dispatch(expenseActions.removeExpense(item));
      })
      .catch((error) => console.log(error.message));
  };

  const editExpense = (item) => {
    props.editItem(item);
  };

  const Items = items.map((item) => {
    return (
      <tr className="text-dark fw-bold" key={item.firebaseID}>
        <td className="text-dark fw-bold">{item.category}</td>
        <td>{item.description}</td>
        <td className="text-dark fw-bold"> ₹ {item.money}.00</td>
        <td>
          <div className="d-grid ">
            <button
              className="btn btn-success"
              onClick={() => editExpense(item)}
            >
              Edit
            </button>
          </div>
        </td>
        <td>
          <div className="d-grid">
            <button
              className="btn btn-danger "
              onClick={() => removeItem(item)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <Container className="mt-2 atul" style={{ backgroundColor: "#2FC3BA" }}>
      <Row>
        <Table striped="columns">
          <thead>
            {total > 10000 && (
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th>
                  <div className="d-grid ">
                    <CSVLink data={items} headers={headers}>
                      <button className="btn btn-warning">Download</button>
                    </CSVLink>
                  </div>
                </th>
                <th></th>
              </tr>
            )}
            <tr className="fs-5 text-danger">
              <th className="fs-5 text-danger">Category</th>
              <th>Description</th>
              <th className="fs-5 text-danger">Money Spend</th>
              <th>Edit</th>
              <th className="fs-5 text-danger">Delete</th>
            </tr>
          </thead>
          <tbody>{Items}</tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default ExpenseShowOnScreen;
