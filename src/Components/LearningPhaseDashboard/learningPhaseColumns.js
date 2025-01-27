import style from './LearningPhaseDashboard.module.css';

const learningPhaseColumns = ({ deleteVideo, updateVideo }) => [
    {
        name: 'Description',
        selector: (row) => row.description,
        sortable: true,
        cell: (row) => (
            <span className={style.descriptionCell}>
                {row.description}
            </span>
        ),
    },



    {
        name: 'Team',
        selector: (row) => row.createdAt,
        sortable: true,
        cell: (row) => (
            <span className={style.createdAtCell}>
                {row?.teamTitle}
            </span>
        ),
    },
    {
        name: 'SubTeam',
        selector: (row) => row.createdAt,
        sortable: true,
        cell: (row) => (
            <span className={style.createdAtCell}>
                {row?.subteamTitle}
            </span>
        ),
    },

    {
        name: 'createdAt',
        selector: (row) => row.createdAt,
        sortable: true,
        cell: (row) => (
            <span className={style.createdAtCell}>
                {new Date(row.createdAt).toLocaleDateString()}
            </span>
        ),
    },
    {
        name: 'Actions',
        cell: (row) => {
            return (
                <div className={style.actions}>
                    {/* <button onClick={() => updateVideo(row._id)} className={style.updateButton}>
            Update
          </button> */}
                    <button onClick={() => deleteVideo(row._id)} className={style.deleteButton}>
                        Delete
                    </button>
                </div>
            );
        },
        ignoreRowClick: true,
    },
];


export default learningPhaseColumns