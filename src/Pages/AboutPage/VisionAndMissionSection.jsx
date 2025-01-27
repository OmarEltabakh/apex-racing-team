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
                        Apex Racing Team works to support Egypt’s Vision 2030 by building safe, efficient, and eco-friendly electric cars that can replace gasoline-powered vehicles. We also aim to spread awareness about the importance of using green energy.
                    </p>
                    <p>
                        Apex Racing Team supports Egypt’s Vision 2030 by creating safe, efficient, and practical electric cars that can replace gasoline-powered vehicles. We also aim to raise awareness about the importance of using green energy.
                    </p>

                </div>


                <div className={`${style.imageContainer} `}>
                    <img src={aboutPageImage} alt="" />
                </div>


            </div>



        </section>


    </>
}
