import React, { useState, useEffect, useCallback } from 'react';
import style from "./LearningPhase.module.css";
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import YouTube from 'react-youtube';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

// Fetch learning phase videos ==========================================>
const getLearningPhaseVideos = async (id, token) => {
  try {
    const { data } = await axios.get(`https://apexracingteam-eg.onrender.com/videos/subteam/${id}`, {
      headers: { token },
    });
    return data;
  } catch (error) {
    console.error('Failed to fetch learning phase videos:', error);
    throw error;
  }
};

export default function LearningPhase() {
  // State management ==================================================>
  const token = `accesstoken_${localStorage.getItem('token')}`;
  const [selectedVideo, setSelectedVideo] = useState(null);
  const location = useLocation();
  const id = location.state;

  // Fetch data using the useQuery hook =================================>
  const { data: learningPhaseData, isLoading, error } = useQuery(
    ['learningPhaseVideos', id, token],
    () => getLearningPhaseVideos(id, token),
    {
      staleTime: Infinity,
      cacheTime: 3600000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      select: (data) => data?.data || [],
    }
  );

  // Set the first video as the default selected video =================>
  useEffect(() => {
    if (learningPhaseData?.length > 0) {
      setSelectedVideo(learningPhaseData[0]?.url);
    }
  }, [learningPhaseData]);

  // Extract YouTube video ID from the URL =============================>
  const extractYouTubeId = useCallback((url) => {
    const match = url.match(/(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^&]+)/);
    return match ? match[1] : null;
  }, []);

  const youtubeVideoId = selectedVideo ? extractYouTubeId(selectedVideo) : null;

  console.log(error);


  return (
    <>
      {error ? (
        <section className={`${style.authorizeationSection}`}>
          <h2 className={`${style.authorizeationText} text-center text-danger `}>You are not authorized to access learning phase videos please check your subteam</h2>
        </section>
      ) : isLoading ? (
        <LoadingScreen />
      ) : (
        <section className={`${style.learningPhase}  `}>
          <ScrollToTop />
          <div className={`${style.learningPhaseContainer} myContainer  `}>
            {/* First Video */}
            <div className={`${style.firstVideo}   `}>
              {youtubeVideoId ? (
                <YouTube
                  videoId={youtubeVideoId}
                  opts={{  width: '100%' }}
                />
              ) : (
                <p>No video available</p>
              )}
            </div>

            {/* Video List */}
            <div className={`${style.videoList}  `}>
              {learningPhaseData?.length > 0 ? (
                <ul>
                  {learningPhaseData.map((video, index) => (
                    <li
                      key={index}
                      onClick={() => setSelectedVideo(video.url)}
                      className={`${style.videoItem} ${video.url === selectedVideo ? style.active : ''
                        }`}
                    >
                      <div className={style.videoDetails}>
                        <span className={style.videoNumber}>{index + 1}. </span>
                        <span>{video.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No videos available</p>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
