import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useQuery } from 'react-query';
import style from './GalleryDashboard.module.css';
import { teamsContext } from '../../Context/TeamsContext';

const menuCategories = ['cars', 'competitions', 'events', 'teams', 'subTeams'];


// Fetch sub-teams data by team ID
const fetchSubTeamsByTeamId = async (teamId) => {
    if (!teamId) return [];
    try {
        const { data } = await axios.get(`https://apexracingteam-eg.onrender.com/subteams/teams/${teamId}`);
        return data?.data || [];
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch sub-teams data');
    }
};

export default function AddGalleryImage({ refetch }) {
    const { teamsData } = useContext(teamsContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const token = localStorage.getItem('token'); // Securely handle token

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

    // Validation schema
    const validationSchema = Yup.object({
        category: Yup.string().required('Category is required'),
        title: Yup.string().required('Title is required'),
        image: Yup.mixed()
            .required('Image is required')
            .test('fileSize', 'File size too large (max 2MB)', (value) => value && value.size <= 2 * 1024 * 1024)
            .test('fileType', 'Unsupported file format', (value) =>
                value && ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(value.type)
            ),
        team: Yup.string().required('Team is required'),
        subTeam: Yup.string().required('Sub-Team is required'),
    });

    // Formik setup
    const formik = useFormik({
        initialValues: {
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
        },
        validationSchema,
        onSubmit: useCallback(async (values, { resetForm }) => {
            console.log(values);

            setIsSubmitting(true);
            setSuccessMessage('');
            setErrorMessage('');

            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (key === 'image') {
                    formData.append(key, value); // Append the file directly
                } else {
                    formData.append(key, value.toString()); // Ensure all values are strings
                }
            });

            try {
                const response = await axios.post(
                    'https://apexracingteam-eg.onrender.com/gallery/upload-gallery-item',
                    formData,
                    {
                        headers: {
                            'token': `accesstoken_${token}`,
                            'Content-Type': 'multipart/form-data', // Ensure correct content type
                        },
                    }
                );
                setSuccessMessage(response.data.message || 'Image uploaded successfully!');
                refetch()
                resetForm();
            } catch (error) {
                setErrorMessage(error.response?.data?.message || 'Failed to upload image. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        }, [token]),
    });

    // Handle team change
    const handleTeamChange = (e) => {
        const selectedTeam = teamsData?.find((team) => team.title === e.target.value);
        if (selectedTeam) {
            setSelectedTeamId(selectedTeam._id);
        }
        formik.handleChange(e);
    };

    // Clear messages when modal is closed
    useEffect(() => {
        const modal = document.getElementById('modal1');
        const clearMessages = () => {
            setSuccessMessage('');
            setErrorMessage('');
        };
        modal?.addEventListener('hidden.bs.modal', clearMessages);
        return () => modal?.removeEventListener('hidden.bs.modal', clearMessages);
    }, []);

    return (
        <div className={`${style.addImageModal} modal fade w-100`} id="modal1" tabIndex="-1" aria-labelledby="modal1Label" aria-hidden="true">
            <div className={`${style.modalDialog} modal-dialog`}>
                <div className="modal-content">
                    {/* Modal header */}
                    <div className={`${style.modalHeader} modal-header`}>
                        <h1 className="modal-title fs-5" id="modal1Label">Add New Image</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    {/* Modal body */}
                    <div className="modal-body">
                        {/* Add image form */}
                        <form onSubmit={formik.handleSubmit} className={style.addImageForm}>
                            <div className={style.inputFiled}>
                                {/* Row 1 */}
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
                                            aria-describedby="categoryError"
                                        >
                                            <option value="">Select a category</option>
                                            {menuCategories.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        {formik.touched.category && formik.errors.category && (
                                            <div id="categoryError" className="alert alert-danger py-1 mt-1">{formik.errors.category}</div>
                                        )}
                                    </div>

                                    <div className="w-100">
                                        <label htmlFor="title">
                                            <span className={`${style.redStar} me-1`}>*</span>Title:
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={formik.values.title}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            className={`form-control ${formik.touched.title && formik.errors.title ? 'is-invalid' : ''}`}
                                            aria-describedby="titleError"
                                        />
                                        {formik.touched.title && formik.errors.title && (
                                            <div id="titleError" className="alert alert-danger py-1 mt-1">{formik.errors.title}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Row 2 */}
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
                                            aria-describedby="teamError"
                                        >
                                            <option value="">Select a team</option>
                                            {teamsData?.map((team) => (
                                                <option key={team._id} value={team.title}>
                                                    {team.title}
                                                </option>
                                            ))}
                                        </select>
                                        {formik.touched.team && formik.errors.team && (
                                            <div id="teamError" className="alert alert-danger py-1 mt-1">{formik.errors.team}</div>
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
                                            aria-describedby="subTeamError"
                                        >
                                            <option value="">Select a sub-team</option>
                                            {subTeamsData?.map((subTeam) => (
                                                <option key={subTeam._id} value={subTeam.title}>
                                                    {subTeam.title}
                                                </option>
                                            ))}
                                        </select>
                                        {formik.touched.subTeam && formik.errors.subTeam && (
                                            <div id="subTeamError" className="alert alert-danger py-1 mt-1">{formik.errors.subTeam}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="d-flex justify-content-between gap-3 mb-3">
                                    <div className="w-100">
                                        <label htmlFor="image">
                                            <span className={`${style.redStar} ms-1`}>*</span>Image:
                                        </label>
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            onChange={(event) => formik.setFieldValue('image', event.target.files[0])}
                                            className={`form-control ${formik.touched.image && formik.errors.image ? 'is-invalid' : ''}`}
                                            aria-describedby="imageError"
                                        />
                                        {formik.touched.image && formik.errors.image && (
                                            <div id="imageError" className="alert alert-danger py-1 mt-1">{formik.errors.image}</div>
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
                                            aria-describedby="descriptionError"
                                        />
                                        {formik.touched.description && formik.errors.description && (
                                            <div id="descriptionError" className="alert alert-danger py-1 mt-1">{formik.errors.description}</div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Boolean inputs */}
                            <div className={` d-flex justify-content-between flex-wrap mb-3`}>
                                {[
                                    { name: 'isHighlighted', label: 'Is Highlighted' },
                                    { name: 'landingPageVisibility', label: 'Landing Page Visibility' },
                                    { name: 'gallerySectionVisibility', label: 'Gallery Section Visibility' },
                                ].map((field) => (
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
                                    aria-describedby="priorityError"
                                />
                                {formik.touched.priority && formik.errors.priority && (
                                    <div id="priorityError" className="alert alert-danger py-1 mt-1">{formik.errors.priority}</div>
                                )}
                            </div>

                            {/* Success and error messages */}
                            {successMessage && <div className="alert alert-success py-2 mt-2">{successMessage}</div>}
                            {errorMessage && <div className="alert alert-danger py-2 mt-2">{errorMessage}</div>}

                            {/* Submit button */}
                            <button type="submit"
                                disabled={!(formik.dirty && formik.isValid) || isSubmitting}
                                className={`${isSubmitting ? style.isSubmittingStyle : ''}`}
                            >
                                {isSubmitting ? 'Uploading...' : 'Add Image'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}