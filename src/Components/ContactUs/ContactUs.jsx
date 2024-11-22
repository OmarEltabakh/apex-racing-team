import React from 'react';
import style from "./ContactUs.module.css";
import SectionTitle from '../SectionTitle/SectionTitle';
import contactImage from "../../Assets/contactUs/send mail.svg"
import { motion } from 'framer-motion';

export default function ContactUs() {

  const motionSettings = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1, ease: "easeInOut", delay: .5 },
  };


  return <>

    <section id='ContactUs' className={`${style.ContactUs}  d-flex align-items-center overflow-hidden`}>

      <div className='w-100'>

        <SectionTitle title="ContactUs" />

        {/* contactUsContainer===============================================> */}
        <div className={`${style.contactUsContainer} myContainer   rounded-2 shadow `}>

          {/* formContainer===================================================> */}
          <div className={`${style.formContainer}  `}>
            <motion.form
              {...motionSettings}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              className='w-90'
              action="">

              <input className='form-control' type="text" placeholder='Name' />
              <input className='form-control mt-4' type="text" placeholder='Email' />
              <textarea className='form-control mt-4' placeholder='Message' rows='5'></textarea>

              <button className='shadow mt-4 '>Submit</button>

            </motion.form>
          </div>

          {/* contactImage===================================================> */}
          <div className={`${style.contactImage}   d-flex justify-content-center`}>

            <motion.img
              {...motionSettings}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              className='w-70' src={contactImage} alt="" />

          </div>

        </div>


      </div>

    </section>





  </>
}
