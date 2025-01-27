import React, { useState } from 'react';
import style from './SignUp.module.css';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

export default function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),

    image: Yup.mixed()
      .required('Image is required')
      .test('fileSize', 'File size too large (max 2MB)', (value) => !value || value.size <= 2 * 1024 * 1024)
      .test('fileType', 'Unsupported file format', (value) =>
        !value || ['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(value.type)
      ),

  });

  const signUpSubmit = async (values) => {
    setIsSubmitting(true);
    setSuccess('');
    setError('');
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    try {
      const { data } = await axios.post(`https://apexracingteam-eg.onrender.com/members/sign-up`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (data) {
        setSuccess('Sign up successful! Redirecting...');
        setTimeout(() => navigate('/signin'), 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      phone: '',
      firstName: '',
      lastName: '',
      password: '',
      image: null,
    },
    validationSchema,
    onSubmit: signUpSubmit,
  });

  return (
    <section className={`${style.SignUp} `}>
      <div className={`${style.SignUpContainer} myContainer`}>
        <div className={`${style.SignUpContent} shadow  `}>
          <h2 >Sign Up</h2>


          <form onSubmit={formik.handleSubmit} className={style.signUpForm}>



            {/* row1 */}
            <div className={`${style.rowContainer} d-flex justify-content-center w-100 `}>

              <div className="form-group w-100 me-3">
                <label htmlFor="firstName">First Name:</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''
                    }`}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="alert alert-danger py-2 mt-2">{formik.errors.firstName}</div>
                )}
              </div>

              <div className="form-group w-100">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''
                    }`}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="alert alert-danger py-2 mt-2">{formik.errors.lastName}</div>
                )}
              </div>
            </div>


            {/* row2 */}
            <div className={`${style.rowContainer} d-flex justify-content-center w-100 `}>
              <div className="form-group w-100 me-3">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''
                    }`}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="alert alert-danger py-2 mt-2">{formik.errors.email}</div>
                )}
              </div>

              <div className="form-group w-100">
                <label htmlFor="phone">Phone:</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''
                    }`}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="alert alert-danger py-2 mt-2">{formik.errors.phone}</div>
                )}
              </div>
            </div>


            {/* row3 */}
            <div className={`${style.rowContainer} d-flex justify-content-center w-100  `}>

              <div className="form-group me-3 w-100">
                <label htmlFor="password">Password:</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''
                    }`}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="alert alert-danger py-2 mt-2">{formik.errors.password}</div>
                )}
              </div>

              <div className="form-group w-100">
                <label htmlFor="image">Upload Image:</label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  onChange={(event) => {
                    formik.setFieldValue('image', event.currentTarget.files[0]);
                  }}
                  className={`form-control ${formik.touched.image && formik.errors.image ? 'is-invalid' : ''
                    }`}
                />
                {formik.touched.image && formik.errors.image && (
                  <div className="alert alert-danger py-2 mt-2">{formik.errors.image}</div>
                )}
              </div>
            </div>



            {error && <div className="alert alert-danger py-2 mt-2">{error}</div>}
            {success && <div className="alert alert-success py-2 mt-2">{success}</div>}

            <button type="submit" disabled={!(formik.dirty && formik.isValid)}>
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
