import React, { useState } from 'react'
import style from "./NavModal.module.css"

export default function NavModal() {

  const navItem = ["Home", "AboutUs", "Team Subdivision", "Competitions", "Projects", "ContactUs"];
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

                  <li onClick={() => setActiveLink(item)} key={index}><a className={`${item === activeLink && `${style.activeLink}`} ${item === "Home" && "pt-0"} `} href={`#${item}`}>{item}</a></li>

                )}

              </ul>

            </div>



          </div>

        </div>

      </div>

    </div>





  </>
}
