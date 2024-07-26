import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { ACCESS_TOKEN_KEY } from "../common/constants";
import Main from "./Main";

export const App = () => {
  console.log("Rendering App")

  const isLoggedIn: boolean = localStorage.getItem(ACCESS_TOKEN_KEY) != null || true;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path='/*' element={isLoggedIn ? <Main/> : <Navigate to='/signin'/>} />
      </Routes>
    </BrowserRouter>
  );
};
