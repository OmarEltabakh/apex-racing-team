import React, { useEffect, useState } from 'react';
import style from "./UsersManagementDashboard.module.css";
import DataTable from 'react-data-table-component';
import { columns } from './Columns';
import AddUsers from './AddUsers';
import axios from 'axios';


export default function UsersManagementDashboard() {

  // hooks================================>
  const [searchQuery, setSearchQuery] = useState('');
  const [membersData, setMembersData] = useState("")

  const token = "accesstoken_" + localStorage.getItem("token")

  const getAllMembers = async () => {
    const { data } = await axios.get(`https://apexracingteam-eg.onrender.com/admins/all-members`, {
      headers: {
        token
      }
    })
    setMembersData(data);
    console.log(data);


  }


  useEffect(() => {
  }, [])



  // filter data
  const filteredData = [].filter(row => {
    return (
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.team.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });



  // columns name style
  const customStyles = {
    headRow: {
      style: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: '1.125rem',
      },
    },


  };

  return <>
    <AddUsers />
    <div className={`${style.UsersManagementDashboard} shadow-lg `}>

      <div className='d-flex justify-content-between align-items-center'>

        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={style.searchInput} />

        <button data-bs-toggle="modal" data-bs-target="#newModal" className={`${style.addUserButton}`}>
          <i className="fa-solid fa-user-plus pe-2 "></i>
          Add User
        </button>

      </div>


      <DataTable className={`${style.dataTable}`} columns={columns} data={filteredData} pagination highlightOnHover customStyles={customStyles} />

    </div>
  </>
}
