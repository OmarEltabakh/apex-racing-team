import React from 'react';
import style from "./SubTeam.module.css";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import Memebers from '../Memebers/Memebers'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ScrollToTop from '../ScrollToTop/ScrollToTop';


const token = `accesstoken_${localStorage.getItem('token')}`;

// getSubTeamData =====================================================================>
const getSubTeamData = async (id) => {
  try {
    const { data } = await axios.get(`https://apexracingteam-eg.onrender.com/subteams/subteam/${id}`, {
      headers: { token },
    });
    return data;
  } catch (error) {
    console.error("Error fetching subteam data:", error);
    throw new Error("Failed to fetch subteam data");
  }
};

export default function SubTeam() {


  // handle state management============================================================>
  const location = useLocation();
  const subTeamId = location.state;



  // handle data by useing useQuery =====================================================>
  const { data: subTeamData, isLoading } = useQuery(['subTeamData', subTeamId], () => getSubTeamData(subTeamId),
    {
      staleTime: Infinity,
      cacheTime: 3600000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );





  return <>
    <ScrollToTop />
    {isLoading ? <LoadingScreen /> :
      <section className={`${style.SubTeam}  `}>

        <div className={`${style.subTeamContainer} myContainer   `}>

          <div className={`${style.subTeamContent} `}>
            <h2>{subTeamData?.data.title}</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. Cursus id mus feugiat purusljkjklj
              risus nunc. Auctor pellentesque lectus nam faucibus est nisl. Aliquam
              integer gravida risus eu auctor. Ipsum hac elit proin quam. Elit amet
              eget dictum cursus imperdiet elementum. Et neque quis faucibus id.
            </p>
          </div>

          <div className={`${style.subTeamImage} `}>
            <img src={subTeamData?.data?.images[0].secure_url} alt={subTeamData?.data.title} />
          </div>
        </div>

        <Memebers members={subTeamData?.data?.members} />
      </section>
    }

  </>
}
