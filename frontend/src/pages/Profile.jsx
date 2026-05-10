import { useAuth } from '../context/AuthContext.jsx';

export default function Profile() {
  const { user } = useAuth();
  return (
    <section className="page-section narrow">
      <div className="card profile-card">
        <p className="eyebrow">Applicant profile</p>
        <h1>{user?.full_name}</h1>
        <p className="muted">{user?.headline || 'No headline provided yet'}</p>
        <dl className="profile-list"><dt>Email</dt><dd>{user?.email}</dd><dt>Phone</dt><dd>{user?.phone || 'Not provided'}</dd><dt>Location</dt><dd>{user?.location || 'Not provided'}</dd></dl>
      </div>
    </section>
  );
}
