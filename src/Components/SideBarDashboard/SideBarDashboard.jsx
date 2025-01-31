import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import style from "./SideBarDashboard.module.css";

export default function SideBarDashboard() {

  const [sideBarToggle, setSideBarToggle] = useState('-17.5rem');
  const [isHovered, setIsHovered] = useState(false);

  const [isActive, setIsActive] = useState('Users Management');
  const toggleSideBar = () => {
    setSideBarToggle((prev) => (prev === '0' ? '-17.5rem' : '0'));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const menuItems = [
    { id: 1, icon: 'fa-user', text: 'Users Management', path: '' },
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
          <Link key={item.id} to={item.path}>
            <li onClick={() => setIsActive(item.text)} key={item.id} className={`${item.text === isActive && `${style.active}`} `}>
              <i className={`fa-solid ${item.icon} me-2`}></i>
              {item.text}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
