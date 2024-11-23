import React, { useRef } from "react";
import style from "./AboutPage.module.css";

export default function VideoSection() {
    const videoRef = useRef(null);

    const handleModalClose = () => { if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } };

    return (
        <>
            <div className="modal fade" id="videoModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-fullscreen">
                    <div className="modal-content bg-transparent border-0">

                        <div className="modal-body p-0 d-flex justify-content-center align-items-center  ">
                            <div className={`${style.videoContainer} w-55 position-relative`}>
                                <i data-bs-dismiss="modal" onClick={handleModalClose} aria-label="Close" className={`${style.closeButton} fa-solid fa-xmark`}></i>
                                <video ref={videoRef} controls className={`w-100 `} poster="teamImage.webp">
                                    <source src="video.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
