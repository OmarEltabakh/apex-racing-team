import React from 'react'
import style from "./SubTeam.module.css"
import subTeamImage from "../../Assets/HomeImage.jpg"
import Memebers from '../Memebers/Memebers'

export default function SubTeam() {



  return <>

    <section className={`${style.SubTeam}`}>

      {/* subteamContainer */}
      <div className={`${style.subTeamContainer} myContainer  `}>

        {/* subTeamContent */}
        <div className={`${style.subTeamContent}  `}>

          <h2>VEHICLCLE  DYNAMICS</h2>
          <p>Lorem ipsum dolor sit amet consectetur. Cursus id mus feugiat purus risus nunc. Auctor pellentesque lectus nam faucibus est nisl. Aliquam integer gravida risus eu auctor. Ipsum hac elit proin quam. Elit amet eget dictum cursus imperdiet elementum. Et neque quis faucibus id.</p>

        </div>

        {/* subTeamImage */}
        <div className={`${style.subTeamImage} `}>

          <img src={subTeamImage} alt="" />

        </div>

      </div>

      <Memebers />
    </section>





  </>
}
