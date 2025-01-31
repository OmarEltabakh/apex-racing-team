import React, { useCallback, useContext, useState, useMemo } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useQuery } from 'react-query';
import style from './LearningPhaseDashboard.module.css';
import { teamsContext } from '../../Context/TeamsContext';

const menuCategories = ['Educational'];

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

export default function AddVideo({ refetch }) {
  const { teamsData } = useContext(teamsContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState(null);
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

  // Validation schema
  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    vidType: Yup.string().required('Video type is required'),
    description: Yup.string().required('Description is required'),
    url: Yup.string().url('Invalid URL format').required('Video URL is required'),
    team: Yup.string().required('Team is required'),
    subTeam: Yup.string().required('Sub-Team is required'),
  });

  // Handle form submission
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

      setIsSubmitting(true);
      setSuccessMessage('');
      setErrorMessage('');

      const matchedSubTeam = subTeamsData?.find(
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
            subteamId: subteamId,
            teamId: selectedTeamId,
          },
          {
            headers: { token },
          }
        );

        setSuccessMessage(response.data.message || 'Video added successfully!');
        refetch()
        resetForm();
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Failed to add video. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }, [subTeamsData, token, selectedTeamId]),
  });

  // Handle team change
  const handleTeamChange = (e) => {
    const selectedTeam = teamsData?.find((team) => team.title === e.target.value);
    if (selectedTeam) {
      setSelectedTeamId(selectedTeam._id);
    }
    formik.handleChange(e);
  };

  const memoizedSubTeamsData = useMemo(() => subTeamsData, [subTeamsData]);

  return (
    <div className={`${style.addVideoModal} modal fade w-100`} id="modal3" tabIndex="-1" aria-labelledby="modal3Label" aria-hidden="true">
      <div className={`${style.modalDialog} modal-dialog`}>
        <div className="modal-content">
          <div className={`${style.modalHeader} modal-header`}>
            <h1 className="modal-title fs-5" id="modal3Label">Add New Video</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={formik.handleSubmit} className={style.addVideoForm}>
              <div className={style.inputFiled}>
                <div className='d-flex mb-3'>
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
                  <div className="w-100 ">
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

                <div className='d-flex'>
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

                <div className='d-flex'>
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
                      disabled={!selectedTeamId}
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

              {successMessage && <div className="alert alert-success py-2 mt-2">{successMessage}</div>}
              {errorMessage && <div className="alert alert-danger py-2 mt-2">{errorMessage}</div>}

              <button type="submit"
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