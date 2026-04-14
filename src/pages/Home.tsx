import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

function Home() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#0C2340",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontFamily: "Times New Roman, serif",
      }}
    >
      <Navbar /> {/* Placed higher in the page */}

      <h1
        style={{
          color: "white",
          fontSize: "4rem",
          fontWeight: "800",
          marginBottom: "2rem",
        }}
      >
        Welcome Huskies
      </h1>

      <Link to="/signup">
        <button
          style={{
            padding: "1rem 2rem",
            fontWeight: "700",
            backgroundColor: "white",
            color: "#0C2340",
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
        >
          Sign Up
        </button>
      </Link>
    </div>
  );
}

export default Home;