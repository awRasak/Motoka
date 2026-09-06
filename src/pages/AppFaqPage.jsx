import { Link } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'
import useSeoHead from '../hooks/useSeoHead'

const FAQS = [
  {
    q: 'How do I create an account on Motoka?',
    a: 'Join the waitlist with your email. When we launch, you\'ll get an invite to sign up with your name, email, phone number, and a password.',
  },
  {
    q: 'How will I renew my license through Motoka?',
    a: 'You\'ll enter your plate or license number, confirm your details, and pay for the renewal in the app. Our team handles the rest of the process on your behalf.',
  },
  {
    q: 'How do I know a document is genuine, not a fake sold by an agent?',
    a: 'Every renewal processed through Motoka is checked against the issuing agency\'s own records before it\'s marked complete in your wallet.',
  },
  {
    q: 'What does it cost, and are there hidden fees?',
    a: 'You\'ll see the full breakdown — the official government fee plus Motoka\'s service fee — before you pay anything. No surprise charges.',
  },
  {
    q: 'My license or road worthiness certificate has already expired — can Motoka still help?',
    a: 'Yes. Expired documents usually just mean a higher renewal fee, not starting over. Enter your details and Motoka will show you what\'s needed.',
  },
  {
    q: 'Can I store digital copies of my documents?',
    a: 'Yes — every license, insurance certificate, and road worthiness paper you renew is stored in an encrypted digital wallet.',
  },
  {
    q: 'Will I get reminders before a document expires?',
    a: 'Yes, Motoka sends alerts ahead of every expiry date so you can renew before penalties or lapses in compliance.',
  },
  {
    q: 'Can I renew a document if I live in a different state?',
    a: 'Yes — renewal is tied to the state where your vehicle is registered, not your current location. Motoka handles it remotely.',
  },
  {
    q: 'What is the save-ahead wallet?',
    a: 'It lets you set aside money toward your next renewal gradually, instead of finding the full fee in one lump sum when it\'s due.',
  },
  {
    q: 'What is Mo?',
    a: 'Mo is Motoka\'s built-in AI assistant — ask it about renewal steps, document requirements, or costs, and get an instant answer.',
  },
]

export default function AppFaqPage() {
  useSeoHead('FAQ | Motoka', 'Frequently asked questions about Motoka.')

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div
        style={{
          background: '#fff',
          borderBottom: '1px solid #e2e8f0',
          padding: '16px clamp(24px, 7.9vw, 114px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link
            to="/"
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              border: '1px solid #e2e8f0',
              background: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#05243f',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 style={{ fontWeight: 700, fontSize: 20, color: '#05243f' }}>FAQ</h1>
            <p style={{ fontSize: 13, color: '#64748b' }}>Frequently asked questions</p>
          </div>
        </div>
      </div>

      <div style={{ padding: 'clamp(24px, 7.9vw, 114px)', maxWidth: 720, margin: '0 auto' }}>
        <div style={{ borderTop: '1px solid #e2e8f0' }}>
          {FAQS.map((item) => (
            <details
              key={item.q}
              style={{ paddingTop: 24, paddingBottom: 24, borderBottom: '1px solid #e2e8f0' }}
            >
              <summary
                style={{
                  fontWeight: 600,
                  fontSize: 17,
                  color: '#05243f',
                  cursor: 'pointer',
                  listStyle: 'none',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <span>{item.q}</span>
                <Plus size={16} style={{ color: '#64748b', flexShrink: 0 }} />
              </summary>
              <p style={{ marginTop: 12, color: '#64748b', lineHeight: 1.7 }}>{item.a}</p>
            </details>
          ))}
        </div>

        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <p style={{ color: '#64748b', marginBottom: 16 }}>Still have questions?</p>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              borderRadius: 12,
              background: '#2389e3',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
