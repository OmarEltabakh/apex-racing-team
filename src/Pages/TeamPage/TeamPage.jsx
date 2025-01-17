import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import style from "./TeamPage.module.css";

import testImage from "../../Assets/HomeImage.jpg"
import ScrollToTop from '../../Components/ScrollToTop/ScrollToTop';

export default function TeamPage() {

    const location = useLocation();
    const { data, buttonId } = location.state;
    const teamData = data.filter((item) => item.id === buttonId)[0];


    const navigate = useNavigate();

    const handleNavigating = (navigation) => {
        navigate(`/${navigation}`)

    }




    return <>
        <ScrollToTop />


        <section className={`${style.section1}  `}>

            <div className={`${style.section1Container} myContainer `}>

                <div className={`${style.section1Content} `}>

                    <div style={{ backgroundColor: teamData?.ColorTone }} className={`${style.Section1VerticalLine}`}></div>

                    <h2>{teamData?.name}</h2>
                    <p className='w-95'>{teamData?.DescriptionInDepth}</p>


                </div>

                <div className={`${style.section1Image} `}>
                    <img src={teamData?.teamImage} alt="" />

                </div>

            </div>
        </section>






        <section className={`${style.section2}`}>

            <h2 >SubTeams</h2>

            <div className={`${style.section2Container} myContainer `}>

                <div style={{ backgroundColor: teamData?.ColorTone }} className={`${style.Section2VerticalLine}`} />

                {teamData?.subTeam.map((teamName, index) =>


                    <div key={index} className={`   ${style.subTeamCardContainer} ${index % 2 === 0 ? `` : 'justify-content-end'} ${index === 0 ? "" : "mt-5"} `}>

                        <div className={`  ${index % 2 === 0 ? style.circleContainerLeft : style.circleContainerRight}     `}>
                            <div style={{ border: `3px solid ${teamData?.ColorTone}` }} className={`${style.circle}`} />

                            <h6 className='mx-3'>{teamName}</h6>

                        </div>

                        <div style={{ borderBottom: `5px solid ${teamData?.ColorTone}` }} className={`${style.subTeamCard}  rounded-2 `}>

                            <div className={`${index % 2 === 0 ? style.triangleLeft : style.triangleRight}`} />

                            <div className={`${style.layerContainer}`}>

                                <div className={`${style.layer} d-flex justify-content-center align-items-center`}  >

                                    <div className='  px-3'>
                                        <h6 onClick={() => handleNavigating("learningPhase")}>Learing Phase</h6>
                                        <h6 onClick={() => handleNavigating("subteam")}>More Details</h6>
                                    </div>


                                </div>
                                <img className='w-100' src={testImage} alt="" />

                            </div>



                        </div>

                    </div>


                )}



            </div>



        </section>
    </>

}
