import React, { useState, useRef, useEffect } from 'react';
import { ShieldCheckIcon, ArrowTopRightOnSquareIcon, ClipboardIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

// The official verification portals have no API and sit behind CAPTCHAs, so
// the admin checks by hand. Each link opens the portal in a new tab; the plate
// is copied first because none of the forms accept it in the URL.
const SOURCES = [
  {
    key: 'mvaa',
    name: 'Vehicle licence / hackney (Lagos MVAA)',
    url: 'https://verify.autoreg.ng/',
    hint: 'Paste the plate, tick the captcha, Search',
  },
  {
    key: 'niid',
    name: 'Insurance (NIID)',
    url: 'https://www.askniid.org/VerifyPolicy.aspx',
    hint: 'Choose Vehicle, paste the plate',
  },
  {
    key: 'frsc',
    name: "Driver's licence (FRSC)",
    url: 'https://www.nigeriadriverslicence.org/',
    hint: 'Needs licence number and date of birth',
  },
];

const copyPlate = async (plate) => {
  if (!plate) return;
  try {
    await navigator.clipboard.writeText(plate);
    toast.success(`${plate} copied`);
  } catch {
    toast.error('Could not copy the plate');
  }
};

const VerifyLinks = ({ plate }) => {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const close = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const openSource = async (src) => {
    await copyPlate(plate);
    window.open(src.url, '_blank', 'noopener');
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <ShieldCheckIcon className="h-4 w-4" />
        Verify
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-20 mt-2 w-80 rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
        >
          <div className="flex items-center justify-between px-2 py-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Check {plate || 'this vehicle'} on</span>
            {plate && (
              <button
                type="button"
                onClick={() => copyPlate(plate)}
                title="Copy plate"
                aria-label="Copy plate number"
                className="rounded p-1 text-gray-500 hover:bg-gray-100"
              >
                <ClipboardIcon className="h-4 w-4" />
              </button>
            )}
          </div>
          {SOURCES.map((src) => (
            <button
              key={src.key}
              type="button"
              role="menuitem"
              onClick={() => openSource(src)}
              className="flex w-full items-start gap-3 rounded-md px-2 py-2 text-left hover:bg-gray-50"
            >
              <ArrowTopRightOnSquareIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#2389E3]" />
              <span>
                <span className="block text-sm font-medium text-gray-900">{src.name}</span>
                <span className="block text-xs text-gray-500">{src.hint}</span>
              </span>
            </button>
          ))}
          <p className="px-2 pt-2 text-xs text-gray-500">
            Road worthiness has no website: dial <span className="font-mono">*554*38#</span>.
          </p>
        </div>
      )}
    </div>
  );
};

export default VerifyLinks;
