import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import DataTable from 'react-data-table-component';
import style from './LearningPhaseDashboard.module.css';
import 'react-toastify/dist/ReactToastify.css';

import columns from './learningPhaseColumns';
import AddVideo from './AddVideo';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const fetchVideos = async () => {

  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token found');

  const { data } = await axios.get('https://apexracingteam-eg.onrender.com/videos/educational', {
    headers: { token: `accesstoken_${token}` },
  });
  return data;
};


export default function LearningPhaseDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showingVideos, setShowingVideos] = useState([]);

  const { data: videosData, isLoading, error, refetch } = useQuery('videos', fetchVideos, {
    staleTime: 60000, // 1 minute
    cacheTime: 3600000, // 1 hour
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {


      const decodedToken = jwtDecode(token);
      if (decodedToken.role === "super") {
        setShowingVideos(videosData);
      } else {

        const filteredVideos = videosData?.filter((video) => video.subteamId._id === decodedToken.subTeam);
        setShowingVideos(filteredVideos);

      }


    }
  }, [videosData]);

  const deleteVideo = useCallback(async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this video. This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`https://apexracingteam-eg.onrender.com/admins/delete-video/${id}`, {
          headers: { token: `accesstoken_${token}` },
        });
        toast.success('Video deleted successfully!');
        refetch();
      } catch (err) {
        console.error('Error deleting video:', err.message);
        toast.error('Failed to delete video.');
      }
    }
  }, [refetch]);

  const filteredData = useMemo(() => {
    return showingVideos?.filter((row) => {
      return (
        row.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [showingVideos, searchQuery]);

  const customStyles = {
    headRow: {
      style: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '1.125rem',
      },
    },
  };

  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {isLoading ? (
        <LoadingScreen />
      ) : (
        <section className={style.LearningPhaseDashboard}>
          <ScrollToTop />
          <AddVideo refetch = {refetch} />

          <div className={`${style.learningPhaseDashboardHeader} d-flex justify-content-between align-items-center`}>
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={style.searchInput}
            />
            <button
              data-bs-toggle="modal"
              data-bs-target="#modal3"
              className={`${style.addVideoButton}`}
            >
              <i className="fa-solid fa-user-plus pe-2"></i>
              Add video
            </button>
          </div>

          {error ? (
            <p>Error loading videos: {error.message}</p>
          ) : (
            <DataTable
              columns={columns({ deleteVideo })}
              data={filteredData}
              pagination
              highlightOnHover
              customStyles={customStyles}
            />
          )}
        </section>
      )}
    </>
  );
}