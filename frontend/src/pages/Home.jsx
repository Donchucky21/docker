import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Search, Send } from 'lucide-react';

export default function Home() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">Professional Job Portal</p>
        <h1>Find the right role. Apply with confidence.</h1>
        <p className="hero-copy">TalentBridge connects job seekers with curated vacancies. Register first, complete your profile, browse opportunities, and track your applications from one secure portal.</p>
        <div className="hero-actions">
          <Link className="primary-button" to="/register">Get started <ArrowRight size={18} /></Link>
          <Link className="secondary-button" to="/login">I already have an account</Link>
        </div>
      </div>
      <div className="feature-grid">
        <div className="feature-card"><ShieldCheck /><h3>Secure access</h3><p>Applicants must register and log in before accessing the portal.</p></div>
        <div className="feature-card"><Search /><h3>Search jobs</h3><p>Filter vacancies by title, company, location, and role type.</p></div>
        <div className="feature-card"><Send /><h3>Apply online</h3><p>Submit cover notes, CV links, and track application status.</p></div>
      </div>
    </section>
  );
}
