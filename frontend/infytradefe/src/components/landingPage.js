import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ui_customization from "../assests/ui_customization.jpeg";
import rtdata_analysis from "../assests/rtdata_analysis.jpeg";
import mlmodels from "../assests/mlmodels.jpeg";
import flexImage from "../assests/flex_image.jpeg";
import dynamicDashboards from "../assests/dynamic_dashboards.jpeg";
import traderRankings from "../assests/trader_rankings.jpeg";
import communityMarketplace from "../assests/community_marketplace.jpeg";
import invention from "../assests/invention.jpeg";

const LandingPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [subscriptionMessage, setSubscriptionMessage] = useState("");

  const navigate = useNavigate();

  const handleMarketplaceRedirect = () => {
    if (isLoggedIn) {
      navigate("/marketplace");
    } else {
      alert("Please log in first!");
      navigate("/signin");
    }
  };

  const handleNewsletterSignup = () => {
    setSubscriptionMessage("Subscribed successfully!");
    setTimeout(() => setSubscriptionMessage(""), 3000);
  };

  return (
    <>
      <div className="text-left p-4 m-2 max-w-screen mx-auto bg-gray-100 rounded-lg">
        <div className="flex flex-row h-screen max-w-screen">
          <div className="w-3/5 p-2 text-2xl m-4 mt-16">
            <p className="text-blue-500 text-2xl font-bold mb-5">Trade Smarter with InfyTrade</p>
            <h1 className="text-5xl font-bold mb-10 leading-tight">
              Trade, Analyze, Succeed and <span className="text-blue-500">Get Amazing Profit</span>
            </h1>
            <p className="text-base font-semibold text-gray-600 mb-10">
              Revolutionize your trading experience with our cutting-edge tools, real-time insights, and community-driven features.
            </p>
            <div className="flex justify-start gap-5">
              <button className="btn btn-primary text-white" onClick={handleMarketplaceRedirect}>
                Go to MarketPlace
              </button>
              <button className="btn btn-ghost bg-gray-100">See How it Works</button>
            </div>
          </div>
          <div className="w-3/5 overflow-hidden bg-transparent">
            <img src={flexImage} alt="FlexImage" className="w-full object-cover object-center" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-blue-700 text-center mb-10">
          Why choose InfyTrade?
        </h2>
        <h3 className="text-blue-500 text-xl text-center mb-10">
          Specially designed for stock market
        </h3>
        <div className="flex justify-around flex-wrap">
          <div className="w-1/3 m-5 p-5 border border-gray-300 rounded text-left">
            <img
              src={ui_customization}
              alt="UI Customization"
              className="w-4/5 h-auto mb-5"
            />
            <h4 className="text-xl font-bold mb-5">UI Customization</h4>
            <p className="text-lg text-gray-700">
              Easily personalize your trading interface with our intuitive
              drag-and-drop options, making it easy to create a layout that
              suits your needs.
            </p>
          </div>
          <div className="w-1/3 m-5 p-5 border border-gray-300 rounded text-left">
            <img
              src={rtdata_analysis}
              alt="Real-Time Data Analytics"
              className="w-4/5 h-auto mb-5"
            />
            <h4 className="text-xl font-bold mb-5">Real-Time Data Analytics</h4>
            <p className="text-lg text-gray-700">
              Leverage real-time data analytics with a variety of charts and
              plots to gain deeper insights into market trends and make informed
              trading decisions.
            </p>
          </div>
          <div className="w-1/3 m-5 p-5 border border-gray-300 rounded text-left">
            <img
              src={mlmodels}
              alt="Advanced ML Models"
              className="w-4/5 h-auto mb-5"
            />
            <h4 className="text-xl font-bold mb-5">Advanced ML Models</h4>
            <p className="text-lg text-gray-700">
              Access a library of predefined ML model templates tailored for
              stocks, forex, crypto, and futures & options, allowing you to
              apply advanced analytics effortlessly.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-blue-700 text-center mt-10 mb-10">
          Additional advantages from InfyTrade
        </h2>
        <div className="flex justify-between flex-wrap mt-10">
          <div className="w-1/4 text-center p-5 bg-white border border-gray-300 rounded m-2">
            <img
              src={dynamicDashboards}
              alt="Dynamic Dashboards"
              className="w-4/5 h-auto mb-5"
            />
            <h4 className="text-xl font-bold mb-5">Dynamic Dashboards</h4>
            <p className="text-lg text-gray-700">
              Create and share multiple dashboards, either publicly or
              privately, making it easy to track and analyze your trading
              performance.
            </p>
          </div>
          <div className="w-1/4 text-center p-5 bg-white border border-gray-300 rounded m-2">
            <img
              src={traderRankings}
              alt="Trader Rankings"
              className="w-4/5 h-auto mb-5"
            />
            <h4 className="text-xl font-bold mb-5">Trader Rankings</h4>
            <p className="text-lg text-gray-700">
              Learn from the best by viewing the rankings of top traders who
              have opted to share their portfolios publicly, and enhance your
              own trading skills.
            </p>
          </div>
          <div className="w-1/4 text-center p-5 bg-white border border-gray-300 rounded m-2">
            <img
              src={communityMarketplace}
              alt="Community and Marketplace"
              className="w-4/5 h-auto mb-5"
            />
            <h4 className="text-xl font-bold mb-5">
              Community and Marketplace
            </h4>
            <p className="text-lg text-gray-700">
              Join a vibrant community of traders, make connections, and access
              a marketplace filled with resources, tools, and insights.
            </p>
          </div>
          <div className="w-1/4 text-center p-5 bg-white border border-gray-300 rounded m-2">
            <img
              src={invention}
              alt="Invention"
              className="w-4/5 h-auto mb-5"
            />
            <h4 className="text-xl font-bold mb-5">Invention</h4>
            <p className="text-lg text-gray-700">
              InfyTrade is the result of the production, refinement, or
              development of the original invention. It is also continuous and
              continuously developing in a better direction.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center mt-10 mb-10 p-10 bg-gray-200 rounded">
          <div className="mb-5">
            <h2>Stay updated with our weekly newsletter</h2>
            <p>
              a collection of the hottest stock market news sent every week to
              your email
            </p>
          </div>
          <div className="flex flex-col items-center w-full max-w-xs">
            <input
              type="email"
              placeholder="Email address"
              className="w-full p-2 mb-2 border border-gray-400 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-2 border border-gray-400 rounded"
            />
            <button
              className="bg-blue-500 text-white border-none p-3 rounded cursor-pointer text-xl"
              onClick={handleNewsletterSignup}
            >
              Get Started
            </button>
          </div>
          {subscriptionMessage && (
            <div className="mt-5 text-green-600 text-lg font-bold">
              {subscriptionMessage}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LandingPage;
