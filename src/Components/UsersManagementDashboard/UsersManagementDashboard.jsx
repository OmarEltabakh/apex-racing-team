import React, { useState } from 'react';
import style from './UsersManagementDashboard.module.css';
import DataTable from 'react-data-table-component';
import AddUsers from './AddUsers';
import { columns } from "./Columns.js";
import axios from 'axios';
import { useQuery } from 'react-query';
import ScrollToTop from '../ScrollToTop/ScrollToTop.jsx';
import LoadingScreen from '../LoadingScreen/LoadingScreen.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'; // Import SweetAlert2

// Secure token
const token = `accesstoken_${localStorage.getItem('token')}`;

// Function to fetch members data
const fetchMembers = async () => {
  try {
    const { data } = await axios.get('https://apexracingteam-eg.onrender.com/admins/all-members', { headers: { token } });
    return data;
  } catch (error) {
    throw new Error('Failed to fetch members data');
  }
};

export default function UsersManagementDashboard() {
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch members data using react-query
  const { data: membersData, isLoading, error, refetch } = useQuery('members', fetchMembers, {
    staleTime: Infinity, // Keep data fresh
    cacheTime: 3600000,   // Cache for 1 hour
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    enabled: !!token
  });

  // Function to delete a member
  const deleteMember = async (id) => {
    // Show SweetAlert2 confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this user. This action cannot be undone!',
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
        await axios.delete(
          `https://apexracingteam-eg.onrender.com/admins/delete-member/${id}`,
          { headers: { token } }
        );
        // Show success toast
        toast.success('User deleted successfully.', { position: "top-center" });
        refetch(); // Refresh the members list
      } catch (err) {
        console.error('Error deleting member:', err.message);
        // Show error toast
        toast.error('Failed to delete user.', { position: "top-center" });
      }
    }
  };

  // Filter data for searching
  const filteredData = React.useMemo(() => {
    return membersData?.data.filter((row) => {
      const fullName = `${row.firstName || ''} ${row.lastName || ''}`.trim();
      return (
        fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (row.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (row.role || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (row.teamId?.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (row.phone || '').includes(searchQuery)
      );
    });
  }, [membersData, searchQuery]);

  // Custom styles for the table
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
      <ScrollToTop />
      <AddUsers />
      <ToastContainer /> {/* ToastContainer for displaying toast notifications */}

      {isLoading ? <LoadingScreen /> : (
        <div className={`${style.UsersManagementDashboard} shadow-lg`}>
          <div className="d-flex justify-content-between align-items-center">
            {/* Search input */}
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={style.searchInput}
            />

            {/* Add User button */}
            <button
              data-bs-toggle="modal"
              data-bs-target="#modalAddUser"
              className={`${style.addUserButton}`}
            >
              <i className="fa-solid fa-user-plus pe-2"></i>
              Add User
            </button>
          </div>

          {/* Display loading, error, or data table */}
          {isLoading ? (
            <p>Loading members...</p>
          ) : error ? (
            <p>Error loading members: {error.message}</p>
          ) : (
            <DataTable
              className={`${style.dataTable}`}
              columns={columns({ deleteMember })}
              data={filteredData}
              pagination
              highlightOnHover
              customStyles={customStyles}
            />
          )}
        </div>
      )}
    </>
  );
}