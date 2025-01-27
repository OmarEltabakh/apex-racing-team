import React, { useCallback, useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import style from './LearningPhaseDashboard.module.css';
import { SubTeamsContext } from '../../Context/SubTeamsContext';

const menuCategories = ['Educational'];


export default function AddVideo() {

  const { subteamData } = useContext(SubTeamsContext);

  //handle state management===================================================>
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const token = `accesstoken_${localStorage.getItem('token')}`;

  // validationSchema========================================================>
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    vidType: Yup.string().required('Video type is required'),
    description: Yup.string().required('Description is required'),
    url: Yup.string().url('Invalid URL format').required('Video URL is required'),
    subTeam: Yup.string().required('Sub-Team is required'),
  });

  // handle form submission=================================================>
  const formik = useFormik({
    initialValues: {
      title: '',
      vidType: '',
      description: '',
      url: '',
      subTeam: '',
    },
    validationSchema,
    onSubmit: useCallback(async (values, { resetForm }) => {
      setIsSubmitting(true);
      setSuccessMessage('');
      setErrorMessage('');

      const matchedSubTeam = subteamData?.data.find(
        (team) => team.title === values.subTeam
      );

      if (!matchedSubTeam) {
        setErrorMessage('Invalid sub-team selected.');
        setIsSubmitting(false);
        return;
      }

      const subteamId = matchedSubTeam._id;

      try {
        const response = await axios.post(
          'https://apexracingteam-eg.onrender.com/admins/add-video',
          {
            title: values.title,
            vidType: values.vidType,
            description: values.description,
            url: values.url,
            subteamId,
          },
          {
            headers: { token },
          }
        );

        setSuccessMessage(response.data.message || 'Video added successfully!');
        resetForm();
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Failed to add video. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }, [subteamData]),
  });

  return (
    <div className="modal fade w-100" id="modal3" tabIndex="-1" aria-labelledby="modal3Label" aria-hidden="true">
      <div className={`${style.modalDialog} modal-dialog`}>
        <div className="modal-content">
          <div className={`${style.modalHeader} modal-header`}>
            <h1 className="modal-title fs-5" id="modal3Label">Add New Video</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={formik.handleSubmit} className={style.addImageForm}>
              <div className={style.inputFiled}>
                {/* Title Field */}
                <div className="mb-3">
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
                  />
                  {formik.touched.title && formik.errors.title && (
                    <div className="alert alert-danger py-1 mt-1">{formik.errors.title}</div>
                  )}
                </div>

                {/* Video Type Field */}
                <div className="mb-3">
                  <label htmlFor="vidType">
                    <span className={`${style.redStar} me-1`}>*</span>Video Type:
                  </label>
                  <select
                    id="vidType"
                    name="vidType"
                    value={formik.values.vidType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-select ${formik.touched.vidType && formik.errors.vidType ? 'is-invalid' : ''}`}
                  >
                    <option value="">Select a video type</option>
                    {menuCategories.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {formik.touched.vidType && formik.errors.vidType && (
                    <div className="alert alert-danger py-1 mt-1">{formik.errors.vidType}</div>
                  )}
                </div>

                {/* Description Field */}
                <div className="mb-3">
                  <label htmlFor="description">
                    <span className={`${style.redStar} me-1`}>*</span>Description:
                  </label>
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

                {/* Video URL Field */}
                <div className="mb-3">
                  <label htmlFor="url">
                    <span className={`${style.redStar} me-1`}>*</span>Video URL:
                  </label>
                  <input
                    type="text"
                    id="url"
                    name="url"
                    value={formik.values.url}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-control ${formik.touched.url && formik.errors.url ? 'is-invalid' : ''}`}
                  />
                  {formik.touched.url && formik.errors.url && (
                    <div className="alert alert-danger py-1 mt-1">{formik.errors.url}</div>
                  )}
                </div>

                {/* Sub-Team Field */}
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
                    {subteamData?.data.map((team) => (
                      <option key={team._id} value={team.title}>
                        {team.title}
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
                {isSubmitting ? 'Uploading...' : 'Add Video'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
