import React, { useState } from 'react';
import style from "./UsersManagementDashboard.module.css";
import DataTable from 'react-data-table-component';
import { columns } from './Columns';

export default function UsersManagementDashboard() {

  const [searchQuery, setSearchQuery] = useState('');


  const data = [
    { id: 1, name: 'Omar mohamed', email: 'Omar@gmail.com', role: 'Head', team: 'Cost And Manufacturing' },
    { id: 1, name: 'Omar', email: 'Omar.mohamed@gmail.com', role: 'Head', team: 'Cost And Manufacturing' },
    { id: 1, name: 'Omar', email: 'Omar@gmail.com', role: 'Head', team: 'Cost And Manufacturing' },
    { id: 1, name: 'Omar', email: 'Omar@gmail.com', role: 'Head', team: 'Cost And Manufacturing' },
    { id: 1, name: 'Omar', email: 'Omar@gmail.com', role: 'Head', team: 'Cost And Manufacturing' },
    { id: 1, name: 'Omar', email: 'Omar@gmail.com', role: 'Head', team: 'Cost And Manufacturing' },
    { id: 1, name: 'Omar', email: 'Omar@gmail.com', role: 'Head', team: 'Cost And Manufacturing' },
    { id: 1, name: 'Omar', email: 'Omar@gmail.com', role: 'Head', team: 'Cost And Manufacturing' },
    { id: 1, name: 'Omar', email: 'Omar@gmail.com', role: 'Head', team: 'Cost And Manufacturing' },
  ];



  // filter data
  const filteredData = data.filter(row => {
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

  return (
    <div className={`${style.UsersManagementDashboard} shadow-lg`}>

      <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={style.searchInput} />

      <DataTable className={`${style.dataTable}`}  columns={columns} data={filteredData} pagination highlightOnHover customStyles={customStyles} />
      
    </div>
  );
}
