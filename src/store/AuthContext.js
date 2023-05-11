import React, { useEffect, useState } from "react";
const AuthContext = React.createContext({
  token: "",
  uname: "",
  items: [],
  isLoggedIn: false,
  isProfileCompleted: false,
  setProfile: () => {},
  setUname: () => {},
  login: (token) => {},
  logout: () => {},
  addExpense: () => {},
  removeExpense: () => {},
});

export const AuthContextProvider = (props) => {
  const firstToken = localStorage.getItem("token");
  const [token, setToken] = useState(firstToken);
  const [profile, setProfile] = useState(false);
  const [uname, setUname] = useState("");
  const [items, setItems] = useState([]);

  let userLoggedIn = !!token;

  const addExpenseHandler = (item) => {
    setItems([
      ...items,
      { ...item, key: items.length + 1, id: items.length + 1 },
    ]);
    console.log(" items in authcontext", items);
  };
  const removeExpenseHandler = (id) => {
    setItems(items.filter((item) => id !== item.id));
  };
  useEffect(() => {
    loginHandler(token);
    // eslint-disable-next-line
  }, []);
  const loginHandler = (tkn) => {
    setToken(tkn);
    localStorage.setItem("token", tkn);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const authContextValue = {
    token: token,
    uname: uname,
    items: items,
    isLoggedIn: userLoggedIn,
    isProfileCompleted: profile,
    setProfile: setProfile,
    setUname: setUname,
    login: loginHandler,
    logout: logoutHandler,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
