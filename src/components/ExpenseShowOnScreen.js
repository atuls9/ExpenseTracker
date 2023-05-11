import React, { useContext } from "react";
import { Container, Row, Table } from "react-bootstrap";
import AuthContext from "../store/AuthContext";

const ExpenseShowOnScreen = () => {
  const authCtx = useContext(AuthContext);

  const removeItem = (id) => {
    authCtx.removeExpense(id);
  };

  const Items = authCtx.items.map((item) => {
    return (
      <tr className="text-dark fw-bold">
        <td>{item.id}</td>
        <td className="text-dark fw-bold">{item.category}</td>
        <td>{item.description}</td>
        <td className="text-dark fw-bold"> ₹ {item.money}.00</td>
        <td>
          <div className="d-grid ">
            <button className="btn btn-success">Edit</button>
          </div>
        </td>
        <td>
          <div className="d-grid">
            <button
              className="btn btn-danger "
              onClick={() => removeItem(item.id)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <Container className="mt-2 " style={{ backgroundColor: "#2FC3BA" }}>
      <Row>
        <Table striped="columns">
          <thead>
            <tr className="fs-5 text-danger">
              <th>Sr. No.</th>
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
