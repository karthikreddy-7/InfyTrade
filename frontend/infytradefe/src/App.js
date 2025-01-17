import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/header";
import Footer from "./components/footer";
import Marketplace from "./components/marketplace/Marketplace";
import LandingPage from "./components/landingPage";
import Navbar from "./components/navbar";
import Signin from "./components/signin";
import Signup from "./components/signup";
import Dashboard from "./components/dashboard/dashboard";
import Portfolio from "./components/portfolio/portfolio";
import Analysis from "./components/analytics/analysis";
import AutomatedTradingSystem from "./components/ATS/automatedTradingSystem";
import Rankings from "./components/rankings/Rankings";
import Community from "./components/community/Community";
import { loginSuccess } from "./redux/action";
import AccountSettings from "./components/AccountSettings/accountSettings";
import { NextUIProvider, ScrollShadow } from "@nextui-org/react";
import Walletmoney from "./components/walletmoney";
import DummyMarketPlace from "./components/marketplace/Dummymarketplace";

const Layout = ({ children }) => (
  <div className="flex h-screen bg-gray-100">
    <Navbar />
    <main className="flex-1 bg-white overflow-auto">{children}</main>
  </div>
);

const ProtectedRoute = ({ element }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return isLoggedIn ? element : <Navigate to="/signin" />;
};

const AppRoutes = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn && window.location.pathname === "/") {
      navigate("/marketplace");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Routes>
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

      {/* Protected Routes */}
      <Route
        path="/marketplace"
        element={
          <ProtectedRoute
            element={
              <Layout>
                <DummyMarketPlace />
              </Layout>
            }
          />
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
        }
      />
      <Route
        path="/portfolio"
        element={
          <ProtectedRoute
            element={
              <Layout>
                <Portfolio />
              </Layout>
            }
          />
        }
      />
      <Route
        path="/analysis"
        element={
          <ProtectedRoute
            element={
              <Layout>
                <Analysis />
              </Layout>
            }
          />
        }
      />
      <Route
        path="/automated-trading"
        element={
          <ProtectedRoute
            element={
              <Layout>
                <AutomatedTradingSystem />
              </Layout>
            }
          />
        }
      />
      <Route
        path="/ranking"
        element={
          <ProtectedRoute
            element={
              <Layout>
                <Rankings />
              </Layout>
            }
          />
        }
      />
      <Route
        path="/community"
        element={
          <ProtectedRoute
            element={
              <Layout>
                <Community />
              </Layout>
            }
          />
        }
      />
      <Route
        path="/account-settings"
        element={
          <ProtectedRoute
            element={
              <Layout>
                <AccountSettings />
              </Layout>
            }
          />
        }
      />
      <Route
        path="/wallet"
        element={
          <ProtectedRoute
            element={
              <Layout>
                <Walletmoney />
              </Layout>
            }
          />
        }
      />
    </Routes>
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const parsedToken = JSON.parse(token);
    console.log(parsedToken);
    if (parsedToken) {
      // Optionally validate the token with the backend and fetch user details
      dispatch(loginSuccess(parsedToken));
    }
  }, []);

  return (
    <NextUIProvider>
      <Router>
        <ScrollShadow hideScrollBar>
          <div className="focus:outline-none caret-transparent">
            <AppRoutes />
          </div>
        </ScrollShadow>
      </Router>
    </NextUIProvider>
  );
};

export default App;
