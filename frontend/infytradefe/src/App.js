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

const AppRoutes = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    // Redirect to Marketplace if logged in
    if (isLoggedIn) {
      navigate("/marketplace");
    } else {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          !isLoggedIn ? (
            <>
              <Header />
              <LandingPage />
              <Footer />
            </>
          ) : (
            <Navigate to="/marketplace" />
          )
        }
      />
      <Route
        path="/marketplace"
        element={
          isLoggedIn ? (
            <>
              <Navbar />
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
