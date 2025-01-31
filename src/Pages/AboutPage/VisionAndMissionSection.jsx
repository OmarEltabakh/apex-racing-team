import React from 'react';
import style from "./AboutPage.module.css"
import aboutPageImage from "../../Assets/AboutPageImage/aboutPageImage.svg"
export default function VisionAndMissionSection() {







    return <>

        <section className={`${style.visionAndMissionSection} `}>


            <div className={`${style.visionAndMissionSectionContainer} myContainer `}>

                <div className={`${style.contentContainer} `}>
                    <h2>
                        Mission And Vision
                    </h2>

                    <p>
                        By supporting Egypt’s Vision 2030, Apex Racing team aim to make a change in the world by manufacturing safe, efficient and drivable urban electric vehicles that can replace petroleum ones, and to increase the awareness about the importance of using the green energy.
                    </p>
                    <p>
                        Our mission is to foster the transfer of knowledge and awareness across generations while driving sustainable development to create a lasting, positive impact on our community and environment.
                    </p>

                </div>


                <div className={`${style.imageContainer} `}>
                    <img src={aboutPageImage} alt="" />
                </div>


            </div>



        </section>


    </>
}
