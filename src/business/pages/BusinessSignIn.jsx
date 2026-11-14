import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function BusinessSignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Enter your email and password.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Signed in to your fleet workspace.');
      navigate('/business');
    }, 600);
  };

  return (
    <>
      <h1>Welcome back</h1>
      <p className="sub">Sign in to your Motoka Business fleet workspace.</p>
      <form onSubmit={submit}>
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
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="biz-auth__btn" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <div className="biz-auth__links">
        New to Motoka Business? <Link to="/business/signup">Create an account</Link>
      </div>
    </>
  );
}
