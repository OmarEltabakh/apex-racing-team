import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import style from './UsersManagementDashboard.module.css';
import { teamsContext } from '../../Context/TeamsContext';
import { SubTeamsContext } from '../../Context/SubTeamsContext';

const roles = ['admin', 'member'];

export default function AddUser() {


    // handle state management===============================================================>
    const { teamsData } = useContext(teamsContext);
    const { subteamData } = useContext(SubTeamsContext);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const token = `accesstoken_${localStorage.getItem('token')}`;



    // validationSchema=======================================================================>
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        role: Yup.string().required('Role is required'),
        team: Yup.string().required('Team is required'),
        subTeam: Yup.string().required('Sub-Team is required'),
    });

    // handle form submission=================================================================>
    const formik = useFormik({
        initialValues: {
            email: '',
            role: '',
            team: '',
            subTeam: '',
        },
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            setIsSubmitting(true);
            setSuccessMessage('');
            setErrorMessage('');


            try {
                const matchedTeam = teamsData.find((team) => team.title === values.team);
                const matchedSubTeam = subteamData?.data.find((subTeam) => subTeam.title === values.subTeam);

                if (!matchedTeam || !matchedSubTeam) {
                    setErrorMessage('Invalid team or sub-team selected.');
                    setIsSubmitting(false);
                    return;
                }

                const teamId = matchedTeam._id;
                const subTeamId = matchedSubTeam._id;



                const response = await axios.post(
                    'https://apexracingteam-eg.onrender.com/admins/add-members',
                    {
                        email: values.email,
                        role: values.role,
                        teamId,
                        subTeamId,
                    },
                    {
                        headers: { token },
                    }
                );

                setSuccessMessage(response.data.message || 'User added successfully!');
                resetForm();
            } catch (error) {
                setErrorMessage(error.response?.data?.message || 'Failed to add user. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        },
    });


    return (
        <div className="modal fade w-100" id="modalAddUser" tabIndex="-1" aria-labelledby="modalAddUserLabel" aria-hidden="true">
            <div className={`${style.modalDialog} modal-dialog`}>
                <div className="modal-content">
                    <div className={`${style.modalHeader} modal-header`}>
                        <h1 className="modal-title fs-5" id="modalAddUserLabel">Add New User</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={formik.handleSubmit} className={style.addUserForm}>
                            <div className={style.inputField}>
                                <div className="mb-3">
                                    <label htmlFor="email">
                                        <span className={`${style.redStar} me-1`}>*</span>Email:
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
                                <div className="mb-3">
                                    <label htmlFor="role">
                                        <span className={`${style.redStar} me-1`}>*</span>Role:
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
                                <div className="mb-3">
                                    <label htmlFor="team">
                                        <span className={`${style.redStar} me-1`}>*</span>Team:
                                    </label>
                                    <select
                                        id="team"
                                        name="team"
                                        value={formik.values.team}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`form-select ${formik.touched.team && formik.errors.team ? 'is-invalid' : ''}`}
                                    >
                                        <option value="">Select a team</option>
                                        {['Operation', 'Shell', 'Ever', 'Formula'].map((team) => (
                                            <option key={team} value={team}>
                                                {team}
                                            </option>
                                        ))}
                                    </select>
                                    {formik.touched.team && formik.errors.team && (
                                        <div className="alert alert-danger py-1 mt-1">{formik.errors.team}</div>
                                    )}
                                </div>
                                <div className="mb-3">
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
                                        {subteamData?.data.map((subTeam) => (
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
                            {successMessage && <div className="alert alert-success py-2 mt-2">{successMessage}</div>}
                            {errorMessage && <div className="alert alert-danger py-2 mt-2">{errorMessage}</div>}
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Adding User...' : 'Add User'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
