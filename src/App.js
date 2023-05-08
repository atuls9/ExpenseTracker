import "./App.css";
import { Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import DummyScreen from "./components/DummyScreen";

function App() {
  return (
    <>
      {/* <SignUp /> */}
      <Route exact path={"/"}>
        <SignUp />
      </Route>
      <Route path={"/dummy"}>
        <DummyScreen />
      </Route>
    </>
  );
}

export default App;
