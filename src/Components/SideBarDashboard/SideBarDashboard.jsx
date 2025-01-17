import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from "./SideBarDashboard.module.css";

export default function SideBarDashboard() {

  const [sideBarToggle, setSideBarToggle] = useState('-20rem');
  const [isHovered, setIsHovered] = useState(false);

  const toggleSideBar = () => {
    setSideBarToggle((prev) => (prev === '0' ? '-20rem' : '0'));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const menuItems = [
    { id: 1, icon: 'fa-user', text: 'Users Management', path: 'usersManagementDashboard' },
    { id: 2, icon: 'fa-image', text: 'Gallery', path: 'GalleryDashboard' },
    { id: 3, icon: 'fa-book', text: 'Learning Phase', path: 'LearningPhaseDashboard' }
  ];

  return (
    <div style={{ left: sideBarToggle }} className={`${style.sideBar}`}>

      <div
        onClick={toggleSideBar}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${style.sideBarLogo}`}
      >
        <i className={`fa-solid fa-gear ${isHovered ? 'fa-spin' : ''}`}></i>
      </div>
      <ul className={`${style.sideBarMenu}`}>
        {menuItems.map(item => (
          <li key={item.id}>
            <i className={`fa-solid ${item.icon}`}></i>
            <Link to={item.path}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
