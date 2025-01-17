import React from 'react'
import Button from './Button'
import { motion } from 'framer-motion'
import { Tilt } from 'react-tilt'
import { defaultOptions } from './Tilt'
import { childVariants, devVariances } from "./CardsSectionAnimation"
import style from './CardsSection.module.css';
import SectionTitle from '../SectionTitle/SectionTitle'





export default function CardsSection(props) {
  
  const { data, sectionName, imgWidth, navigation } = props;








  return <>

    <section id={`${sectionName === "Our Teams" ? "Team-Subdivision" : sectionName}`} className={`${style.CardsSection} d-flex justify-content-center align-items-center overflow-hidden  `}>


      <div className={`${style.container} myContainer   `}>

        <SectionTitle title={sectionName} />

        <motion.div
          variants={devVariances}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          className={`${style.row} row w-100 m-auto   `}>

          {data?.map((item, index) => (
            <motion.div
              variants={childVariants}
              key={index}
              className="col-8 col-xl-3 col-lg-4 col-md-5 col-sm-6"
            >
              <Tilt options={defaultOptions}>
                <div className={`${style.card} shadow w-100 p-2 rounded-1 py-3 cursorPointer `}>

                  <div className='d-flex justify-content-center'>
                    <img className={imgWidth} src={item.img} alt="" />
                  </div>

                  <p className=' m-0 p-0 w-100'>{item.desc}</p>

                  <Button navigation={`${navigation}`} data={data} buttonId={item.id} />
                </div>
              </Tilt>
            </motion.div>
          ))}



        </motion.div>
      </div>
    </section >





  </>
}
