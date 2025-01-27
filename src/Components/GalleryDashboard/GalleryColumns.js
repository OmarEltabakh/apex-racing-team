import style from './GalleryDashboard.module.css';

export const galleryColumns = ({ deleteGalleryItem, setSelectedItemId }) => [

  {
    name: 'Image',
    selector: (row) => row.Image?.secure_url,
    sortable: false,
    cell: (row) => (
      <div className={` ${style.galleryImageContainer}`}>
        <img
          src={row.Image?.secure_url}
          alt={row.title || 'Gallery Item'}
          className={style.galleryImagePreview}
          style={{ width: '100px', height: 'auto' }}
        />
      </div>
    ),
  },

  {
    name: 'Title',
    selector: (row) => row.title,
    sortable: true,
    cell: (row) => <span className={style.titleCell}>{row.title}</span>,
  },

  {
    name: 'Category',
    selector: (row) => row.category,
    sortable: true,
    cell: (row) => <span className={style.categoryCell}>{row.category}</span>,
  },
  
  {
    name: 'Actions',
    cell: (row) => (
      <div className={style.actionsContainer}>
        <button
          onClick={() => deleteGalleryItem(row._id)}
          className={style.deleteButton}
        >
          Delete
        </button>
        <button
          data-bs-toggle="modal"
          data-bs-target="#modal2"
          onClick={() => setSelectedItemId(row._id)} 
          className={style.updateButton}
        >
          Update
        </button>
      </div>
    ),
    ignoreRowClick: true,
  },
];
