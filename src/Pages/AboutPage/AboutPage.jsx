import React, { useContext, useMemo } from 'react';
import style from "./AboutPage.module.css";
import VideoSection from './VideoSection';
import VisionAndMissionSection from './VisionAndMissionSection';
import { galleryContext } from '../../Context/GalleryContext'
import ScrollToTop from '../../Components/ScrollToTop/ScrollToTop';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';



export default function AboutPage() {


    // get aboutPageImage data=========================>
    const { galleryData, isLoading } = useContext(galleryContext);


    // get aboutSection image ==============================================>
    const aboutSectionImage = useMemo(() => {
        return galleryData?.find(item => item.category === 'teams' && item.title === "aboutSectionImage")?.Image.secure_url || '';
    }, [galleryData]);




    return <>
        <ScrollToTop />
        {isLoading ? <LoadingScreen /> :
            <section className={`${style.aboutPage} `}>

                {/* aboutPagecontainer==================================================> */}
                <div className={`${style.aboutPageContainer} myContainer    `}>

                    {/* AboutPageContent================================================> */}
                    <div className={`${style.aboutPageContent}`}>


                        <h2>Who We Are !</h2>


                        <p >
                            We are an electric vehicle team that started in 2018 from students of the Higher Technological Institute, 10th of Ramadan. We participate in many competitions inside and outside Egypt We are an electric vehicle team that started in 2018 from students of the Higher Technological Institute, 10th of Ramadan. We participate in many competitions inside and outside Egypt
                        </p>

                        <button data-bs-toggle="modal" data-bs-target="#videoModal" className='shadow '>Watch a Video</button>

                    </div>

                    {/* AboutPageImage================================================> */}
                    <div className={`${style.aboutPageImage} d-flex justify-content-center`}>

                        <img className='w-100 ' src={aboutSectionImage} loading="lazy" alt="Apex_Racing_Team" />

                    </div>


                </div>

            </section >
        }

        <VideoSection />

        <VisionAndMissionSection />


    </>
}
