import React, { useState } from 'react';
import style from './SignUp.module.css';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';


export default function SignUp() {

  // hooks
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  // Form field configuration
  const formFields = [
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'phone', type: 'tel', label: 'Phone' },
    { name: 'firstName', type: 'text', label: 'First Name' },
    { name: 'lastName', type: 'text', label: 'Last Name' },
    { name: 'password', type: 'password', label: 'Password' },
  ];

  // Validation schema
  const validationSchema = Yup.object(
    formFields.reduce((schema, field) => {
      const baseSchema =
        field.name === 'password'
          ? Yup.string().required(`${field.label} is required`).min(6, 'Password must be at least 6 characters')
          : Yup.string().required(`${field.label} is required`);
      return { ...schema, [field.name]: baseSchema };
    }, {})
  );

  // Submit function
  const signUpSubmit = async (values) => {
    setIsSubmitting(true);
    setSuccess(''); // Clear any previous success messages
    setError('');
    try {
      const { data } = await axios.post(`https://apexracingteam-eg.onrender.com/members/sign-up`, values);
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

  // Formik setup
  const formik = useFormik({
    initialValues: formFields.reduce((values, field) => ({ ...values, [field.name]: '' }), {}),
    validationSchema,
    onSubmit: signUpSubmit,
  });

  

  return (
    <section className={style.SignUp}>

      <div className={`${style.SignUpContainer} myContainer`}>

        <div className={`${style.SignUpContent} shadow`}>

          <h2>Sign Up</h2>

          <form onSubmit={formik.handleSubmit} className={style.signUpForm}>
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


            <button  type="submit" disabled={!(formik.dirty && formik.isValid)}>
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
