import React from "react";
import Navbar from "./navbar1"; // Adjust the path according to your project structure

const Marketplace = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold underline">Market Place Section!</h1>
        {/* Additional marketplace content goes here */}
      </div>
    </div>
  );
};

export default Marketplace;
