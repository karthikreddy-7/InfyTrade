import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ui_customization from "../assests/ui_customization.jpeg";
import rtdata_analysis from "../assests/rtdata_analysis.jpeg";
import mlmodels from "../assests/mlmodels.jpeg";
import flexImage from "../assests/flex_image.png";
import dynamicDashboards from "../assests/dynamic_dashboards.jpeg";
import traderRankings from "../assests/trader_rankings.jpeg";
import communityMarketplace from "../assests/community_marketplace.jpeg";
import invention from "../assests/invention.jpeg";
import Alert from "./alert";

const LandingPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  const navigate = useNavigate();

  const [alert, setAlert] = useState({ show: false, type: "", message: "" });

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
  };

  const handleAlertClose = () => {
    setAlert({ show: false, type: "", message: "" });
  };

  const handleMarketplaceRedirect = () => {
    if (isLoggedIn) {
      showAlert("success", "You're logged in, redirecting to marketplace !");
      setTimeout(() => navigate("/marketplace"), 2000);
    } else {
      showAlert("error", "Not LoggedIn, redirecting signIn !");
      setTimeout(() => navigate("/signin"), 1500);
    }
  };

  const handleNewsletterSignup = () => {
    setSubscriptionMessage("Subscribed successfully!");
    setTimeout(() => setSubscriptionMessage(""), 3000);
  };

  return (
    <>
      <div className="text-left p-2 max-w-screen mx-auto bg-white rounded-lg">
        <div className="flex flex-row mb-8 max-h-screen max-w-screen">
          <div className="w-3/5 p-2 text-2xl m-4 mt-16">
            <p className="text-blue-500 text-2xl font-bold mb-5">
              Trade Smarter with InfyTrade
            </p>
            <h1 className="text-5xl font-bold mb-10 leading-tight">
              Trade, Analyze, Succeed and{" "}
              <span className="text-blue-500">Get Amazing Profit</span>
            </h1>
            <p className="text-base font-semibold text-gray-600 mb-10">
              Revolutionize your trading experience with our cutting-edge tools,
              real-time insights, and community-driven features.
            </p>
            <div className="flex justify-start gap-5">
              <button
                className="btn btn-primary text-white"
                onClick={handleMarketplaceRedirect}
              >
                Go to MarketPlace
              </button>
              <button className="btn btn-ghost bg-gray-100">
                See How it Works
              </button>
            </div>
          </div>
          <div className="w-3/5 overflow-hidden bg-transparent">
            <img
              src={flexImage}
              alt="FlexImage"
              className="w-full object-cover object-center"
            />
          </div>
        </div>
        <div className="divider"></div>
        <h2 className="text-3xl font-bold leading-tight text-blue-600 text-center mb-10">
          Why choose InfyTrade?
        </h2>
        <h3 className=" text-2xl font-bold text-center mb-10">
          Specially designed for stock market
        </h3>
        <div className="flex justify-between flex-wrap rounded-md">
          <div className="w-1/3 p-2 h-[80vh] rounded-md">
            <div className="p-3 border border-gray-300 h-4/5 rounded text-left flex flex-col items-center">
              <img
                src={ui_customization}
                alt="UI Customization"
                className="w-4/5 h-auto "
              />
              <h4 className="text-lg font-bold m-3">UI Customization</h4>
              <p className="text-md text-gray-700 font-sans font-semibold">
                Easily personalize your trading interface with our intuitive
                drag-and-drop options, making it easy to create a layout that
                suits your needs.
              </p>
            </div>
          </div>
          <div className="w-1/3 p-2">
            <div className="p-3 border border-gray-300 h-4/5 rounded text-left flex flex-col items-center">
              <img
                src={rtdata_analysis}
                alt="Real-Time Data Analytics"
                className="w-4/5 h-auto mb-3"
              />
              <h4 className="text-lg font-bold mb-3">
                Real-Time Data Analytics
              </h4>
              <p className="text-md text-gray-700 font-sans font-semibold">
                Leverage real-time data analytics with a variety of charts and
                plots to gain deeper insights into market trends and make
                informed trading decisions.
              </p>
            </div>
          </div>
          <div className="w-1/3 p-2">
            <div className="p-3 border border-gray-300 h-4/5 rounded text-left flex flex-col items-center">
              <img
                src={mlmodels}
                alt="Advanced ML Models"
                className="w-4/5 h-auto mb-3"
              />
              <h4 className="text-lg font-bold mb-3">Advanced ML Models</h4>
              <p className="text-md text-gray-700 font-sans font-semibold">
                Access a library of predefined ML model templates tailored for
                stocks, forex, crypto, and futures & options, allowing you to
                apply advanced analytics effortlessly.
              </p>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <h2 className="text-3xl font-bold text-blue-600 text-center mt-10">
          Additional advantages from InfyTrade
        </h2>
        <div className="flex justify-between flex-wrap rounded-md mt-8 p-2 gap-3 ">
          <div className="w-[22vw] text-center p-4 bg-gray-100 border border-gray-300 rounded-md shadow-md">
            <img
              src={dynamicDashboards}
              alt="Dynamic Dashboards"
              className="w-4/5 h-auto mb-3 mx-auto rounded-md"
            />
            <h4 className="text-xl font-bold mb-3">Dynamic Dashboards</h4>
            <p className="text-base text-gray-700 ">
              Create and share multiple dashboards, either publicly or
              privately, making it easy to track and analyze your trading
              performance.
            </p>
          </div>
          <div className="w-[22vw] text-center p-4 bg-gray-100 border border-gray-300 rounded-md shadow-md">
            <img
              src={traderRankings}
              alt="Trader Rankings"
              className="w-4/5 h-auto mb-3 mx-auto rounded-md"
            />
            <h4 className="text-xl font-bold mb-3">Trader Rankings</h4>
            <p className="text-base text-gray-700 ">
              Learn from best by viewing the rankings of top traders who have
              opted to share their portfolios publicly, and enhance your trading
              skills.
            </p>
          </div>
          <div className="w-[22vw] text-center p-4 bg-gray-100 border border-gray-300 rounded-md shadow-md">
            <img
              src={communityMarketplace}
              alt="Community and Marketplace"
              className="w-4/5 h-auto mb-3 mx-auto rounded-md"
            />
            <h4 className="text-xl font-bold mb-3">
              Community and Marketplace
            </h4>
            <p className="text-base text-gray-700 ">
              Join a vibrant community of traders, make connections, and access
              a marketplace filled with resources, tools, and insights.
            </p>
          </div>
          <div className="w-[22vw] text-center p-4 bg-gray-100 border border-gray-300 rounded-md shadow-md">
            <img
              src={invention}
              alt="Invention"
              className="w-4/5 h-auto mb-3 mx-auto rounded-md"
            />
            <h4 className="text-xl font-bold mb-3">Invention</h4>
            <p className="text-base text-gray-700 ">
              InfyTrade is the result of the development of the original
              invention.continuous and continuously developing in a better
              direction.
            </p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center mt-10 h-[70vh]">
          <div className="w-1/2 ">
            <h2 className="font-bold text-3xl">Stay updated</h2>
            <h2 className="font-bold text-3xl mt-4">
              with our weekly newsletter
            </h2>
            <p className=" mt-4">
              A collection of the hottest stock market news sent every week to
              your email
            </p>
          </div>
          <div className="flex flex-col items-center w-full max-w-xs mt-16 gap-4">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" placeholder="Email" />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input type="text" className="grow" placeholder="Name" />
            </label>
            <button className="btn btn-primary btn-wide text-white mt-6">
              Get Notified
            </button>
          </div>
          {subscriptionMessage && (
            <div className="mt-5 text-green-600 text-lg font-bold">
              {subscriptionMessage}
            </div>
          )}
        </div>
      </div>
      {alert.show && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={handleAlertClose}
        />
      )}
    </>
  );
};

export default LandingPage;
