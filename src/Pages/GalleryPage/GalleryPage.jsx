import React, { useContext, useState } from "react";
import style from "./GalleryPage.module.css";
import logo from "../../Assets/GalleryLogo.webp";
import { galleryContext } from "../../Context/GalleryContext";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import Slider from "react-slick";
import { NextArrow, PrevArrow } from "../../Components/Memebers/CustomArrows";


const sideBarItems = [
    { name: "Teams", icon: " fa-user-group" },
    { name: "Events", icon: "fa-calendar-check" },
    { name: "Cars", icon: "fa-car" },
    { name: "Competitions", icon: "fa-trophy" },
    { name: "SubTeams", icon: "fa-users" },

]



// React Slick settings
export const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
   
};
export default function GalleryPage() {

    // handle state management==================================================>
    const { galleryData, isLoading } = useContext(galleryContext);
    const [sideBarToggle, setSideBarToggle] = useState("-17.5rem");
    const [currentCategory, setCurrentCategory] = useState("Teams");
    const [isActive, setIsActive] = useState("Teams")

    const toggleSideBar = () => {
        setSideBarToggle((prev) => (prev === "0" ? "-17.5rem" : "0"));
    };

    const filteredData = galleryData?.filter(
        (item) => item.category.toLowerCase() === currentCategory.toLowerCase()
    );





    return (
        <>
            <section className={`${style.galleryPage} `}>

                <div className={`${style.galleryPageContainer} myContainer     `}>


                    <div style={{ left: sideBarToggle }} className={`${style.gallerySideBar}  `}>

                        <div onClick={toggleSideBar} className={`${style.sideBarLogo}  `}>
                            <img className="w-100" src={logo} alt="logo" />
                        </div>

                        <ul className={`${style.sideBarMenu} `}>
                            {sideBarItems?.map((item, index) => (
                                <li key={index} className={`${style.teamLi} ${isActive === item.name && `${style.active}`} `}
                                    onClick={() => {
                                        setCurrentCategory(item.name.toLowerCase())
                                        setIsActive(item.name)
                                    }} >
                                    <i className={`${style.sliderIcon} fa-solid ${item.icon} me-2`}></i>
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    </div>



                    {/* galleryImages */}
                    {isLoading ? <LoadingScreen /> :
                        <>
                            {currentCategory !== "cars" &&
                                <div className={`${style.galleryImages} w-100   `}>
                                    {filteredData?.length > 0 ? (
                                        filteredData?.map((item, index) => <div key={index}>

                                            {item.category.toLowerCase() !== "cars" &&
                                                <div key={index} className={`${style.imgContainer} shadow  `}>
                                                    <img src={item.Image.secure_url} alt={item.title} />
                                                </div>
                                            }
                                        </div>)
                                    ) : (
                                        <h2 className=" min-vh-100">No items found for the selected category.</h2>
                                    )}
                                </div>

                            }


                            {currentCategory === "cars" && filteredData?.length > 0 ? (
                                <div className={`${style.carsContainer}    `}>

                                    <Slider {...settings}>
                                        {filteredData?.map((item, index) => (
                                            <div key={index} className={`${style.carDiv} mb-3`}>
                                                <img className="w-100" src={item.Image.secure_url} alt={item.title} />
                                            </div>
                                        ))}
                                    </Slider>

                                </div>

                            ) : ""}

                        </>
                    }
                </div>


            </section>
        </>
    );
}
