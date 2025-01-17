import React, { useState } from "react";
import style from "./GalleryPage.module.css";
import logo from "../../Assets/GalleryLogo.png";

import img from "../../Assets/HomeImage.jpg"

export default function GalleryPage() {
    const [sideBarToggle, setSideBarToggle] = useState("-17.5rem");

    const toggleSideBar = () => {
        setSideBarToggle((prev) => (prev === "0" ? "-17.5rem" : "0"));
    };

    return (
        <>
            <section className={`${style.galleryPage}`}>
                {/* galleryPageContainer */}

                <div className={`${style.galleryPageContainer} myContainer `}>

                    {/* gallerySideBar */}
                    <div style={{ left: sideBarToggle }} className={`${style.gallerySideBar} `}>

                        <div onClick={toggleSideBar} className={`${style.sideBarLogo} `}>
                            <img className="w-100" src={logo} alt="logo" />
                        </div>

                        <ul className={`${style.sideBarMenu} `}>
                            <li className={`${style.teamLi}`}><a href="/">Team</a></li>
                            <li><a href="/">Cars</a></li>
                            <li><a href="/">Competions</a></li>
                        </ul>

                    </div>



                    {/* galleryImages */}
                    <div className={`${style.galleryImages}  `}>
                        {[1, 2, 3, 4, 5].map((_, index) =>

                            <div key={index} className={`${style.imgContainer} `}>
                                <img src={img} alt="" />
                            </div>
                        )}

                    </div>
                </div>
            </section>
        </>
    );
}
