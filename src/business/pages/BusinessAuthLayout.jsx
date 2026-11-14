import { Link, Outlet } from 'react-router-dom';
import businessLogo from '../../assets/business/business-logo.png';

export default function BusinessAuthLayout() {
  return (
    <div className="biz-auth">
      <div className="biz-auth__card">
        <Link to="/for-fleets" className="biz-auth__brand" aria-label="Motoka Business home">
          <img src={businessLogo} alt="" aria-hidden="true" />
          <span>Motoka Business</span>
        </Link>
        <Outlet />
        <p className="biz-auth__foot">
          <Link to="/for-fleets">← Back to Motoka Business</Link>
        </p>
      </div>
      <style>{`
        .biz-auth {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 24px;
          background:
            radial-gradient(900px 460px at 50% -8%, rgba(35,137,227,.28), transparent 70%),
            linear-gradient(180deg, #0A1F3A 0%, #0A1F3A 30%, #1A6FC4 100%);
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
        }
        .biz-auth__card {
          width: 100%;
          max-width: 420px;
          background: #fff;
          border-radius: 24px;
          padding: 36px 32px;
          box-shadow: 0 30px 60px -20px rgba(0,0,0,.45);
        }
        .biz-auth__brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 24px;
          text-decoration: none;
          color: #0B1F3A;
        }
        .biz-auth__brand img {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: block;
        }
        .biz-auth__brand span {
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .biz-auth__card h1 {
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #0B1F3A;
          margin: 0 0 6px;
        }
        .biz-auth__card .sub {
          font-size: 14px;
          color: #5F6E85;
          margin: 0 0 24px;
        }
        .biz-auth__field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 14px;
        }
        .biz-auth__field label {
          font-size: 13px;
          font-weight: 600;
          color: #3E4C63;
        }
        .biz-auth__field input {
          height: 46px;
          border: 1px solid #E5EAF2;
          border-radius: 10px;
          padding: 0 14px;
          font-size: 15px;
          color: #0B1F3A;
          outline: none;
          transition: border-color .2s ease, box-shadow .2s ease;
          font-family: inherit;
        }
        .biz-auth__field input:focus {
          border-color: #2389E3;
          box-shadow: 0 0 0 3px rgba(35,137,227,.15);
        }
        .biz-auth__btn {
          width: 100%;
          height: 48px;
          border: none;
          border-radius: 999px;
          background: #1A6FC4;
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          margin-top: 8px;
          transition: transform .2s ease, box-shadow .2s ease, background-color .2s ease;
          font-family: inherit;
        }
        .biz-auth__btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px -8px rgba(0,0,0,.35);
          background: #155fa9;
        }
        .biz-auth__btn:active { transform: translateY(0); }
        .biz-auth__links {
          margin-top: 18px;
          font-size: 14px;
          color: #5F6E85;
          text-align: center;
        }
        .biz-auth__links a {
          color: #2389E3;
          font-weight: 600;
          text-decoration: none;
        }
        .biz-auth__links a:hover { text-decoration: underline; }
        .biz-auth__foot {
          margin-top: 24px;
          text-align: center;
          font-size: 13px;
        }
        .biz-auth__foot a { color: #94a3b8; text-decoration: none; }
        .biz-auth__foot a:hover { color: #fff; }
      `}</style>
    </div>
  );
}
