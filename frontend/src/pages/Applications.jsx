import { useEffect, useState } from 'react';
import api from '../services/api.js';

export default function Applications() {
  const [applications, setApplications] = useState([]);
  useEffect(() => { api.get('/applications/me').then(({ data }) => setApplications(data)); }, []);
  return (
    <section className="page-section">
      <div className="page-heading"><p className="eyebrow">My submissions</p><h1>Application history</h1></div>
      <div className="table-card">
        <table><thead><tr><th>Role</th><th>Company</th><th>Status</th><th>Submitted</th></tr></thead>
          <tbody>{applications.map((app) => <tr key={app.id}><td>{app.job_title}</td><td>{app.company}</td><td><span className="status">{app.status}</span></td><td>{new Date(app.created_at).toLocaleDateString()}</td></tr>)}</tbody>
        </table>
        {applications.length === 0 && <div className="empty-state">You have not submitted any application yet.</div>}
      </div>
    </section>
  );
}
