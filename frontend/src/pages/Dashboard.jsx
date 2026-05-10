import { Link } from 'react-router-dom';
import { Briefcase, ClipboardList, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <section className="page-section">
      <div className="page-heading">
        <p className="eyebrow">Applicant dashboard</p>
        <h1>Hello, {user?.full_name?.split(' ')[0] || 'Applicant'} 👋</h1>
        <p className="muted">Manage your profile, browse vacancies, and track submitted applications.</p>
      </div>
      <div className="stats-grid">
        <Link className="stat-card" to="/jobs"><Briefcase /><strong>Browse jobs</strong><span>Find open vacancies</span></Link>
        <Link className="stat-card" to="/applications"><ClipboardList /><strong>Applications</strong><span>Track your submissions</span></Link>
        <Link className="stat-card" to="/profile"><UserCheck /><strong>Profile</strong><span>Review applicant details</span></Link>
      </div>
    </section>
  );
}
