import "./App.css";
import { Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ProfilePage from "./pages/ProfilePage";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import Navbar from "./components/Navbar";
// import { Navbar } from "react-bootstrap";

function App() {
  return (
    <>
      {/* <SignUp /> */}
      <Navbar />
      <Switch>
        <Route exact path={"/"}>
          <SignUp />
        </Route>
        <Route path={"/dummy"}>
          <Profile />
        </Route>
        <ProfilePage />
        <Route path={"/profilepage"} element={<ProfilePage />} />
      </Switch>
    </>
  );
}

export default App;
