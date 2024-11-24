import ScrollToTop from "../ScrollToTop/ScrollToTop";
import style from "./CompetitionDetails.module.css"
import { useLocation } from 'react-router-dom';

export default function CompetitionDetails() {

  const location = useLocation();
  const { data, buttonId } = location.state;



  const competitionDetailsData = data.filter((item) => item.id === buttonId)[0];




  return <>

    <section className={`${style.CompetitionDetails}  d-flex align-items-center `}>
      <ScrollToTop />
      <div className={`${style.CompetitionDetailsContainer} myContainer   `}>

        <div className={`${style.competitionDetailsContent}`}>

          <h2>{competitionDetailsData?.name}</h2>

          <p className="w-90">
            {competitionDetailsData?.DescriptionInDepth}
          </p>

        </div>

        <div className={`${style.cometitionDetailsImage}  d-flex align-items-center justify-content-center`}>

          <img className="w-100" src={`${competitionDetailsData?.carImage}`} alt="" />

        </div>


      </div>


    </section>





  </>
}
