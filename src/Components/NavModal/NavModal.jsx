import React, { useState, useEffect } from 'react';
import style from './NavModal.module.css';
import { NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function NavModal() {
  const [role, setRole] = useState(null);
  const [activeLink, setActiveLink] = useState("Home");

  // Decode the token and get the role
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
    }
  }, []);

  // Navigation items
  const navItems = ["Home", "About Us", "Teams", "Gallery"];

  // Handle Logout ==============================================================================>
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace('/');
  };

  // Get Navigation Links =====================================================================>
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
    <div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className={`${style.modalContainer} modal-content`}>
            <div className="modal-header d-flex justify-content-between">
              <h1 className="modal-title" id="exampleModalLabel">Navigation</h1>
              <i className={`${style.closeBtn} fa-solid fa-xmark cursorPointer`} data-bs-dismiss="modal" aria-label="Close"></i>
            </div>

            <div className="modal-body">
              <ul className={`${style.modalUl} m-0`}>
                {navItems.map((item, index) => (
                  <li key={index} onClick={() => setActiveLink(item)}>
                    <NavLink
                      className={`${item === activeLink && style.activeLink} ${item === "Home" && "mt-0"}`}
                      to={getNavLink(item)}
                    >
                      {item}
                    </NavLink>
                  </li>
                ))}

                {/* Show Dashboard only for admin or super roles */}
                {role && (role === "admin" || role === "super") && (
                  <li>
                    <NavLink
                      className={`${"Dashboard" === activeLink && style.activeLink}`}
                      to={getNavLink("Dashboard")}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}

                {/* Show Logout button if token is available */}
                {role && (
                  <li className='text-center'>
                    <button onClick={handleLogout} className={style.logoutButton} aria-label="Logout">
                      Logout
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
