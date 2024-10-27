"use client";
import React from "react";

const LoaderModal: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-24 h-24 border-8 border-t-8 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoaderModal;
