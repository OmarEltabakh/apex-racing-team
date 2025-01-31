import React, { useCallback, useContext, useState, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useQuery } from 'react-query';
import style from './LearningPhaseDashboard.module.css';
import { teamsContext } from '../../Context/TeamsContext';

const menuCategories = ['Educational']; // Define available video types

// Fetch sub-teams data by team ID
const fetchSubTeamsByTeamId = async (teamId) => {
  if (!teamId) return []; // Return empty array if no teamId is provided
  try {
    const { data } = await axios.get(`https://apexracingteam-eg.onrender.com/subteams/teams/${teamId}`);
    return data?.data || []; // Return sub-teams data or empty array
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch sub-teams data');
  }
};

export default function AddVideo({ refetch }) {
  // Context and state management
  const { teamsData } = useContext(teamsContext); // Access teams data from context
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state
  const [selectedTeamId, setSelectedTeamId] = useState(null); // Track selected team ID
  const token = `accesstoken_${localStorage.getItem('token')}`; // Get token from localStorage

  // Fetch sub-teams data based on selected team
  const { data: subTeamsData } = useQuery(
    ['subTeams', selectedTeamId],
    () => fetchSubTeamsByTeamId(selectedTeamId),
    {
      enabled: !!selectedTeamId, // Only fetch if selectedTeamId is set
      staleTime: Infinity, // Cache data indefinitely
      cacheTime: 3600000, // Cache time in milliseconds
      refetchOnWindowFocus: false, // Disable refetch on window focus
      refetchOnReconnect: false, // Disable refetch on reconnect
      refetchInterval: false, // Disable refetch intervals
    }
  );

  // Validation schema using Yup
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    vidType: Yup.string().required('Video type is required'),
    description: Yup.string().required('Description is required'),
    url: Yup.string().url('Invalid URL format').required('Video URL is required'),
    team: Yup.string().required('Team is required'),
    subTeam: Yup.string().required('Sub-Team is required'),
  });

  // Formik form configuration
  const formik = useFormik({
    initialValues: {
      title: '',
      vidType: '',
      description: '',
      url: '',
      team: '',
      subTeam: '',
    },
    validationSchema,
    onSubmit: useCallback(async (values, { resetForm }) => {
      setIsSubmitting(true); // Set loading state
      setSuccessMessage(''); // Clear previous success message
      setErrorMessage(''); // Clear previous error message

      // Find the selected sub-team
      const matchedSubTeam = subTeamsData?.find((team) => team.title === values.subTeam);

      // Validate sub-team selection
      if (!matchedSubTeam) {
        setErrorMessage('Invalid sub-team selected.');
        setIsSubmitting(false);
        return;
      }

      const subteamId = matchedSubTeam._id; // Extract sub-team ID

      try {
        // Send POST request to add video
        const response = await axios.post(
          'https://apexracingteam-eg.onrender.com/admins/add-video',
          {
            title: values.title,
            vidType: values.vidType,
            description: values.description,
            url: values.url,
            subteamId: subteamId,
            teamId: selectedTeamId,
          },
          {
            headers: { token }, // Include authorization token
          }
        );

        // Handle success
        setSuccessMessage(response.data.message || 'Video added successfully!');
        refetch(); // Refetch data to update the UI
        resetForm(); // Reset form fields
      } catch (error) {
        // Handle error
        setErrorMessage(error.response?.data?.message || 'Failed to add video. Please try again.');
      } finally {
        setIsSubmitting(false); // Reset loading state
      }
    }, [subTeamsData, token, selectedTeamId, refetch]), // Dependencies for useCallback
  });

  // Handle team selection change
  const handleTeamChange = (e) => {
    const selectedTeam = teamsData?.find((team) => team.title === e.target.value);
    if (selectedTeam) {
      setSelectedTeamId(selectedTeam._id); // Update selected team ID
    }
    formik.handleChange(e); // Update formik values
  };

  // Memoize sub-teams data to optimize performance
  const memoizedSubTeamsData = useMemo(() => subTeamsData, [subTeamsData]);

  return (
    <div
      className={`${style.addVideoModal} modal fade w-100`}
      id="modal3"
      tabIndex="-1"
      aria-labelledby="modal3Label"
      aria-hidden="true" // Ensure this is managed properly by Bootstrap
    >
      <div className={`${style.modalDialog} modal-dialog`}>
        <div className="modal-content">
          {/* Modal Header */}
          <div className={`${style.modalHeader} modal-header`}>
            <h1 className="modal-title fs-5" id="modal3Label">
              Add New Video
            </h1>
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
            <form onSubmit={formik.handleSubmit} className={style.addVideoForm}>
              <div className={style.inputFiled}>
                {/* Video Type and Title Fields */}
                <div className="d-flex mb-3">
                  <div className="w-100 me-3">
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
                    />
                    {formik.touched.title && formik.errors.title && (
                      <div className="alert alert-danger py-1 mt-1">{formik.errors.title}</div>
                    )}
                  </div>
                </div>

                {/* Description and URL Fields */}
                <div className="d-flex">
                  <div className="mb-3 w-100 me-3">
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

                  <div className="mb-3 w-100">
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
                </div>

                {/* Team and Sub-Team Fields */}
                <div className="d-flex">
                  <div className="mb-3 w-100 me-3">
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

                  <div className="mb-3 w-100">
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
                      disabled={!selectedTeamId} // Disable if no team is selected
                    >
                      <option value="">Select a sub-team</option>
                      {memoizedSubTeamsData?.map((team) => (
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
                {isSubmitting ? 'Uploading...' : 'Add Video'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}