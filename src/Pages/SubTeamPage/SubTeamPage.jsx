import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './SubTeamPage.module.css';
import ScrollToTop from '../../Components/ScrollToTop/ScrollToTop';
import LoadingScreen from '../../Components/LoadingScreen/LoadingScreen';

const token = localStorage.getItem("token");


// Fetch subteam data based on the ID==========================================>
const fetchTeamData = async (id) => {
  try {
    const { data } = await axios.get(`https://apexracingteam-eg.onrender.com/teams/team/${id}`);
    return data?.data;
  } catch (error) {
    throw new Error('Failed to fetch subteam data');
  }
};

export default function SubTeamPage() {

  // handle state managment=====================================================>
  const navigate = useNavigate();

  // get id from teamsPage =====================================================>
  const location = useLocation();
  const { id } = location.state;


  // Use React Query to fetch subteam data======================================>
  const { data: teamData, isLoading } = useQuery(['subteam', id], () => fetchTeamData(id),
    {
      staleTime: Infinity, // Keep data fresh
      cacheTime: 3600000,   // Cache for 1 hour
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
    }
  );





  let teamColor;
  if (teamData?.title === "Operation") {
    teamColor = "#af3221";
  } else if (teamData?.title === "Ever") {
    teamColor = "#559a01";
  } else if (teamData?.title === "Formula") {
    teamColor = "#8c1d2d";
  } else {
    teamColor = "#f6d331";
  }

  // Notification when not logged in================================================>
  const notifyNotLoggedIn = () => {
    toast.error("You need to be logged in to access the learning phase.", {
      position: "top-center",
      autoClose: 5000,
    });
  };



  const handleNavigation = (path, id) => {
    navigate(`/${path}`, { state: id });
  };

  return (
    <>
      <ToastContainer />
      <ScrollToTop />
      {/* section1 aboutTeam===========================================> */}
      {isLoading ? <LoadingScreen /> :
        <>
          <section className={`${style.section1} `}>
            <div className={`${style.section1Container} myContainer `}>
              <div className={`${style.section1Content}`}>
                <div style={{ backgroundColor: teamColor }} className={`${style.Section1VerticalLine}`} />
                <h2>{teamData?.title}</h2>
                <p>{teamData?.longDescription}</p>
              </div>
              <div className={`${style.section1Image}`}>
                <img src={teamData?.teamImage?.secure_url} alt={`${teamData?.title}_image`} loading='lazy' />
              </div>
            </div>
          </section>

          {/* section2 aboutSubTeam=========================================> */}
          <section className={`${style.section2} `}>
            <div className={`${style.section2Container} myContainer `}>
              <h2>SubTeams</h2>
              <div className={`${style.subteamContainer} `}>
                <div style={{ backgroundColor: teamColor }} className={`${style.Section2VerticalLine}`} />
                {teamData?.subteams.map((item, index) => (
                  <div key={index} className={` ${style.subTeamCardContainer} ${index % 2 === 0 ? '' : 'justify-content-end'} ${index === 0 ? '' : 'mt-5'}`}>
                    <div className={`${index % 2 === 0 ? style.circleContainerLeft : style.circleContainerRight}`}>
                      <div style={{ border: `3px solid ${teamColor}` }} className={`${style.circle}`} />
                      <h6 className="mx-3">{item.title}</h6>
                    </div>

                    <div style={{ borderBottom: `5px solid ${teamColor}` }} className={`  ${style.subTeamCard} rounded-2`}>
                      <div className={`${index % 2 === 0 ? style.triangleLeft : style.triangleRight}`} />
                      <div className={`${style.layerContainer}`}>
                        <div className={`${style.layer} d-flex justify-content-center align-items-center`}>
                          <div className="px-3 ">
                            <h6
                              onClick={() => {
                                if (token) {
                                  handleNavigation("learningPhase", item._id);
                                } else {
                                  notifyNotLoggedIn();
                                }
                              }}
                              style={{
                                cursor: token ? 'pointer' : 'not-allowed',
                                color: token ? 'white' : 'gray'
                              }}
                            >
                              Learning Phase
                            </h6>
                            <h6 className='' onClick={() => handleNavigation("subteam", item._id)}>More Details</h6>
                          </div>
                        </div>
                        <img className="w-100" src={item.images[0]?.secure_url} alt={''} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      }

    </>
  );
}
