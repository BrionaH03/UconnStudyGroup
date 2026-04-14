import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

function Colleges() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0C2340",
        textAlign: "center",
        paddingTop: "100px",
        fontFamily: "Times New Roman, serif",
        color: "white",
      }}
    >   <Navbar />
      <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>
        UConn Colleges
      </h1>

      <p>School of Engineering</p>
      <p>School of Business</p>
      <p>College of Liberal Arts and Sciences</p>

      <br />

      <Link to="/">
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
          Back Home
        </button>
      </Link>
    </div>
  );
}

export default Colleges;