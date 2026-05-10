import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Register() {
  const [form, setForm] = useState({ full_name: '', email: '', password: '', phone: '', headline: '', location: '' });
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    }
  }

  return (
    <section className="auth-page wide">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Applicant registration</p>
        <h1>Create your account</h1>
        {error && <div className="alert error">{error}</div>}
        <div className="form-grid">
          <label>Full name<input required value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></label>
          <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
          <label>Password<input type="password" required minLength="8" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
          <label>Phone<input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
          <label>Professional headline<input placeholder="Cloud Engineer, Nurse, Project Manager..." value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} /></label>
          <label>Location<input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></label>
        </div>
        <button className="primary-button full" disabled={loading}>{loading ? 'Creating account...' : 'Register and enter portal'}</button>
        <p className="muted center">Already registered? <Link to="/login">Login</Link></p>
      </form>
    </section>
  );
}
