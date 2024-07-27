import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/header";
import Footer from "./components/footer";
import Marketplace from "./components/marketplace/Marketplace";
import LandingPage from "./components/landingPage";
import Navbar from "./components/navbar";
import Signin from "./components/signin";
import Signup from "./components/signup";

const AppRoutes = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    // Redirect to Marketplace if logged in
    if (isLoggedIn && window.location.pathname === "/") {
      navigate("/marketplace");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Routes>
      {/* Landing Page, Sign In, and Sign Up */}
      <Route
        path="/"
        element={
          <>
            <Header />
            <LandingPage />
            <Footer />
          </>
        }
      />
      <Route
        path="/signin"
        element={
          <>
            <Header />
            <Signin />
            <Footer />
          </>
        }
      />
      <Route
        path="/signup"
        element={
          <>
            <Header />
            <Signup />
            <Footer />
          </>
        }
      />

      {/* Marketplace and other routes */}
      <Route
        path="/marketplace"
        element={
          isLoggedIn ? (
            <>
              <Marketplace />
            </>
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
