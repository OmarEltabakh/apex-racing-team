import React, { useEffect, useState } from 'react'
import style from "./NavBar.module.css"
import logo from "../../Assets/logo.png"
import NavModal from '../NavModal/NavModal';
import { Link } from 'react-router-dom'


export default function NavBar() {

  // hooks====================================================================>
  const [scroll, setScroll] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const navItem = ["Home", "AboutUs", "Teams", "Gallary", "Dashboard"];


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

            <li onClick={() => setActiveLink(item)} key={index}><Link className={`${item === activeLink && `${style.activeLink}`}`} to={`${item === "Home" ? "/" : item}`}
            >{item}</Link></li>

          )}

        </ul>

        <i data-bs-toggle="modal" data-bs-target="#exampleModal" className={`${style.menu} fa-solid  fa-bars `}></i>

      </div>



    </nav>





  </>
}
