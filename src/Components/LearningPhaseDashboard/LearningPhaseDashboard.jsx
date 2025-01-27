import React, { useState } from 'react';
import { useQuery } from 'react-query';
import style from './LearningPhaseDashboard.module.css';
import DataTable from 'react-data-table-component';
import axios from 'axios';

import columns from "./learningPhaseColumns"
import AddVideo from './AddVideo';
const token = `accesstoken_${localStorage.getItem('token')}`;

const fetchVideos = async () => {
  const { data } = await axios.get('https://apexracingteam-eg.onrender.com/videos/educational', {
    headers: { token },
  });
  return data;
};

export default function LearningPhaseDashboard() {


  const [searchQuery, setSearchQuery] = useState('');

  const { data: videosData, isLoading, error, refetch } = useQuery('videos', fetchVideos, {
    staleTime: Infinity,
    cacheTime: 3600000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  console.log(videosData);


  const deleteVideo = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this video?');
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://apexracingteam-eg.onrender.com/admins/delete-video/${id}`,
        { headers: { token } }
      );
      alert('Video deleted successfully.');
      refetch(); // Refresh the video list
    } catch (err) {
      console.error('Error deleting video:', err.message);
      alert('Failed to delete video.');
    }
  };

  const filteredData = React.useMemo(() => {
    return videosData?.filter((row) => {
      return (
        row.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [videosData, searchQuery]);





  const customStyles = {
    headRow: {
      style: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '1.125rem',
      },
    },
  };

  return (

    <section className={style.LearningPhaseDashboard}>

      <AddVideo />
      <div className={`${style.learningPhaseDashboardHeader} d-flex justify-content-between align-items-center `}>
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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

      {isLoading ? (
        <p>Loading videos...</p>
      ) : error ? (
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
  );
}
