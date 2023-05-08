import "./App.css";
import { Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <>
      {/* <SignUp /> */}
      <Route exact path={"/"}>
        <SignUp />
      </Route>
      <Route path={"/dummy"}>
        <Profile />
      </Route>
      <Route path={"/profilepage"}>
        <ProfilePage />
      </Route>
    </>
  );
}

export default App;
