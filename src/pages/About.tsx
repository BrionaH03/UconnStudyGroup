import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="h-screen w-screen bg-white flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-[#0C2340]">About Page</h1>
      <Link to="/">
        <button className="mt-6 px-5 py-2 bg-[#0C2340] text-white rounded">
          Go Back Home
        </button>
      </Link>
    </div>
  );
}

export default About;