import "./App.css";
import Login from "./Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Registration/Signup";
import Dashboard from "./dashboard/dashboard";
import ResetPassword from "./ResetPassword/resetPassword";
import Home from "./components/home";
import Applies from "./components/applies";
import Profile from "./components/profile";
import Inbox from "./components/inbox";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="resetPassword" element={<ResetPassword />}></Route>
        <Route
          path="dashboard"
          element={
            <>
              <Dashboard /> <br />
              <Home />
            </>
          }
        ></Route>
        <Route
          path="applies"
          element={
            <>
              <Dashboard /> <br />
              <Applies />
            </>
          }
        ></Route>
        <Route
          path="inbox"
          element={
            <>
              <Dashboard />
              <br /> <Inbox />
            </>
          }
        ></Route>
        <Route
          path="profile"
          element={
            <>
              <Dashboard /> <br />
              <Profile />
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
