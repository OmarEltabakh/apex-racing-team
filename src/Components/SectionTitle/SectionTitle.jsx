import React from 'react'
import style from "./SectionTitle.module.css"
import { motion } from 'framer-motion'


export default function SectionTitle(props) {

  const { title } = props;

  return <>

    <motion.h2
    className={`${style.title}`}
      viewport={{ once: true }}
      initial={{ opacity: 0, y: -100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeInOut", delay: 1 }}>

      {title}
    </motion.h2>





  </>
}
