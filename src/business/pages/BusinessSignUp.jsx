import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function BusinessSignUp() {
  const navigate = useNavigate();
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!company || !email || !password) {
      toast.error('Fill in all fields to create your account.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Your fleet workspace is ready.');
      navigate('/business');
    }, 600);
  };

  return (
    <>
      <h1>Create your fleet workspace</h1>
      <p className="sub">Start tracking every vehicle, document and renewal in one place.</p>
      <form onSubmit={submit}>
        <div className="biz-auth__field">
          <label htmlFor="biz-company">Company name</label>
          <input
            id="biz-company"
            type="text"
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Eko Drive Partners"
          />
        </div>
        <div className="biz-auth__field">
          <label htmlFor="biz-email">Work email</label>
          <input
            id="biz-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </div>
        <div className="biz-auth__field">
          <label htmlFor="biz-password">Password</label>
          <input
            id="biz-password"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
          />
        </div>
        <button type="submit" className="biz-auth__btn" disabled={loading}>
          {loading ? 'Creating…' : 'Create account'}
        </button>
      </form>
      <div className="biz-auth__links">
        Already have an account? <Link to="/business/login">Sign in</Link>
      </div>
    </>
  );
}
