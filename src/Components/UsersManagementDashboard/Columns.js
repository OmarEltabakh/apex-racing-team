import style from './UsersManagementDashboard.module.css';

export const columns = ({ deleteMember }) => [
  {
    name: 'Name',
    selector: (row) => `${row.firstName} ${row.lastName}`,
    sortable: true,
    cell: (row) => (
      <span className={style.cell}>
        {`${row.firstName} ${row.lastName}`}
      </span>
    ),
  },
  {
    name: 'Email',
    selector: (row) => row.email,
    sortable: true,
    cell: (row) => (
      <span className={`${style.emailCell}`}>{row.email}</span>
    ),
  },
  {
    name: 'Role',
    selector: (row) => row.role,
    sortable: true,
    cell: (row) => (
      <span className={style.cell}>{row.role}</span>
    ),
  },
  {
    name: 'Phone',
    selector: (row) => row.phone,
    sortable: true,
    cell: (row) => (
      <span className={style.phoneCell}>{row.phone}</span>
    ),
  },
  {
    name: 'Team',
    selector: (row) => row,
    sortable: true,
    cell: (row) => (
      <span className={style.teamCell}>
        {row.teamId?.title || "_"}
      </span>
    ),
  },
  {
    name: 'SubTeam',
    selector: (row) => row,
    sortable: true,
    cell: (row) => (
      <span className={style.SubTeamCell}>
        {row.subTeamId?.title || "_"}
      </span>
    ),
  },

  // {
  //   name: 'Joined At',
  //   selector: (row) => row.joinedAt,
  //   sortable: true,
  //   cell: (row) => (
  //     <span className={style.joinedAtCell}>
  //       {new Date(row.joinedAt).toLocaleDateString()}
  //     </span>
  //   ),
  // },
  {
    name: 'Actions',
    cell: (row) => {
      return (
        <button onClick={() => deleteMember(row._id)} className={style.deleteButton}>
          Delete
        </button>
      );
    }
    ,
    ignoreRowClick: true,
  },
];
