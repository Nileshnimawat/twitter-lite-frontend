import React from "react";

const Loader = ({ fullScreen = false }) => {
  const wrapperClasses = fullScreen
    ? "fixed inset-0 z-[9999] bg-black bg-opacity-60 flex items-center justify-center"
    : "flex justify-center items-center py-8";

  return (
    <div className={wrapperClasses}>
      <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
