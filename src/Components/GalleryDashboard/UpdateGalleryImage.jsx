import React, { useEffect, useState, useCallback, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useQuery } from 'react-query';
import style from './GalleryDashboard.module.css';
import { teamsContext } from '../../Context/TeamsContext';

const menuCategories = ['cars', 'competitions', 'events', 'teams', 'subTeams'];

// Fetch sub-teams data by team ID
const fetchSubTeamsByTeamId = async (teamId) => {
    try {
        const { data } = await axios.get(`https://apexracingteam-eg.onrender.com/subteams/teams/${teamId}`);
        return data?.data;
    } catch (error) {
        throw new Error('Failed to fetch sub-teams data');
    }
};

export default function UpdateGalleryImage({ galleryItemId, galleryData, refetch }) {

    const { teamsData } = useContext(teamsContext);

    // hooks===========================================================>
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [initialValues, setInitialValues] = useState({
        category: '',
        title: '',
        description: '',
        image: null,
        team: '',
        subTeam: '',
        priority: 1,
        isHighlighted: false,
        landingPageVisibility: false,
        gallerySectionVisibility: false,
    });
    const token = `accesstoken_${localStorage.getItem('token')}`;

    // Fetch sub-teams data based on selected team
    const { data: subTeamsData } = useQuery(
        ['subTeams', selectedTeamId],
        () => fetchSubTeamsByTeamId(selectedTeamId),
        {
            enabled: !!selectedTeamId, // Only fetch if selectedTeamId is set
            staleTime: Infinity,
            cacheTime: 3600000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            refetchInterval: false,
        }
    );

    // Fetch data when galleryItemId changes ==========================================
    useEffect(() => {
        if (galleryItemId) {
            const galleryItem = galleryData.find(item => item._id === galleryItemId);
            if (galleryItem) {
                setInitialValues({
                    category: galleryItem.category,
                    title: galleryItem.title,
                    description: galleryItem.description,
                    image: null, // Keep it null as you are updating the image
                    team: galleryItem.team,
                    subTeam: galleryItem.subTeam,
                    priority: galleryItem.priority,
                    isHighlighted: galleryItem.isHighlighted,
                    landingPageVisibility: galleryItem.landingPageVisibility,
                    gallerySectionVisibility: galleryItem.gallerySectionVisibility,
                });
                // Set the selected team ID based on the initial team value
                const selectedTeam = teamsData.find(team => team.title === galleryItem.team);
                if (selectedTeam) {
                    setSelectedTeamId(selectedTeam._id);
                }
            }
        }
    }, [galleryItemId, galleryData, teamsData]);

    // validationSchema================================================>
    const validationSchema = Yup.object({
        category: Yup.string().required('Category is required'),
        title: Yup.string().required('Title is required'),
        image: Yup.mixed()
            .required('Image is required')
            .test('fileSize', 'File size too large (max 2MB)', (value) => !value || value.size <= 2 * 1024 * 1024)
            .test('fileType', 'Unsupported file format', (value) =>
                !value || ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(value.type)
            ),
        team: Yup.string().required('Team is required'),
        subTeam: Yup.string().required('Sub-Team is required'),
    });

    // setup formik settings============================================>
    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true, // This ensures that Formik reinitializes when initialValues change
        onSubmit: useCallback(async (values, { resetForm }) => {
            setIsSubmitting(true);
            setSuccessMessage('');
            setErrorMessage('');

            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                formData.append(key, value);
            });

            try {
                const response = await axios.put(
                    `https://apexracingteam-eg.onrender.com/gallery/update-gallery-item/${galleryItemId}`,
                    formData,
                    {
                        headers: { token },
                    }
                );
                setSuccessMessage(response.data.message || 'Image updated successfully!');
                refetch()
                resetForm();
            } catch (error) {
                setErrorMessage(error.response?.data?.message || 'Failed to update image. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        }, [galleryItemId]),
    });

    // Handle team change
    const handleTeamChange = (e) => {
        const selectedTeam = teamsData.find(team => team.title === e.target.value);
        if (selectedTeam) {
            setSelectedTeamId(selectedTeam._id);
        }
        formik.handleChange(e);
    };

    return (
        <div className={`${style.updateImageModal} modal fade w-100`} id="modal2" tabIndex="-1" aria-labelledby="modal1Label" aria-hidden="true">
            <div className={`${style.modalDialog} modal-dialog`}>
                <div className="modal-content">
                    {/*modal header */}
                    <div className={`${style.modalHeader} modal-header`}>
                        <h1 className="modal-title fs-5" id="modal1Label">
                            Update Image
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    {/* modal body */}
                    <div className="modal-body">
                        {/* addImageForm */}
                        <form onSubmit={formik.handleSubmit} className={style.addImageForm}>
                            <div className={style.inputFiled}>
                                {/* row1 */}

                                <div className="d-flex justify-content-between gap-3 mb-3">

                                    <div className="w-100">

                                        <label htmlFor="category">
                                            <span className={`${style.redStar} me-1`}>*</span>Category:
                                        </label>

                                        <select
                                            id="category"
                                            name="category"
                                            value={formik.values.category}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`form-select ${formik.touched.category && formik.errors.category ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">Select a category</option>
                                            {menuCategories.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>

                                        {formik.touched.category && formik.errors.category && (
                                            <div className="alert alert-danger py-1 mt-1">{formik.errors.category}</div>
                                        )}
                                    </div>
                                    <div className="w-100">
                                        <label htmlFor="title"><span className={`${style.redStar} me-1`}>*</span>Title:</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={formik.values.title}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`form-control ${formik.touched.title && formik.errors.title ? 'is-invalid' : ''}`}
                                        />
                                        {formik.touched.title && formik.errors.title && (
                                            <div className="alert alert-danger py-1 mt-1">{formik.errors.title}</div>
                                        )}
                                    </div>
                                </div>

                                {/* row2 */}
                                <div className="d-flex justify-content-between gap-3 mb-3">

                                    <div className="w-100">
                                        <label htmlFor="team">
                                            <span className={`${style.redStar} me-1`}>*</span>Team:
                                        </label>
                                        <select
                                            id="team"
                                            name="team"
                                            value={formik.values.team}
                                            onChange={handleTeamChange}
                                            onBlur={formik.handleBlur}
                                            className={`form-select ${formik.touched.team && formik.errors.team ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">Select a team</option>
                                            {teamsData?.map((team) => (
                                                <option key={team._id} value={team.title}>
                                                    {team.title}
                                                </option>
                                            ))}
                                        </select>
                                        {formik.touched.team && formik.errors.team && (
                                            <div className="alert alert-danger py-1 mt-1">{formik.errors.team}</div>
                                        )}
                                    </div>

                                    <div className="w-100">
                                        <label htmlFor="subTeam">
                                            <span className={`${style.redStar} me-1`}>*</span>Sub-Team:
                                        </label>
                                        <select
                                            id="subTeam"
                                            name="subTeam"
                                            value={formik.values.subTeam}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`form-select ${formik.touched.subTeam && formik.errors.subTeam ? 'is-invalid' : ''}`}
                                        >
                                            <option value="">Select a sub-team</option>
                                            {subTeamsData?.map((subTeam) => (
                                                <option key={subTeam._id} value={subTeam.title}>
                                                    {subTeam.title}
                                                </option>
                                            ))}
                                        </select>
                                        {formik.touched.subTeam && formik.errors.subTeam && (
                                            <div className="alert alert-danger py-1 mt-1">{formik.errors.subTeam}</div>
                                        )}
                                    </div>

                                </div>

                                {/* row3 */}
                                <div className="d-flex justify-content-between gap-3 mb-3">
                                    <div className="w-100">
                                        <label htmlFor="image"><span className={`${style.redStar} ms-1`}>*</span> Image:</label>
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            onChange={(event) => formik.setFieldValue('image', event.target.files[0])}
                                            className={`form-control ${formik.touched.image && formik.errors.image ? 'is-invalid' : ''}`}
                                        />
                                        {formik.touched.image && formik.errors.image && (
                                            <div className="alert alert-danger py-1 mt-1">{formik.errors.image}</div>
                                        )}
                                    </div>
                                    <div className="w-100">
                                        <label htmlFor="description">Description:</label>
                                        <input
                                            type="text"
                                            id="description"
                                            name="description"
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                                        />
                                        {formik.touched.description && formik.errors.description && (
                                            <div className="alert alert-danger py-1 mt-1">{formik.errors.description}</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Boolean inputs */}
                            <div className="d-flex justify-content-between mb-3 flex-wrap">
                                {[{ name: 'isHighlighted', label: 'Is Highlighted' }, { name: 'landingPageVisibility', label: 'Landing Page Visibility' }, { name: 'gallerySectionVisibility', label: 'Gallery Section Visibility' }].map((field) => (
                                    <div className="d-flex align-items-center" key={field.name}>
                                        <label className="m-0" htmlFor={field.name}>{field.label}:</label>
                                        <input
                                            type="checkbox"
                                            id={field.name}
                                            name={field.name}
                                            checked={formik.values[field.name]}
                                            onChange={formik.handleChange}
                                            className="form-check-input ms-2 my-0 p-0"
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Priority input */}
                            <div className="mb-3">
                                <label htmlFor="priority">Priority:</label>
                                <input
                                    type="number"
                                    id="priority"
                                    name="priority"
                                    value={formik.values.priority}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`form-control ${formik.touched.priority && formik.errors.priority ? 'is-invalid' : ''}`}
                                />
                                {formik.touched.priority && formik.errors.priority && (
                                    <div className="alert alert-danger py-1 mt-1">{formik.errors.priority}</div>
                                )}
                            </div>

                            {/* Success and error messages */}
                            {successMessage && <div className="alert alert-success py-2 mt-2">{successMessage}</div>}
                            {errorMessage && <div className="alert alert-danger py-2 mt-2">{errorMessage}</div>}

                            {/* Submit button */}
                            <button
                                disabled={!(formik.dirty && formik.isValid) || isSubmitting}
                                className={`${isSubmitting ? style.isSubmittingStyle : ''}`}

                                type="submit">
                                {isSubmitting ? 'Updating...' : 'Update Image'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}