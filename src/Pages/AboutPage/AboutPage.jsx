import React from 'react';
import style from "./AboutPage.module.css";
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import teamImage from "../../Assets/aboutPage/teamImage.webp";
import VideoSection from './VideoSection';
import VisionAndMissionSection, { motionSettings } from './VisionAndMissionSection';
import { motion } from 'framer-motion';
import ScrollToTop from '../../Components/ScrollToTop/ScrollToTop';



export default function AboutPage() {


    return <>
        <ScrollToTop />
        <section className={`${style.aboutPage} d-flex align-items-center overflow-hidden `}>

            {/* aboutPagecontainer==================================================> */}
            <div className={`${style.aboutPageContainer} myContainer   `}>

                {/* AboutPageContent================================================> */}
                <motion.div
                    {...motionSettings}
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className={`${style.aboutPageContent}   `}>

                    <div className='d-flex '>
                        <SectionTitle title="Who We Are !" />
                    </div>

                    <p className='w-90'>
                        We are an electric vehicle team that started in 2018 from students of the Higher Technological Institute, 10th of Ramadan. We participate in many competitions inside and outside Egypt We are an electric vehicle team that started in 2018 from students of the Higher Technological Institute, 10th of Ramadan. We participate in many competitions inside and outside Egypt
                    </p>

                    <button data-bs-toggle="modal" data-bs-target="#videoModal" className='shadow mt-4'>Watch a Video</button>

                </motion.div>

                {/* AboutPageImage================================================> */}
                <motion.div
                    {...motionSettings}
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className={`${style.aboutPageImage}  d-flex justify-content-center`}>

                    <img className='w-100' src={teamImage} alt="" />

                </motion.div>


            </div>

        </section >

        <VideoSection />

        <VisionAndMissionSection />


    </>
}
