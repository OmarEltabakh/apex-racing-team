import React, { useMemo, useState, useEffect } from 'react';
import style from "./NavBar.module.css";
import logo from "../../Assets/logo.webp";
import NavModal from '../NavModal/NavModal';
import { Link, NavLink } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

export default function NavBar() {
  const [role, setRole] = useState(null);

  // Decode the token and get the role
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
    
    }
  }, []);

  
  // Navigation items
  const navItems = useMemo(() => ["Home", "About Us", "Teams", "Gallery"], []);

  // handleLogout ==============================================================================>
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace('/');
  };

  // handle Navigation Links ===================================================================>
  const getNavLink = (item) => {
    switch (item) {
      case "Home":
        return "/";
      case "Dashboard":
        return "dashboardPage";
      case "About Us":
        return "AboutUs";
      default:
        return item;
    }
  };

  return (
    <>
      <NavModal />

      <nav className={`${style.NavBar} fixed-top shadow`}>
        <div className={`${style.navBarContainer} myContainer d-flex justify-content-between align-items-center py-1`}>
          {/* Logo */}
          <Link className={style.logo} to="/">
            <img className="w-90" src={logo} alt="Logo" />
          </Link>

          {/* Navigation Items */}
          <ul className={`${style.navUl} p-0 gap-5`}>
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink to={getNavLink(item)} className={({ isActive }) => (isActive ? style.activeLink : '')}>
                  {item}
                </NavLink>
              </li>
            ))}

            {/* Show Dashboard only for admin or super roles */}
            {role && (role === "admin" || role === "super") && (
              <li>
                <NavLink to={getNavLink("Dashboard")} className={({ isActive }) => (isActive ? style.activeLink : '')}>
                  Dashboard
                </NavLink>
              </li>
            )}

            {/* Show Logout button if token is available */}
            {role && (
              <li>
                <button onClick={handleLogout} className={style.logoutButton} aria-label="Logout">
                  Logout
                </button>
              </li>
            )}
          </ul>

          {/* Mobile Menu Icon */}
          <i data-bs-toggle="modal" data-bs-target="#exampleModal" className={`${style.menu} fa-solid fa-bars`} />
        </div>
      </nav>
    </>
  );
}
