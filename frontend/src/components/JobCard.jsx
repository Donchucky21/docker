import { Link } from 'react-router-dom';
import { MapPin, Clock, WalletCards } from 'lucide-react';

export default function JobCard({ job }) {
  return (
    <article className="card job-card">
      <div>
        <p className="eyebrow">{job.company}</p>
        <h3>{job.title}</h3>
        <p className="muted">{job.summary}</p>
      </div>
      <div className="job-meta">
        <span><MapPin size={15} /> {job.location}</span>
        <span><Clock size={15} /> {job.job_type}</span>
        <span><WalletCards size={15} /> {job.salary_range || 'Competitive'}</span>
      </div>
      <Link className="secondary-button" to={`/jobs/${job.id}`}>View role</Link>
    </article>
  );
}
