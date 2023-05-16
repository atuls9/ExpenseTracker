import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenses";
import authReducer from "./auth";

const store = configureStore({
  reducer: { auth: authReducer, expenses: expensesReducer },
});

export default store;
