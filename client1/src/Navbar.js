import Logo from "./img/Logo.png";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

import SignoutButton from "./components/SignoutButton";
import SignOutButton from "./components/SignoutButton";
import { useLocation, useNavigate } from "react-router";

function Navbar({ isLoggedIn, userType }) {
  // for Admin
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(true);

  const menuItems = [
    { label: "Dashboard", path: "/admin" },
    { label: "Manage Users", path: "/AllUsers" },
    { label: "Manage Freelancers", path: "/ManageFreelancers" },
    { label: "Manage Jobs", path: "/ManageJobs" },
    { label: "Moderate Chats", path: "/admin/moderation" },
    { label: "Announce", path: "/AdminAnnouncement" },
    { label: "Search History", path: "/admin/search-history" },
    { label: "Reports", path: "/Reports" },
    { label: "Settings", path: "/Settings" },
  ];

  // for Client, Freelancer and Guest Accounts
  const user = JSON.parse(localStorage.getItem("user"));
  const currentPath = window.location.pathname;

  const isActive = (path) => currentPath === path;
  return (
    <>
      <div className="d-flex align-items-center justify-content-spacebetween bg-white">
        <div className="d-flex align-items-center justify-content-spacearound w-100">
          {!isLoggedIn && (
            <>
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm w-100">
                <div className="container">
                  <a
                    className="navbar-brand fw-bold"
                    href="/"
                    style={{ width: "75px", height: "75px" }}
                  >
                    <img src={Logo} alt="lOGO" className="w-100" />
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>

                  <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <a
                          className={`text-decoration-none font-weight-bold nav-link ${
                            isActive("/") ? "active" : ""
                          }`}
                          href="/"
                        >
                          <i className="bi bi-house-door-fill me-1"></i>Home
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={`text-decoration-none font-weight-bold nav-link ${
                            isActive("/about") ? "active" : ""
                          }`}
                          href="/about"
                        >
                          <i className="bi bi-chat-dots-fill me-1"></i>About
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={`text-decoration-none font-weight-bold nav-link ${
                            isActive("/contact") ? "active" : ""
                          }`}
                          href="/contact"
                        >
                          <i className="bi bi-graph-up-arrow me-1"></i>Contact
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className={`text-decoration-none font-weight-bold nav-link ${
                            isActive("/chatbot") ? "active" : ""
                          }`}
                          href="/chatbot"
                        >
                          <i className="bi bi-robot me-1"></i>Chatbot
                        </a>
                      </li>

                      {/* Dropdown */}
                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="profileDropdown"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i class="bi bi-skip-start-btn-fill"></i>Let's Get
                          Started
                        </a>
                        <ul
                          className="dropdown-menu dropdown-menu-end"
                          aria-labelledby="profileDropdown"
                        >
                          <li>
                            <a className="dropdown-item" href="/login">
                              <i class="bi bi-door-open"></i>
                              Login
                            </a>
                          </li>
                          <li>
                            <a className="dropdown-item" href="/register">
                              <i class="bi bi-pencil-fill"></i>
                              Register
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </>
          )}

          {isLoggedIn === "true" &&
            (userType === "Client" || userType === "Freelancer") && (
              <>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm w-100">
                  <div className="container">
                    <a
                      className="navbar-brand fw-bold"
                      href="/"
                      style={{ width: "75px", height: "75px" }}
                    >
                      <img src={Logo} alt="lOGO" className="w-100" />
                    </a>
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#mainNavbar"
                      aria-controls="mainNavbar"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mainNavbar">
                      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                          <a
                            className={`text-decoration-none font-weight-bold nav-link ${
                              isActive("/") ? "active" : ""
                            }`}
                            href="/"
                          >
                            <i className="bi bi-house-door-fill me-1"></i>Home
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`text-decoration-none font-weight-bold nav-link ${
                              isActive("/messages") ? "active" : ""
                            }`}
                            href="/messages"
                          >
                            <i className="bi bi-chat-dots-fill me-1"></i>
                            Messages
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`text-decoration-none font-weight-bold nav-link ${
                              isActive("/activity") ? "active" : ""
                            }`}
                            href="/activity"
                          >
                            <i className="bi bi-graph-up-arrow me-1"></i>
                            Activity
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`text-decoration-none font-weight-bold nav-link ${
                              isActive("/chatbot") ? "active" : ""
                            }`}
                            href="/chatbot"
                          >
                            <i className="bi bi-robot me-1"></i>Chatbot
                          </a>
                        </li>
                        <li className="nav-item">
                          <a
                            className={`text-decoration-none font-weight-bold nav-link ${
                              isActive("/notifications") ? "active" : ""
                            }`}
                            href="/notifications"
                          >
                            <i className="bi bi-bell-fill me-1"></i>Notification
                          </a>
                        </li>
                        <li className="nav-item dropdown">
                          <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="profileDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="bi bi-person-circle me-1"></i>Profile
                          </a>
                          <ul
                            className="dropdown-menu dropdown-menu-end"
                            aria-labelledby="profileDropdown"
                          >
                            <li>
                              <a className="dropdown-item" href="/settings">
                                Settings
                              </a>
                            </li>
                            <li>
                              <a className="dropdown-item" href="/">
                                <SignOutButton />
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </>
            )}
        </div>
      </div>
      {isLoggedIn === "true" && userType === "Admin" && (
        <>
          <div className="bg-dark text-white position-sticky">
            <div className="d-md-none p-3 border-bottom">
              <Button
                variant="outline-light"
                onClick={() => setCollapsed(!collapsed)}
                className="w-100"
              >
                {collapsed ? "☰ Menu" : "✕ Close"}
              </Button>
            </div>

            <div
              className={`d-md-block ${
                collapsed ? "d-none" : "d-block"
              } p-3 w-25 bg-darks`}
              style={{ minHeight: "100vh", maxWidth: "250px" }}
            >
              <a
                className="navbar-brand fw-bold"
                href="/"
                style={{ width: "50px", height: "50px" }}
              >
                <img src={Logo} alt="lOGO" className="w-100" />
              </a>
              <ul className="nav nav-pills flex-column">
                {menuItems.map((item) => (
                  <li className="nav-item" key={item.path}>
                    <button
                      className={`nav-link text-start text-white w-100 ${
                        location.pathname === item.path
                          ? "active bg-primary"
                          : ""
                      }`}
                      onClick={() => {
                        navigate(item.path);
                        setCollapsed(true);
                      }}
                      style={{ border: "none", background: "none" }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
                <li className="mt-3">
                  <SignOutButton />
                </li>
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default Navbar;
