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
  addExpense: (item) => {},
  removeExpense: () => {},
  setItems: () => {},
  setFirebaseID: () => {},
});

export const AuthContextProvider = (props) => {
  let firstToken;
  const [profile, setProfile] = useState(false);
  const [uname, setUname] = useState("");
  const [items, setItems] = useState([]);
  const [firebaseID, setFirebaseID] = useState([]);

  if (localStorage.getItem("token")) {
    firstToken = localStorage.getItem("token");
  } else {
    firstToken = "";
  }
  const [token, setToken] = useState(firstToken);

  let userLoggedIn = !!token;

  const addExpenseHandler = (item) => {
    setItems([
      ...items,
      { ...item, key: items.length + 1, id: items.length + 1 },
    ]);
    // console.log(" items in authcontext", items);
  };
  const removeExpenseHandler = (id) => {
    setItems(items.filter((item) => id !== item.firebaseID));
  };
  useEffect(() => {
    loginHandler(token);
    // eslint-disable-next-line
  }, []);
  const loginHandler = (tkn) => {
    setItems([]);
    setToken(tkn);
    localStorage.setItem("token", tkn);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("email");
    localStorage.removeItem("token");
  };

  const authContextValue = {
    token: token,
    uname: uname,
    items: items,
    firebaseID: firebaseID,
    isLoggedIn: userLoggedIn,
    isProfileCompleted: profile,
    setItems: setItems,
    setProfile: setProfile,
    setUname: setUname,
    login: loginHandler,
    logout: logoutHandler,
    addExpense: addExpenseHandler,
    removeExpense: removeExpenseHandler,
    setFirebaseID: setFirebaseID,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
