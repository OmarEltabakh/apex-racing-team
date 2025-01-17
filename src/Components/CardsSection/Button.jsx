import React from 'react'
import style from "./CardsSection.module.css"
import { useNavigate } from 'react-router-dom'

export default function Button(props) {
    
    const { navigation, data, buttonId } = props;



    const navigate = useNavigate()

    const handleNavigation = () => {
        navigate(`/${navigation}`, { state: { data , buttonId} });

    };




    return <>
        <button id={`${buttonId}`} onClick={_ => handleNavigation(buttonId)} className={`${style.cta} mt-3`}>

            <span className={`${style.hoverUnderlineAnimation}`}>More Details</span>
            <svg id="arrow-horizontal" xmlns="http://www.w3.org/2000/svg" width="30" height="10" viewBox="0 0 46 16">
                <path id="Path_10" data-name="Path 10" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" transform="translate(30)"></path>
            </svg>
        </button>

    </>
}
