import React from 'react'
import { motion } from 'framer-motion'
import { Tilt } from 'react-tilt'
import { defaultOptions } from './CompetitionsAnimation'
import { childVariants, devVariances } from "./CompetitionsAnimation"
import style from './Competitions.module.css';
import SectionTitle from '../SectionTitle/SectionTitle';
import { competitionsData } from "./CompetitionsData.js"
import { useNavigate } from 'react-router-dom'




export default function Competitions() {


    const navigate = useNavigate()

    // handle navigation ====================================================================>
    const handleNavigation = React.useCallback((path, competitionId) => {
        navigate(`/${path}`, { state: { competitionId } });
    }, [navigate]);







    return <>

        <section className={`${style.competitionsSection}`}>


            <div className={`${style.competitionsContainer} myContainer    `}>

                <SectionTitle title={"Competitions"} />

                <motion.div
                    variants={devVariances}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 1, ease: "easeInOut" }}
                    viewport={{ once: true }}
                    className={`${style.row} row w-100 m-auto   `}>

                    {competitionsData?.map((item) => (
                        <motion.div
                            variants={childVariants}
                            key={item.id}
                            className="col-8 col-xl-3 col-lg-4 col-md-5 col-sm-6"
                        >
                            <Tilt options={defaultOptions}>
                                <div className={`${style.card} shadow w-100 p-2 rounded-1 py-3 cursorPointer `}>

                                    <div className='d-flex justify-content-center'>
                                        <img className='img-fluid' src={item.img} alt={item.name} loading='lazy' />
                                    </div>

                                    <p className=' m-0 p-0 w-100'>{item.desc}</p>

                                    <button onClick={() => handleNavigation('CompetitionDetails', item.id)} className={`${style.cta} mt-3`}>

                                        <span className={`${style.hoverUnderlineAnimation}`}>More Details</span>
                                        <svg id="arrow-horizontal" xmlns="http://www.w3.org/2000/svg" width="30" height="10" viewBox="0 0 46 16">
                                            <path id="Path_10" data-name="Path 10" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" transform="translate(30)"></path>
                                        </svg>
                                    </button>
                                    
                                </div>
                            </Tilt>
                        </motion.div>
                    ))}



                </motion.div>
            </div>
        </section >





    </>
}