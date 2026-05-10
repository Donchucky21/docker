import { useEffect, useMemo, useState } from 'react';
import api from '../services/api.js';
import JobCard from '../components/JobCard.jsx';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/jobs')
      .then(({ data }) => setJobs(data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => jobs.filter((job) =>
    [job.title, job.company, job.location, job.job_type].join(' ').toLowerCase().includes(query.toLowerCase())
  ), [jobs, query]);

  return (
    <section className="page-section">
      <div className="page-heading split">
        <div><p className="eyebrow">Open opportunities</p><h1>Browse jobs</h1></div>
        <input className="search-input" placeholder="Search jobs, company, location..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      {loading ? <p>Loading jobs...</p> : <div className="job-grid">{filtered.map((job) => <JobCard key={job.id} job={job} />)}</div>}
      {!loading && filtered.length === 0 && <div className="empty-state">No jobs matched your search.</div>}
    </section>
  );
}
