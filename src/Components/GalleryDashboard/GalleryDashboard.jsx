import React, { useState, useMemo, useContext } from 'react';
import style from './GalleryDashboard.module.css';
import DataTable from 'react-data-table-component';
import AddGalleryImage from './AddGalleryImage';
import { galleryColumns } from './GalleryColumns';
import axios from 'axios';
import UpdateGalleryImage from './UpdateGalleryImage';
import { galleryContext } from '../../Context/GalleryContext';



// Secure token
const token = `accesstoken_${localStorage.getItem('token')}`;



export default function GalleryDashboard() {


  const { galleryData, isLoading, error } = useContext(galleryContext);



  // State management=======================================================>
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);




  // Delete Gallery Item====================================================>
  const deleteGalleryItem = async (id) => {
    console.log(id);

    const confirmDelete = window.confirm('Are you sure you want to delete this image?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://apexracingteam-eg.onrender.com/gallery/delete-gallery-item/${id}`, {
        headers: { token },
      });
      alert('Gallery item deleted successfully.');
    } catch (error) {
      console.error('Error deleting item:', error.message);
      alert('Failed to delete item.');
    }
  };


  // Filtered data based on search query and search=========================>
  const filteredData = useMemo(() => {
    return galleryData?.filter((item) => {
      const title = item.title || '';
      const category = item.category || '';
      return (
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [galleryData, searchQuery]);



  // Custom styles for DataTable===========================================>
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
    <>
      <AddGalleryImage />

      <UpdateGalleryImage galleryItemId={selectedItemId} galleryData={galleryData} />

      <section className={`${style.GalleryDashboard} shadow-lg`}>
        <div className={`${style.dashboardHeader}`}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={style.searchInput}
          />
          <button
            data-bs-toggle="modal"
            data-bs-target="#modal1"
            className={`${style.addNewImageButton}`}
          >
            <i className="fa-solid fa-plus pe-2"></i>
            Add New Image
          </button>
        </div>

        {isLoading ? (
          <p>Loading gallery items...</p>
        ) : error ? (
          <p className={style.errorText}>{error.message || 'Failed to fetch gallery data.'}</p>
        ) : (
          <DataTable
            className={`${style.dataTable}`}
            columns={galleryColumns({ deleteGalleryItem, setSelectedItemId })}
            data={filteredData}
            pagination
            highlightOnHover
            customStyles={customStyles}
          />
        )}
      </section>

    </>
  );
}
