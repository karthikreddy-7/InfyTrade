// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/dashboard/Dashboard";
//import Community from "./components/community/Community";
import Rankings from "./components/rankings/Rankings";
import Marketplace from "./components/marketplace/Marketplace";
import LandingPage from "./components/LandingPage";

const App = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Router>
      <Header />
      <Footer />
    </Router>
  );
};

export default App;
