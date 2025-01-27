import { useLocation } from "react-router-dom";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import style from "./CompetitionDetails.module.css";
import CompetitionsDetailsData from "./CompetitionDetailsData";

export default function CompetitionDetails() {


  const location = useLocation();
  const { competitionId } = location.state;


  const competitionDetails = CompetitionsDetailsData.find(
    (item) => item.id === competitionId
  );



  return (
    <>
      <ScrollToTop />
      <section className={`${style.CompetitionDetails} d-flex align-items-center`}>
        <div className={`${style.CompetitionDetailsContainer} myContainer `}>
          {competitionDetails ? (
            <>
              <div className={`${style.competitionDetailsContent} `}>
                <h2>{competitionDetails.title}</h2>
                <p className="w-90">{competitionDetails.description}</p>
              </div>

              <div
                className={`${style.cometitionDetailsImage}  d-flex align-items-center justify-content-center`}
              >
                {competitionDetails.img && (
                  <img
                    className="w-100"
                    src={competitionDetails.img}
                    alt={competitionDetails.title}
                    loading="lazy"
                  />
                )}
              </div>
            </>
          ) : (
            <p>Competition details not found.</p>
          )}
        </div>
      </section>
    </>
  );
}
