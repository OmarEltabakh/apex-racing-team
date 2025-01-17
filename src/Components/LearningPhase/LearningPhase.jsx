import React from 'react'
import style from "./LearningPhase.module.css"
import VideoList from './VideoList'


export default function LearningPhase() {



  return <>

    <section className={`${style.learningPhase}`}>

      {/* learningPhaseContainer */}
      <div className={`${style.learningPhaseContainer} myContainer  `}>

        {/* videoContainer */}
        <div className={`${style.videoContainer}  `}>

          <video muted controls  >
            <source src="video.mp4" type="video/mp4" />
          </video>

        </div>

        {/* videoList */}
        <VideoList />

      </div>


    </section>





  </>
}
