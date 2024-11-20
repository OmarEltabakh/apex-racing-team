import React, { useLayoutEffect, useRef, useState } from 'react';
import style from "./Sponsers.module.css";
import { motion } from 'framer-motion';
import { sponsersData } from './SponsersData';
import SectionTitle from '../SectionTitle/SectionTitle';

export default function Sponsers() {
  // handle scroll carousel ===============================================>

  const carouselRef = useRef();
  const [width, setWidth] = useState(0);
  console.log(width);

  useLayoutEffect(() => {
    const updateWidth = () => {
      if (carouselRef.current) {
        setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
      }
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(carouselRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section className={`${style.Sponsers} d-flex flex-column justify-content-center`}>
      <SectionTitle title="Our Sponsers" />

      <div className={`${style.sponserContainer} rounded-1 py-5 w-100`}>
        <motion.div ref={carouselRef} whileTap={{ cursor: "grabbing" }} className={`${style.carousel}`}>
          <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className={`${style.innerCarousel}`}>
            {sponsersData.map((item, index) => (
              <motion.div key={index} className={`${style.item} px-4 `}>
                <img src={item.img} alt="sponser" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
