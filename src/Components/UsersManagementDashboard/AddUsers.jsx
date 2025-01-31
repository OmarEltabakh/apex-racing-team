import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import style from './UsersManagementDashboard.module.css';
import { teamsContext } from '../../Context/TeamsContext';
import { useQuery } from 'react-query';

// Use environment variables for sensitive data
const API_URL = process.env.REACT_APP_API_URL || 'https://apexracingteam-eg.onrender.com';
const token = `accesstoken_${localStorage.getItem('token')}`;
const roles = ['admin', 'member']; // Define available roles

// Function to fetch subteams by team ID
const getSubteamsByTeamId = async (id) => {
    try {
        const { data } = await axios.get(`${API_URL}/subteams/teams/${id}`);
        return data?.data; // Return subteams data
    } catch (error) {
        throw new Error(`Failed to fetch subteams data: ${error.message}`);
    }
};

export default function AddUser() {
    // Context and state management
    const { teamsData } = useContext(teamsContext); // Access teams data from context
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission
    const [successMessage, setSuccessMessage] = useState(''); // Success message state
    const [errorMessage, setErrorMessage] = useState(''); // Error message state
    const [selectedTeamId, setSelectedTeamId] = useState(null); // Track selected team ID

    // Fetch subteams based on selected team ID
    const { data: subteams } = useQuery(
        ['subteams', selectedTeamId],
        () => getSubteamsByTeamId(selectedTeamId),
        {
            enabled: !!selectedTeamId, // Only fetch if selectedTeamId is set
            staleTime: Infinity, // Cache data indefinitely
            cacheTime: 3600000, // Cache time in milliseconds
            refetchOnWindowFocus: false, // Disable refetch on window focus
            refetchOnReconnect: false, // Disable refetch on reconnect
            refetchInterval: false, // Disable refetch intervals
        }
    );

    // Form validation schema using Yup
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        role: Yup.string().required('Role is required'),
        team: Yup.string().required('Team is required'),
        subTeam: Yup.string().required('Sub-Team is required'),
    });

    // Formik form configuration
    const formik = useFormik({
        initialValues: {
            email: '',
            role: '',
            team: '',
            subTeam: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setIsSubmitting(true); // Set loading state
            setSuccessMessage(''); // Clear previous success message
            setErrorMessage(''); // Clear previous error message

            try {
                // Find the selected team and subteam
                const matchedTeam = teamsData?.find((team) => team.title === values.team);
                const matchedSubTeam = subteams?.find((subTeam) => subTeam.title === values.subTeam);

                // Validate team and subteam selection
                if (!matchedTeam || !matchedSubTeam) {
                    setErrorMessage('Invalid team or sub-team selected.');
                    setIsSubmitting(false);
                    return;
                }

                // Extract team and subteam IDs
                const teamId = matchedTeam._id;
                const subTeamId = matchedSubTeam._id;

                // Send POST request to add user
                const response = await axios.post(
                    `${API_URL}/admins/add-members`,
                    {
                        email: values.email,
                        role: values.role,
                        teamId,
                        subTeamId,
                    },
                    {
                        headers: { token }, // Include authorization token
                    }
                );

                // Handle success
                setSuccessMessage(response.data.message || 'User added successfully!');
                resetForm(); // Reset form fields
            } catch (error) {
                // Handle error
                setErrorMessage(error.response?.data?.message || 'Failed to add user. Please try again.');
            } finally {
                setIsSubmitting(false); // Reset loading state
            }
        },
    });

    // Handle team selection change
    const handleTeamChange = (e) => {
        const selectedTeam = teamsData?.find((team) => team.title === e.target.value);
        if (selectedTeam) {
            setSelectedTeamId(selectedTeam._id); // Update selected team ID
        }
        formik.handleChange(e); // Update formik values
    };

    return (
        <div
            className={`${style.addUserModal} modal fade w-100`}
            id="modalAddUser"
            tabIndex="-1"
            aria-labelledby="modalAddUserLabel"
            aria-hidden="true" // Ensure this is managed properly by Bootstrap
        >
            <div className={`${style.modalDialog} modal-dialog`}>
                <div className="modal-content">
                    {/* Modal Header */}
                    <div className={`${style.modalHeader} modal-header`}>
                        <h2 className="modal-title fs-5" id="modalAddUserLabel">
                            Add New User
                        </h2>
                        {/* Close Button */}
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            // Ensure no aria-hidden is applied here
                        ></button>
                    </div>

                    {/* Modal Body */}
                    <div className="modal-body">
                        <form onSubmit={formik.handleSubmit} className={style.addUserForm}>
                            {/* Email Field */}
                            <div className="mb-3">
                                <label htmlFor="email">
                                    <span className={`${style.redStar} me-1`}></span>Email:
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="alert alert-danger py-1 mt-1">{formik.errors.email}</div>
                                )}
                            </div>

                            {/* Role Field */}
                            <div className="mb-3">
                                <label htmlFor="role">
                                    <span className={`${style.redStar} me-1`}></span>Role:
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formik.values.role}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`form-select ${formik.touched.role && formik.errors.role ? 'is-invalid' : ''}`}
                                >
                                    <option value="">Select a role</option>
                                    {roles.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.role && formik.errors.role && (
                                    <div className="alert alert-danger py-1 mt-1">{formik.errors.role}</div>
                                )}
                            </div>

                            {/* Team Field */}
                            <div className="mb-3">
                                <label htmlFor="team">
                                    <span className={`${style.redStar} me-1`}></span>Team:
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

                            {/* Sub-Team Field */}
                            <div className="mb-3">
                                <label htmlFor="subTeam">
                                    <span className={`${style.redStar} me-1`}></span>Sub-Team:
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
                                    {subteams?.map((subTeam) => (
                                        <option key={subTeam._id} value={subTeam.title}>
                                            {subTeam.title}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.subTeam && formik.errors.subTeam && (
                                    <div className="alert alert-danger py-1 mt-1">{formik.errors.subTeam}</div>
                                )}
                            </div>

                            {/* Success and Error Messages */}
                            {successMessage && <div className="alert alert-success py-2 mt-2">{successMessage}</div>}
                            {errorMessage && <div className="alert alert-danger py-2 mt-2">{errorMessage}</div>}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!(formik.dirty && formik.isValid) || isSubmitting}
                                className={`${isSubmitting ? style.isSubmittingStyle : ''}`}
                            >
                                {isSubmitting ? 'Adding User...' : 'Add User'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}