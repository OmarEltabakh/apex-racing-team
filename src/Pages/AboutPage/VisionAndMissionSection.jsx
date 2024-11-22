import React from 'react';
import style from "./AboutPage.module.css";
import { motion } from 'framer-motion';


export const motionSettings = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 1, ease: "easeInOut" },
};


const VisionAndMissionSection = () => {




    return <>

        <section className={`${style.visionAndMissionSection} overflow-hidden   `}>

            <div className={`${style.visionAndMissionContainer} myContainer d-flex justify-content-between `}>


                <motion.div
                    {...motionSettings}
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className={`${style.ourMission} rounded-2  shadow p-4 py-5 w-45 d-flex flex-column align-items-center`}>

                    <h2>Our Mission</h2>

                    <p> VISION
                        By supporting Egypt’s Vision 2030, Apex Racing team
                        aim to make a change in the world by manufacturing
                        safe, efficient and drivable urban electric vehicles
                        that can replace petroleum ones, and to increase the
                        awareness about the importance of using the green
                        energy.</p>


                </motion.div>

                <motion.div
                    {...motionSettings}
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className={`${style.ourVision}  rounded-2 shadow p-4 py-5 w-45 d-flex flex-column align-items-center`}>

                    <h2> Our Vision</h2>
                    <p> VISION
                        By supporting Egypt’s Vision 2030, Apex Racing team
                        aim to make a change in the world by manufacturing
                        safe, efficient and drivable urban electric vehicles
                        that can replace petroleum ones, and to increase the
                        awareness about the importance of using the green
                        energy.
                    </p>

                </motion.div>

            </div>

        </section>

    </>
}

export default VisionAndMissionSection
