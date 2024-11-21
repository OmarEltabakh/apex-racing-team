import React, { useState } from 'react'
import style from "./NavModal.module.css"
import { Link } from 'react-router-dom';

export default function NavModal() {

  const navItem = ["Home", "AboutUs", "Teams", "Gallary", "Dashboard"];
  const [activeLink, setActiveLink] = useState("Home");

  return <>

    <div>


      <div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <div className='modal-dialog'>

          {/* modalContainer==============================================================> */}
          <div className={`${style.modalContainer} modal-content`}>

            <div className="modal-header d-flex justify-content-between">
              <h1 className="modal-title" id="exampleModalLabel">Navigation</h1>
              <i className={`${style.closeBtn} fa-solid fa-xmark cursorPointer`} data-bs-dismiss="modal" aria-label="Close"></i>
            </div>

            <div className="modal-body">
              {/* modalContainer(ul)========================================================> */}
              <ul className={`${style.modalUl}  m-0  `}>

                {navItem.map((item, index) =>

                  <li onClick={() => setActiveLink(item)} key={index}><Link className={`${item === activeLink && `${style.activeLink}`} ${item === "Home" && "pt-0"} `} to={`${item === "Home" ? "/" : item}`} >{item}</Link></li>

                )}

              </ul>
            </div>



          </div>

        </div>

      </div>

    </div>





  </>
}
