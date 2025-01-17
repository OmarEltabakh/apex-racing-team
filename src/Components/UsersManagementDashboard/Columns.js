
import style from "./UsersManagementDashboard.module.css";
export const columns = [
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
        cell: row => <span className={style.cell}>{row.name}</span>
    },
    {
        name: 'Email',
        selector: row => row.email,
        sortable: true,
        cell: row => <span className={`${style.emailCell}`}>{row.email}</span>
    },
    {
        name: 'Role',
        selector: row => row.role,
        sortable: true,
        cell: row => <span className={style.cell}>{row.role}</span>
    },

    {
        name: 'Actions',
        cell: row => (
            <div className={style.buttons}>
                <button className={style.deleteButton} >Delete</button>
                <button className={style.updateButton}>Update</button>
            </div>
        ),
        ignoreRowClick: true,
    },
    {
        name: 'Team',
        selector: row => row.team,
        sortable: true,
        cell: row => <span className={style.teamCell}>{row.team}</span>
    }
];