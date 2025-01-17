import React, { useEffect, useState } from 'react'
import style from "./NavBar.module.css"
import logo from "../../Assets/logo.png"
import NavModal from '../NavModal/NavModal';
import { Link, NavLink } from 'react-router-dom'


export default function NavBar() {

  // hooks====================================================================>
  const [scroll, setScroll] = useState(false);
  const navItem = ["Home", "AboutUs", "Teams", "Gallery", "Dashboard"];


  // handleScroll ============================================================>
  useEffect(() => {

    const handleScroll = () => {

      if (window.scrollY > 200) {
        setScroll(true)
      }
      else {
        setScroll(false)
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [])


  return <>

    <NavModal />

    <nav className={` ${style.NavBar} ${scroll && `${style.navBackground}`}   fixed-top shadow  `}>

      <div className="myContainer  d-flex justify-content-between align-items-center  py-1  ">

        {/* logo==============================================================> */}
        <Link className={`${style.logo}`} to="/">
          <img className='w-90' src={logo} alt="Logo" />
        </Link>

        {/* navItem(ul)========================================================> */}
        <ul className={`${style.navUl}   p-0  gap-5 `}>

          {navItem.map((item, index) =>

            <li key={index}>
              <NavLink
                to={`${item === 'Home' ? '/' : item === "Dashboard" ? "dashboardPage" : item}`}
                className={({ isActive }) => (isActive ? `${style.activeLink}` : '')}
              >
                {item}
              </NavLink>
            </li>

          )}

        </ul>

        <i data-bs-toggle="modal" data-bs-target="#exampleModal" className={`${style.menu} fa-solid  fa-bars `}></i>

      </div>



    </nav>





  </>
}
