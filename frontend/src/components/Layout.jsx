import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BriefcaseBusiness, LogOut, UserRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          <BriefcaseBusiness size={28} />
          <span>TalentBridge</span>
        </Link>
        <nav>
          {user ? (
            <>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/jobs">Jobs</NavLink>
              <NavLink to="/applications">Applications</NavLink>
              <NavLink to="/profile" className="profile-link"><UserRound size={17} /> Profile</NavLink>
              <button className="link-button" onClick={handleLogout}><LogOut size={17} /> Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <Link className="primary-button small" to="/register">Create account</Link>
            </>
          )}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
