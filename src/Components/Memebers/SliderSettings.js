import { NextArrow, PrevArrow } from "./CustomArrows";

// React Slick settings
export const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
        {
            breakpoint: 1200,
            settings: {
                slidesToShow: 2,
            },
        },
        {
            breakpoint: 800,
            settings: {
                slidesToShow: 1,
            },
        },
    ],
};