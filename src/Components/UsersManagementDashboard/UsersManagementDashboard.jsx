import React, { useContext, useState } from 'react';
import style from './UsersManagementDashboard.module.css';
import DataTable from 'react-data-table-component';
import AddUsers from './AddUsers';
import { columns } from "./Columns.js";
import axios from 'axios';
import { useQuery } from 'react-query';


const token = `accesstoken_${localStorage.getItem('token')}`;

const fetchMembers = async () => {
  try {
    const { data } = await axios.get('https://apexracingteam-eg.onrender.com/admins/all-members', { headers: { token } });
    return data;
  } catch (error) {
    throw new Error('Failed to fetch members data');
  }
};


export default function UsersManagementDashboard() {


  // state management================================================>
  const [searchQuery, setSearchQuery] = useState('');


  const { data: membersData, isLoading, error, refetch } = useQuery('members', fetchMembers, {
    staleTime: Infinity, // Keep data fresh
    cacheTime: 3600000,   // Cache for 1 hour
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    enabled: !!token
  });




  // Function to delete a member======================================>
  const deleteMember = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://apexracingteam-eg.onrender.com/admins/delete-member/${id}`,
        { headers: { token } }
      );
      alert('User deleted successfully.');
      refetch(); // Refresh the members list
    } catch (err) {
      console.error('Error deleting member:', err.message);
      alert('Failed to delete user.');
    }
  };


  // Filter data for searching =======================================>
  const filteredData = React.useMemo(() => {
    return membersData?.data.filter((row) => {
      const fullName = `${row.firstName || ''} ${row.lastName || ''}`.trim();
      return (
        fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (row.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (row.role || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
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
      <AddUsers />
      <div className={`${style.UsersManagementDashboard} shadow-lg`}>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={style.searchInput}
          />

          <button
            data-bs-toggle="modal"
            data-bs-target="#modalAddUser"
            className={`${style.addUserButton}`}
          >
            <i className="fa-solid fa-user-plus pe-2"></i>
            Add User
          </button>

        </div>

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
    </>
  );
}
