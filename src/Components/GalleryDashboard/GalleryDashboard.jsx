import React, { useState, useMemo, useContext } from 'react';
import style from './GalleryDashboard.module.css';
import DataTable from 'react-data-table-component';
import AddGalleryImage from './AddGalleryImage';
import { galleryColumns } from './GalleryColumns';
import axios from 'axios';
import UpdateGalleryImage from './UpdateGalleryImage';
import { galleryContext } from '../../Context/GalleryContext';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import Swal from 'sweetalert2'; // Import SweetAlert2
import LoadingScreen from '../LoadingScreen/LoadingScreen';

// Secure token
const token = `accesstoken_${localStorage.getItem('token')}`;

export default function GalleryDashboard() {
  const { galleryData, isLoading, error, refetch } = useContext(galleryContext);

  // State management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItemId, setSelectedItemId] = useState(null);

  // Delete Gallery Item
  const deleteGalleryItem = async (id) => {
    console.log(id);

    // Show a confirmation dialog using SweetAlert2
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this image. This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    });

    // If the user confirms, proceed with deletion
    if (result.isConfirmed) {
      try {
        await axios.delete(`https://apexracingteam-eg.onrender.com/gallery/delete-gallery-item/${id}`, {
          headers: { token },
        });
        // Show success toast
        toast.success('Gallery item deleted successfully.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        refetch(); // Refetch data after deletion
      } catch (error) {
        console.error('Error deleting item:', error.message);
        // Show error toast
        toast.error('Failed to delete item.', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  // Filtered data based on search query
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

  // Custom styles for DataTable
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
      <ToastContainer />

      <AddGalleryImage refetch={refetch} />

      <UpdateGalleryImage refetch={refetch} galleryItemId={selectedItemId} galleryData={galleryData} />

      {isLoading ? <LoadingScreen /> :

        <section className={`${style.GalleryDashboard} shadow-lg`}>
          <div className={`${style.dashboardHeader}  `}>
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
      }
    </>
  );
}