import React, { useContext, useState } from "react";
import style from "./GalleryPage.module.css";
import logo from "../../Assets/GalleryLogo.webp";
import { galleryContext } from "../../Context/GalleryContext";
import LoadingScreen from "../../Components/LoadingScreen/LoadingScreen";
import Slider from "react-slick";
import settings from "./CarSliderSettings";

// sideBarItems================================================================>
const sideBarItems = [
    { name: "Teams", icon: "fa-user-group" },
    { name: "Events", icon: "fa-calendar-check" },
    { name: "Cars", icon: "fa-car" },
    { name: "Competitions", icon: "fa-trophy" },
    { name: "SubTeams", icon: "fa-users" },
];

export default function GalleryPage() {

    // Handle State Management==================================================>
    const { galleryData = [], isLoading } = useContext(galleryContext);
    const [sideBarToggle, setSideBarToggle] = useState("-17.5rem");
    const [currentCategory, setCurrentCategory] = useState("Teams");
    const [isActive, setIsActive] = useState("Teams");


    // handle toggleSideBar======================================================>
    const toggleSideBar = () => {
        setSideBarToggle((prev) => (prev === "0" ? "-17.5rem" : "0"));
    };

    // filteredData==============================================================>
    const filteredData = galleryData.filter(
        (item) => item.category.toLowerCase() === currentCategory.toLowerCase()
    );


    return (
        <section className={style.galleryPage}>
            <div className={`${style.galleryPageContainer} myContainer`}>


                {/* Sidebar */}
                <div className={style.gallerySideBar} style={{ left: sideBarToggle }}  >
                    <div onClick={toggleSideBar} className={style.sideBarLogo} >
                        <img className="w-100" src={logo} alt="Gallery Logo" loading="lazy" />
                    </div>
                    <ul className={style.sideBarMenu}>
                        {sideBarItems.map((item, index) => (
                            <li key={index} className={`${style.teamLi} ${isActive === item.name && style.active}`}
                                onClick={() => {
                                    setCurrentCategory(item.name.toLowerCase());
                                    setIsActive(item.name);
                                }} >

                                <i className={`${style.sliderIcon} fa-solid ${item.icon} me-2`} ></i>
                                {item.name}

                            </li>
                        ))}
                    </ul>
                </div>

                {/* Gallery Content */}
                {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <>
                        {filteredData.length > 0 ? (
                            currentCategory === "cars" ? (
                                <div className={`${style.carsContainer} `}>
                                    <Slider {...settings}>
                                        {filteredData.map((item, index) => (
                                            <div key={index} className={`${style.carDiv} mb-3`}>
                                                <img className="w-100" src={item?.Image?.secure_url || ""} alt={item?.title || "Car Image"} loading="lazy" />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            ) : (
                                <div className={`${style.galleryImages} w-100 `}>
                                    {filteredData.map((item, index) => (
                                        <div key={index} className={`${style.imgContainer} shadow`}  >
                                            <img src={item?.Image?.secure_url || ""} alt={item?.title || "Gallery Image"} loading="lazy" />
                                        </div>
                                    ))}
                                </div>
                            )
                        ) : (
                            <h2 className="min-vh-100 text-center  w-100"> No items found for the selected category.</h2>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
