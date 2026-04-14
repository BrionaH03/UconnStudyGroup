import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { getProfile } from "../utils/getProfile";
import logo from "../assets/uconn-logo.png";

function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } = useAuth0();

  const [profileComplete, setProfileComplete] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  // 🔍 Check profile
  useEffect(() => {
    const checkProfile = async () => {
      if (!isAuthenticated || !user?.sub) {
        setProfileComplete(false);
        setCheckingProfile(false);
        return;
      }

      const profile = await getProfile(user.sub);
      setProfileComplete(profile?.profileComplete === true);
      setCheckingProfile(false);
    };

    if (!isLoading) {
      checkProfile();
    }
  }, [isAuthenticated, user, isLoading]);

  // 🔽 Close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "rgba(12, 35, 64, 0.95)",
        color: "white",
        fontFamily: "Times New Roman, serif",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      }}
    >
      {/* 🐺 LOGO + TITLE */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
        }}
      >
        <img
          src={logo}
          alt="UConn Logo"
          style={{
            width: "45px",
            height: "45px",
            objectFit: "contain",
          }}
        />

        <span
          style={{
            fontWeight: "800",
            fontSize: "1.4rem",
            color: "#FFD700",
          }}
        >
          UConn Study Group
        </span>
      </Link>

      {/* NAV LINKS */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.2rem",
          flexWrap: "wrap",
        }}
      >
        <Link style={{ color: "white", textDecoration: "none" }} to="/">
          Home
        </Link>

        {isAuthenticated && !checkingProfile && (
          <>
            {!profileComplete && (
              <Link style={{ color: "white", textDecoration: "none" }} to="/signup">
                Sign Up
              </Link>
            )}

            {profileComplete && (
              <>
                <Link style={{ color: "white", textDecoration: "none" }} to="/courses">
                  Courses
                </Link>
                <Link style={{ color: "white", textDecoration: "none" }} to="/professors">
                  Professors
                </Link>
                <Link style={{ color: "white", textDecoration: "none" }} to="/colleges">
                  Colleges
                </Link>
              </>
            )}
          </>
        )}

        {/* NOT LOGGED IN */}
        {!isAuthenticated ? (
          <>
            <button
              onClick={() => loginWithRedirect()}
              style={{
                padding: "0.65rem 1.2rem",
                backgroundColor: "white",
                color: "#0C2340",
                borderRadius: "0.6rem",
                cursor: "pointer",
                fontWeight: "700",
                border: "none",
              }}
            >
              Log In
            </button>

            <button
              onClick={() =>
                loginWithRedirect({
                  authorizationParams: {
                    screen_hint: "signup",
                  },
                })
              }
              style={{
                padding: "0.65rem 1.2rem",
                backgroundColor: "#FFD700",
                color: "#0C2340",
                borderRadius: "0.6rem",
                cursor: "pointer",
                fontWeight: "700",
                border: "none",
              }}
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            {checkingProfile ? (
              <span>Loading...</span>
            ) : profileComplete ? (
              <div style={{ position: "relative" }} ref={menuRef}>
                {/* 👤 PROFILE BUTTON */}
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "0.55rem 0.9rem",
                    backgroundColor: "white",
                    color: "#0C2340",
                    borderRadius: "0.6rem",
                    cursor: "pointer",
                    fontWeight: "700",
                    border: "none",
                  }}
                >
                  {/* GOLD CIRCLE */}
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      backgroundColor: "#FFD700",
                      color: "#0C2340",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "800",
                    }}
                  >
                    {user?.name?.charAt(0) || "U"}
                  </div>

                  <span>{user?.name?.split(" ")[0]} ▾</span>
                </button>

                {/* DROPDOWN */}
                {menuOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "110%",
                      right: 0,
                      backgroundColor: "white",
                      color: "#0C2340",
                      borderRadius: "0.75rem",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                      minWidth: "180px",
                    }}
                  >
                    {[
                      { label: "Profile", path: "/profile" },
                      { label: "Settings", path: "/settings" },
                      { label: "Joined Groups", path: "/joined-groups" },
                    ].map((item, index) => (
                      <Link
                        key={index}
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          display: "block",
                          padding: "0.9rem",
                          textDecoration: "none",
                          color: "#0C2340",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = "#f5f5f5")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "white")
                        }
                      >
                        {item.label}
                      </Link>
                    ))}

                    <button
                      onClick={() =>
                        logout({
                          logoutParams: {
                            returnTo: window.location.origin,
                          },
                        })
                      }
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "0.9rem",
                        border: "none",
                        backgroundColor: "white",
                        cursor: "pointer",
                        fontWeight: "700",
                      }}
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <span>Welcome, {user?.name?.split(" ")[0]}</span>
                <button onClick={() => logout()}>
                  Log Out
                </button>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;