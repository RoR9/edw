import React from "react";
import { LoaderCircle } from "lucide-react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex flex-col items-center">
        <LoaderCircle className="w-20 h-20 animate-spin text-white" />
        <span className="mt-4 text-xl text-white">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
