/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useContext } from 'react';
import style from './TeamsPage.module.css';
import { useNavigate } from 'react-router-dom';
import { teamsContext } from '../../Context/TeamsContext';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';
import ScrollToTop from '../../Components/ScrollToTop/ScrollToTop';


export default function TeamsPage() {


  const { isLoading, teamsData } = useContext(teamsContext);


  // state management=================================================>
  const navigate = useNavigate();

  // handle navigation================================================>
  const handleNavigating = (id) => {

    navigate(`SubTeamsPage`, { state: { id } });
  }

  return <>

    <ScrollToTop />
    {isLoading ? <LoadingScreen /> :

      <section className={`${style.teamsPage}`}>

        <div className={`${style.teamsPageContainer} myContainer`}>

          <h2>Our Teams</h2>

          <div className={`${style.cardsContainer} row w-100 mx-auto`}>
            {teamsData?.map((team) => (
              <div key={team._id} className="col-8 col-xl-3 col-lg-4 col-md-5 col-sm-6">
                <div className={`${style.card} shadow w-100 p-2 rounded-1 py-3 cursorPointer`}>
                  <div className="d-flex justify-content-center">
                    <img className='w-90  ' src={team.teamLogo?.secure_url} alt={`Image of ${team.name}`} loading="lazy" />
                  </div>
                  <p>
                    {team.description}
                  </p>


                  <button onClick={_ => handleNavigating(team._id)} className={`${style.cta} mt-3`}>

                    <span className={`${style.hoverUnderlineAnimation}`}>More Details</span>
                    <svg id="arrow-horizontal" xmlns="http://www.w3.org/2000/svg" width="30" height="10" viewBox="0 0 46 16">
                      <path id="Path_10" data-name="Path 10" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" transform="translate(30)"></path>
                    </svg>
                  </button>



                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    }
  </>
}
