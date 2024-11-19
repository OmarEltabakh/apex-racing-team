import React, { useEffect, useState } from 'react'
import style from "./NavBar.module.css"
import logo from "../../Assets/logo.png"
import NavModal from '../NavModal/NavModal';

export default function NavBar() {

  // hooks====================================================================>
  const [scroll, setScroll] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const navItem = ["Home", "AboutUs", "Team Subdivision", "Competitions", "Gallary", "ContactUs"];

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

    <nav className={` ${style.NavBar} ${scroll && `${style.navBackground}`}   fixed-top  `}>

      <div className="myContainer  d-flex justify-content-between align-items-center  py-1  ">

        {/* logo==============================================================> */}
        <a className={`${style.logo}`} href="#Home">
          <img className='w-90' src={logo} alt="Logo" />
        </a>

        {/* navItem(ul)========================================================> */}
        <ul className={`${style.navUl}   p-0  gap-5 `}>

          {navItem.map((item, index) =>

            <li onClick={() => setActiveLink(item)} key={index}><a className={`${item === activeLink && `${style.activeLink}`}`} href={`#${item}`}>{item}</a></li>

          )}

        </ul>

        <i data-bs-toggle="modal" data-bs-target="#exampleModal" className={`${style.menu} fa-solid  fa-bars `}></i>

      </div>



    </nav>





  </>
}
