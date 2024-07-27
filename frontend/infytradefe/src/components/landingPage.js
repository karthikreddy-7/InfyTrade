import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../redux/action";
import ui_customization from "../assests/ui_customization.jpeg";
import rtdata_analysis from "../assests/rtdata_analysis.jpeg";
import mlmodels from "../assests/mlmodels.jpeg";
import flexImage from "../assests/flex_image.jpeg";
import Footer from "./footer";

const LandingPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLoginStatusChange = () => {
    const user = { name: "John Doe", email: "john.doe@example.com" };
    if (isLoggedIn) {
      dispatch(logout());
    } else {
      dispatch(loginSuccess(user));
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.heroSection}>
        <div style={styles.heroText}>
          <p style={styles.subtitle}>Trade Smarter with InfyTrade</p>
          <h1 style={styles.mainTitle}>
            Trade, Analyze, Succeed and{" "}
            <span style={styles.highlight}>Get Amazing Profit</span>
          </h1>
          <p style={styles.description}>
            Revolutionize your trading experience with our cutting-edge tools,
            real-time insights, and community-driven features.
          </p>
          <div style={styles.buttons}>
            <button style={styles.getStartedButton} onClick={handleLoginStatusChange}>
              {isLoggedIn ? "Logout" : "Go to MarketPlace"}
            </button>
            <button style={styles.howItWorksButton}>See How it Works</button>
          </div>
        </div>
        <img src={flexImage} alt="Flex" style={styles.heroImage} />
      </div>

      <h2 style={styles.centeredTitle}>Why choose InfyTrade?</h2>
      <h3 style={styles.centeredSubtitle}>Specially designed for stock market</h3>
      <div style={styles.features}>
        <div style={styles.feature}>
          <img src={ui_customization} alt="UI Customization" style={styles.featureImage} />
          <h4 style={styles.featureTitle}>UI Customization</h4>
          <p style={styles.featureText}>
            Easily personalize your trading interface with our intuitive drag-and-drop options,
            making it easy to create a layout that suits your needs.
          </p>
        </div>
        <div style={styles.feature}>
          <img src={rtdata_analysis} alt="Real-Time Data Analytics" style={styles.featureImage} />
          <h4 style={styles.featureTitle}>Real-Time Data Analytics</h4>
          <p style={styles.featureText}>
            Leverage real-time data analytics with a variety of charts and plots to gain deeper
            insights into market trends and make informed trading decisions.
          </p>
        </div>
        <div style={styles.feature}>
          <img src={mlmodels} alt="Advanced ML Models" style={styles.featureImage} />
          <h4 style={styles.featureTitle}>Advanced ML Models</h4>
          <p style={styles.featureText}>
            Access a library of predefined ML model templates tailored for stocks, forex, crypto,
            and futures & options, allowing you to apply advanced analytics effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "left",
    padding: "20px 40px",
    backgroundColor: "#f9f9f9",
    maxWidth: "100%",
    margin: "0 auto",
  },
  heroSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroText: {
    width: "50%",
  },
  subtitle: {
    color: "#3498db",
    fontSize: "24px",
    marginBottom: "20px",
  },
  mainTitle: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "30px",
    lineHeight: "1.2",
  },
  highlight: {
    color: "#3498db",
  },
  description: {
    fontSize: "20px",
    color: "#666",
    marginBottom: "40px",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-start",
    gap: "20px",
  },
  getStartedButton: {
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    padding: "16px 32px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
  },
  howItWorksButton: {
    backgroundColor: "transparent",
    color: "#3498db",
    border: "2px solid #3498db",
    padding: "16px 32px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
  },
  heroImage: {
    width: "50%",
    height: "auto",
  },
  centeredTitle: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#1f73b7",
    textAlign: "center",
    marginBottom: "40px",
  },
  centeredSubtitle: {
    color: "#3498db",
    fontSize: "24px",
    textAlign: "center",
    marginBottom: "40px",
  },
  features: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  feature: {
    width: "30%",
    margin: "20px",
    padding: "20px",
    border: "1px solid #eaeaea",
    borderRadius: "8px",
    textAlign: "left",
  },
  featureImage: {
    width: "100%",
    height: "auto",
    marginBottom: "20px",
  },
  featureTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  featureText: {
    fontSize: "18px",
    color: "#555",
  },
};

export default LandingPage;
