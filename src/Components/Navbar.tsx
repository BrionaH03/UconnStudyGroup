import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "2rem",
        padding: "1rem",
        backgroundColor: "#0C2340",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        color: "white",
        fontFamily: "Times New Roman, serif",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Link style={{ color: "white", textDecoration: "none" }} to="/">Home</Link>

      {isAuthenticated && (
        <>
          <Link style={{ color: "white", textDecoration: "none" }} to="/courses">Courses</Link>
          <Link style={{ color: "white", textDecoration: "none" }} to="/professors">Professors</Link>
        </>
      )}

      {!isAuthenticated ? (
        <button
          onClick={() => loginWithRedirect()}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "white",
            color: "#0C2340",
            borderRadius: "0.3rem",
            cursor: "pointer",
            fontWeight: "700",
          }}
        >
          Log In
        </button>
      ) : (
        <>
          <span style={{ fontWeight: "700" }}>
            Welcome, {user?.name?.split(" ")[0]}
          </span>
          <button
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo: window.location.origin,
                },
              })
            }
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "white",
              color: "#0C2340",
              borderRadius: "0.3rem",
              cursor: "pointer",
              fontWeight: "700",
            }}
          >
            Log Out
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;