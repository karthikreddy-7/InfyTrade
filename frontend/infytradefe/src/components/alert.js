import React, { useEffect } from "react";

const Alert = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const alertClasses = {
    success: "alert alert-success bg-green-100 text-black font-semibold",
    error: "alert alert-error bg-red-100  text-black font-semibold",
    info: "alert alert-info text-black font-semibold",
  };

  const iconPaths = {
    success: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    error:
      "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
    info: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  };

  return (
    <div
      className={`fixed bottom-8 left-4 flex items-center gap-2 p-4 w-[25vw] rounded shadow-lg ${alertClasses[type]}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={iconPaths[type]}
        />
      </svg>
      <span>{message}</span>
    </div>
  );
};

export default Alert;
