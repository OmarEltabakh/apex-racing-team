import React, { useState } from 'react';
import style from './UsersManagementDashboard.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

export default function AddUsers() {

    // hooks=================================================>
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Form field configuration================================>
    const formFields = [
        { name: 'email', type: 'email', label: 'User Email' },
    ];

    // Validation schema========================================>
    const validationSchema = Yup.object(
        formFields.reduce((schema, field) => {
            const baseSchema = Yup.string().required(`${field.label} is required`);
            return { ...schema, [field.name]: baseSchema };
        }, {})
    );

    // Submit function==========================================>
    const addUserSubmit = async (values) => {

        setIsSubmitting(true);
        setSuccess(''); // Clear any previous success messages
        setError('');

        try {
            const token = `accesstoken_` + localStorage.getItem('token');


            if (!token) {
                throw new Error('No authentication token found');
            }

            const { data } = await axios.post('https://apexracingteam-eg.onrender.com/admins/add-members', values, {

                headers: {
                    token
                },
            }
            );

            if (data) {
                setSuccess('User added successfully!');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Formik setup
    const formik = useFormik({
        initialValues: formFields.reduce((values, field) => ({ ...values, [field.name]: '' }), {}),
        validationSchema,
        onSubmit: addUserSubmit,
    });

    return (
        <div className="modal fade" id="newModal" tabIndex="-1" aria-labelledby="newModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className={`${style.usersModalHeader} modal-header`}>
                        <h1 className="modal-title fs-5" id="newModalLabel">Add New User</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">
                        <form onSubmit={formik.handleSubmit} className={`${style.addUsersForm}`}>
                            {formFields.map((field) => (
                                <div key={field.name} className="form-group">
                                    <label htmlFor={field.name}>{field.label}:</label>
                                    <input
                                        id={field.name}
                                        name={field.name}
                                        type={field.type}
                                        value={formik.values[field.name]}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className={`form-control ${formik.touched[field.name] && formik.errors[field.name] ? 'is-invalid' : ''}`}
                                        autoComplete="off"
                                    />
                                    {formik.touched[field.name] && formik.errors[field.name] && (
                                        <div className="alert alert-danger py-2 mt-2">{formik.errors[field.name]}</div>
                                    )}
                                </div>
                            ))}
                            {error && <div className="alert alert-danger py-2 mt-2">{error}</div>}
                            {success && <div className="alert alert-success py-2 mt-2">{success}</div>}

                            <button type="submit" disabled={!(formik.dirty && formik.isValid)}>
                                {isSubmitting ? 'Adding User...' : 'Add User'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
