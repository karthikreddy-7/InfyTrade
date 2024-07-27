import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../redux/action";
import ui_customization from "../assests/ui_customization.jpeg"; 
import rtdata_analysis from "../assests/rtdata_analysis.jpeg"; 
import mlmodels from "../assests/mlmodels.jpeg"; 
import flexImage from "../assests/flex_image.jpeg"; 
import dynamicDashboards from "../assests/dynamic_dashboards.jpeg"; 
import traderRankings from "../assests/trader_rankings.jpeg"; 
import communityMarketplace from "../assests/community_marketplace.jpeg"; 
import invention from "../assests/invention.jpeg"; 
import Footer from "./footer";

const LandingPage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // State for managing subscription message
  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  const handleLoginStatusChange = () => {
    const user = { name: "John Doe", email: "john.doe@example.com" };
    if (isLoggedIn) {
      dispatch(logout());
    } else {
      dispatch(loginSuccess(user));
    }
  };

  const handleNewsletterSignup = () => {
    setSubscriptionMessage("Subscribed successfully!");
    // Clear the message after a few seconds
    setTimeout(() => setSubscriptionMessage(""), 3000);
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
        <img src={flexImage} alt="FlexImage" style={styles.heroImage} />
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

      <h2 style={styles.additionalTitle}>Additional advantages from InfyTrade</h2>
      <div style={styles.additionalAdvantages}>
        <div style={styles.advantage}>
          <img src={dynamicDashboards} alt="Dynamic Dashboards" style={styles.advantageImage} />
          <h4 style={styles.advantageTitle}>Dynamic Dashboards</h4>
          <p style={styles.advantageText}>
            Create and share multiple dashboards, either publicly or privately, making it easy to
            track and analyze your trading performance.
          </p>
        </div>
        <div style={styles.advantage}>
          <img src={traderRankings} alt="Trader Rankings" style={styles.advantageImage} />
          <h4 style={styles.advantageTitle}>Trader Rankings</h4>
          <p style={styles.advantageText}>
            Learn from the best by viewing the rankings of top traders who have opted to share
            their portfolios publicly, and enhance your own trading skills.
          </p>
        </div>
        <div style={styles.advantage}>
          <img src={communityMarketplace} alt="Community and Marketplace" style={styles.advantageImage} />
          <h4 style={styles.advantageTitle}>Community and Marketplace</h4>
          <p style={styles.advantageText}>
            Join a vibrant community of traders, make connections, and access a marketplace filled
            with resources, tools, and insights.
          </p>
        </div>
        <div style={styles.advantage}>
          <img src={invention} alt="Invention" style={styles.advantageImage} />
          <h4 style={styles.advantageTitle}>Invention</h4>
          <p style={styles.advantageText}>
            InfyTrade is the result of the production, refinement, or development of the original
            invention. It is also continuous and continuously developing in a better direction.
          </p>
        </div>
      </div>

      <div style={styles.newsletterSection}>
        <div style={styles.newsletterText}>
          <h2>Stay updated with our weekly newsletter</h2>
          <p>a collection of the hottest stock market news sent every week to your email</p>
        </div>
        <div style={styles.newsletterSignup}>
          <input type="email" placeholder="Email address" style={styles.inputField} />
          <input type="password" placeholder="Password" style={styles.inputField} />
          <button style={styles.signupButton} onClick={handleNewsletterSignup}>Get Started</button>
        </div>
        {subscriptionMessage && (
          <div style={styles.subscriptionMessage}>
            {subscriptionMessage}
          </div>
        )}
      </div>

      {/* Add Footer here if needed */}
      {/* <Footer /> */}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "left",
    padding: "10px 20px",
    backgroundColor: "#f9f9f9",
    maxWidth: "100%",
    margin: "0 auto",
  },
  heroSection: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  heroText: {
    flex: "0 0 55%", 
    padding: "20px",
    fontSize: "22px", 
  },
  subtitle: {
    color: "#3498db",
    fontSize: "28px", 
    marginBottom: "20px",
  },
  mainTitle: {
    fontSize: "56px", 
    fontWeight: "bold",
    marginBottom: "30px",
    lineHeight: "1.2",
  },
  highlight: {
    color: "#3498db",
  },
  description: {
    fontSize: "24px", 
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
    padding: "12px 24px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
  },
  howItWorksButton: {
    backgroundColor: "transparent",
    color: "#3498db",
    border: "2px solid #3498db",
    padding: "12px 24px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
  },
  heroImage: {
    flex: "0 0 45%", 
    maxWidth: "100%",
    height: "auto",
  },
  centeredTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1f73b7",
    textAlign: "center",
    marginBottom: "30px",
  },
  centeredSubtitle: {
    color: "#3498db",
    fontSize: "20px",
    textAlign: "center",
    marginBottom: "30px",
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
    width: "80%",     height: "auto",
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
  additionalTitle: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#1f73b7",
    textAlign: "center",
    marginTop: "40px",
    marginBottom: "30px",
  },
  additionalAdvantages: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginTop: "30px",
  },
  advantage: {
    width: "22%",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#fff",
    border: "1px solid #eaeaea",
    borderRadius: "8px",
    margin: "10px",
  },
  advantageImage: {
    width: "80%", // Adjusted width
    height: "auto",
    marginBottom: "20px",
  },
  advantageTitle: {
    fontSize: "20px", // Adjusted font size
    fontWeight: "bold",
    marginBottom: "10px",
  },
  advantageText: {
    fontSize: "18px", // Adjusted font size
    color: "#555",
  },
  newsletterSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: "50px",
    marginBottom: "50px",
    padding: "40px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
  },
  newsletterText: {
    marginBottom: "20px",
  },
  newsletterSignup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "400px",
  },
  inputField: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  signupButton: {
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
  },
  subscriptionMessage: {
    marginTop: "20px",
    color: "#28a745",
    fontSize: "16px",
    fontWeight: "bold",
  },
};

export default LandingPage;
