import React from 'react'
import style from "./Footer.module.css"
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { motionSettings } from '../../Pages/AboutPage/VisionAndMissionSection'
import { getInTouchData, quickLinksData, socialMediaAccount } from './FooterData'


export default function Footer() {




  return <>

    <footer className='shadow-lg m-0 '>

      <motion.div
        {...motionSettings}
        initial={{ opacity: 0,  }}
        whileInView={{ opacity: 1 }}
        className={`${style.footerContainer}  myContainer`}>

        {/* get in Touch */}
        <div className={`${style.getInTouch}   `}>

          <h4>Get IN Touch</h4>
          {getInTouchData.map((item, index) => (
            <div key={index} className='d-flex  align-items-center mt-3'>
              <i className={`${item.icon} fa-solid  pe-3`}></i>
              <p>{item.disc}</p>
            </div>
          ))}

        </div>

        {/* Quick Links */}
        <div className={`${style.quickLinks} px-3`}>
          <h4 className='mb-3'>Quick Links</h4>

          {quickLinksData.map((item, index) => (
            <div key={index} className='d-flex align-items-center mt-2  '>
              <i className="fa-solid fa-chevron-right pe-2 "></i>
              <Link to={item === "Home" ? "/" : item} >{item}</Link>
            </div>
          ))}

        </div>

        {/* Social Media */}
        <div className={`${style.socialMedia} `}>
          <h4>Follow Us</h4>


          <div className='d-flex gap-3 mt-3'>
            {socialMediaAccount.map((item, index) => (
              <a key={index} href={item.url} className='' target='_blank' rel="noreferrer">
                <i className={`${item.icon} fa-brands d-flex justify-content-center align-items-center`}></i>
              </a>
            ))}

          </div>
        </div>




      </motion.div>



    </footer>





  </>
}
