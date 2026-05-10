import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api.js';

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [coverNote, setCoverNote] = useState('');
  const [cvUrl, setCvUrl] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get(`/jobs/${id}`).then(({ data }) => setJob(data));
  }, [id]);

  async function apply(e) {
    e.preventDefault();
    setMessage('');
    try {
      await api.post(`/jobs/${id}/apply`, { cover_note: coverNote, cv_url: cvUrl });
      navigate('/applications');
    } catch (err) {
      setMessage(err.response?.data?.detail || 'Could not submit application.');
    }
  }

  if (!job) return <section className="page-section"><p>Loading job...</p></section>;

  return (
    <section className="page-section details-layout">
      <article className="card details-card">
        <p className="eyebrow">{job.company}</p>
        <h1>{job.title}</h1>
        <div className="job-meta large"><span>{job.location}</span><span>{job.job_type}</span><span>{job.salary_range || 'Competitive'}</span></div>
        <h3>Role summary</h3><p>{job.summary}</p>
        <h3>Description</h3><p>{job.description}</p>
        <h3>Requirements</h3><p>{job.requirements}</p>
      </article>
      <form className="card application-card" onSubmit={apply}>
        <h2>Apply for this role</h2>
        {message && <div className="alert error">{message}</div>}
        <label>CV / Portfolio URL<input required placeholder="https://..." value={cvUrl} onChange={(e) => setCvUrl(e.target.value)} /></label>
        <label>Cover note<textarea rows="8" required placeholder="Tell the hiring team why you are a good fit..." value={coverNote} onChange={(e) => setCoverNote(e.target.value)} /></label>
        <button className="primary-button full">Submit application</button>
      </form>
    </section>
  );
}
