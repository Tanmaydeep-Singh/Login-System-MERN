import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PasswordReset from "./pages/PasswordReset";
import ResetRequest from "./pages/ResetRequest";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/PasswordReset/:id" element={<PasswordReset />}></Route>
          <Route path="/ResetRequest" element={<ResetRequest />}></Route>
          <Route path="/LandingPage" element={<LandingPage />}></Route>



        </Routes>
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
