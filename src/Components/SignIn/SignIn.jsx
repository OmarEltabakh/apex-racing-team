import React, { useState } from 'react';
import style from './SignIn.module.css';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

export default function SignIn() {
  // hooks
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendMessage, setResendMessage] = useState('');

  const navigate = useNavigate();

  // Form field configuration
  const formFields = [
    { name: 'email', type: 'email', label: 'Email' },
    { name: 'password', type: 'password', label: 'Password' }
  ];

  // Validation schema
  const validationSchema = Yup.object(
    formFields.reduce((schema, field) => {
      const baseSchema = Yup.string().required(`${field.label} is required`);
      return { ...schema, [field.name]: baseSchema };
    }, {})
  );

  // Submit function
  const signInSubmit = async (values) => {
    setIsSubmitting(true);
    setSuccess(''); // Clear any previous success messages
    setError('');
    setResendMessage('');
    try {
      const { data } = await axios.post(
        'https://apexracingteam-eg.onrender.com/members/log-in',
        values
      );

      if (data) {
        localStorage.setItem('token', data.token);
        setSuccess('Sign in successful! Redirecting...');
        window.location.replace('/'); // This will navigate to the home page
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend Verification Email function
  const resendVerificationEmail = async (email) => {
    if (!email) {
      setResendMessage('Please provide your email to resend verification.');
      return;
    }
    setIsResending(true);
    setResendMessage('');
    try {
      const { data } = await axios.post('https://apexracingteam-eg.onrender.com/members/resend-verify-email', { email });
      setResendMessage(data.message || 'Verification email has been sent.');
    } catch (error) {
      setResendMessage(error.response?.data?.message || 'Failed to resend verification email.');
    } finally {
      setIsResending(false);
    }
  };

  // Formik setup
  const formik = useFormik({
    initialValues: formFields.reduce((values, field) => ({ ...values, [field.name]: '' }), {}),
    validationSchema,
    onSubmit: signInSubmit,
  });

  return (
    <section className={style.SignIn}>
      <div className={`${style.signInContainer} myContainer`}>
        <div className={`${style.signInContent} shadow`}>
          <h2>Sign In</h2>
          <form onSubmit={formik.handleSubmit} className={style.signInForm}>
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
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Resend Verification Section */}
          <div className="mt-4">
            <p
              type="button"
              className="fw-bold"
              onClick={() => resendVerificationEmail(formik.values.email)}
              disabled={isResending}
            >
              {isResending ? 'Resending...' : 'Resend Verification Email'}
            </p>
            {resendMessage && <div className="mt-2 alert alert-info py-2">{resendMessage}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
