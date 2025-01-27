import React, { useContext } from 'react'
import style from "./AboutSection.module.css"
import { motion } from 'framer-motion'
import SectionTitle from '../SectionTitle/SectionTitle'
import { galleryContext } from '../../Context/GalleryContext'
import { useMemo } from 'react';

export default function AboutSection() {



  // get sectionImage data=================================================================>
  const { galleryData } = useContext(galleryContext);


  // get aboutSection image =================================================================>
  const aboutSectionImage = useMemo(() => {
    return galleryData?.find(item => item.category === 'teams' && item.title === "aboutSectionImage")?.Image.secure_url || '';
  }, [galleryData]);


  // motion settings ========================================================================>
  const motionSettings = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1, ease: "easeInOut" },
  };




  return <>

    <section id='AboutUs' className={`${style.AboutSection}  d-flex align-item-center  overflow-hidden `}>


      <div className={`${style.container} myContainer  `}>

        {/* aboutContent ==============================================> */}
        <div className={`${style.content}  `}>

          <div className={`${style.aboutSectionTitle}  `}>
            <SectionTitle title="About APEX" />
          </div>

          <motion.div
            {...motionSettings}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }} >

            <p >
              We are an electric vehicle team that started in
              2018 from students of the Higher Technological
              Institute, 10th of Ramadan. We participate in
              many competitions inside and outside Egypt
              We are an electric vehicle team that started in
              2018 from students of the Higher Technological
              Institute, 10th of Ramadan. We participate in
              many competitions inside and outside Egypt</p>

          </motion.div>
        </div>


        {/* aboutImage=================================================> */}
        <div className={`${style.aboutImage} `}>



          <motion.img
            {...motionSettings}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            className='w-95' src={aboutSectionImage} loading="lazy" alt="apex racing team" />


        </div>


      </div>


    </section>





  </>
}
