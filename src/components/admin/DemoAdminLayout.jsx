import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Logo from "../../assets/images/motoka logo.svg";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  BellAlertIcon,
} from '@heroicons/react/24/outline';

const NAV_ITEMS = [
  { name: 'Dashboard (Demo)', href: '/admin/demo/dashboard', icon: HomeIcon },
  { name: 'Renewals (Demo)', href: '/admin/demo/renewals', icon: BellAlertIcon },
  { name: 'Orders', href: '/admin/orders', icon: ClipboardDocumentListIcon },
];

function NavItem({ item, active, onClick }) {
  const Icon = item.icon;
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-left ${active ? 'bg-[#EBB950]/15 text-[#EBB950]' : 'text-white/55 hover:text-white hover:bg-white/6'}`}>
      <Icon style={{ width: 18, height: 18 }} className={active ? 'text-[#EBB950]' : 'text-white/40'} />
      <span className="flex-1 truncate">{item.name}</span>
    </button>
  );
}

export default function DemoAdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (href) => location.pathname.startsWith(href);
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <div className="hidden md:flex md:flex-shrink-0">
        <aside className="flex h-full w-64 flex-col bg-[#05243F]">
          <div className="flex items-center gap-2 pl-3 pr-3 pt-8 pb-5 border-b border-white/8">
            <img src={Logo} alt="Motoka" className="h-7 w-7 object-contain" style={{height:28,width:28}} />
            <div>
              <p className="text-sm font-semibold text-white leading-tight">Motoka</p>
              <span className="inline-block mt-1 rounded px-1.5 py-0.5 text-[10px] font-semibold bg-[#EBB950]/15 text-[#EBB950]">DEMO</span>
            </div>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
            {NAV_ITEMS.map(item => (
              <NavItem key={item.href} item={item} active={isActive(item.href)} onClick={() => navigate(item.href)} />
            ))}
          </nav>
          <div className="border-t border-white/8 px-3 py-3">
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-white/5">
              <div className="h-8 w-8 rounded-full bg-[#EBB950]/20 flex items-center justify-center text-[#EBB950] text-xs font-bold">DA</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">Demo Admin</p>
                <p className="text-[11px] text-white/40 truncate">demo@motoka.ng</p>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-white/30 px-2">Preview — no login needed. Real data at <a href="/admin/login" className="underline text-white/50">/admin/login</a></p>
          </div>
        </aside>
      </div>
      <div className="flex flex-1 flex-col min-w-0">
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 py-5 sm:px-6 sm:py-6">
            <div className="mb-4 rounded-md bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800">
              <strong>Demo mode</strong> — mock vehicles & counts. <a href="/admin/login" className="underline font-medium">Log in</a> for real data. Month filter works the same with live data.
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
