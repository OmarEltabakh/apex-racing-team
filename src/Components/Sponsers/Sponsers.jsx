import React, { useLayoutEffect, useRef, useState } from 'react';
import style from "./Sponsers.module.css";
import { motion } from 'framer-motion';
import { sponsersData } from './SponsersData';
import SectionTitle from '../SectionTitle/SectionTitle';

export default function Sponsers() {
  const carouselRef = useRef();
  const [width, setWidth] = useState(0);
  const [scrollX, setScrollX] = useState(0);

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

  // Handle left arrow click
  const handleLeftClick = () => {
    setScrollX((prev) => Math.min(prev + 200, 0));
  };

  // Handle right arrow click
  const handleRightClick = () => {
    setScrollX((prev) => Math.max(prev - 200, -width));
  };

  return (
    <section className={`${style.Sponsers} d-flex flex-column justify-content-center mb-5`}>
      <SectionTitle title="Our Sponsers" />

      <div className={`${style.sponserContainer} rounded-1 w-100 position-relative`}>
        {/* Left Arrow */}
        <button
          onClick={handleLeftClick}
          className={`${style.arrow} ${style.leftArrow}`}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>

        <motion.div
          ref={carouselRef}
          whileTap={{ cursor: "grabbing" }}
          className={`${style.carousel}`}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            animate={{ x: scrollX }}
            className={`${style.innerCarousel}`}
          >
            {sponsersData.map((item, index) => (
              <motion.div key={index} className={`${style.item} px-4`}>
                <img src={item.img} alt="sponser" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Arrow */}
        <button
          onClick={handleRightClick}
          className={`${style.arrow} ${style.rightArrow}`}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}
