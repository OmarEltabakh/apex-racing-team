

import { NextArrow, PrevArrow } from "../Memebers/CustomArrows";
import logo1 from "../../Assets/SponsersLogo/logo1.webp"
import logo2 from "../../Assets/SponsersLogo/logo2.webp"
import logo3 from "../../Assets/SponsersLogo/logo3.webp"
import logo4 from "../../Assets/SponsersLogo/logo4.webp"

export const sponsorsLogos = [logo1, logo2, logo3, logo4]

export const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1000,
            settings: {
                slidesToShow: 3,
            },
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 400,
            settings: {
                slidesToShow: 1,
            },
        },
    ],

};
