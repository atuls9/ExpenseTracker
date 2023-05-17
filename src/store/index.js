import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenses";
import authReducer from "./auth";
import themeReducer from "./theme";

const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer,
    theme: themeReducer,
  },
});

export default store;
