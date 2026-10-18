import React from 'react';

const shapes = {
  person: <><circle cx="12" cy="7" r="3.2"/><path d="M5 21v-3a7 7 0 0 1 14 0v3"/></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
  briefcase: <><rect x="3" y="7" width="18" height="14" rx="2.5"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12a23 23 0 0 0 18 0M12 11v4"/></>,
  code: <><path d="m8 5-6 7 6 7m8-14 6 7-6 7m-3-16-2 18"/></>,
  mail: <><rect x="2" y="5" width="20" height="15" rx="3"/><path d="m3 7 9 7 9-7"/></>,
  download: <><path d="M12 2v13m-5-5 5 5 5-5M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/></>,
  chevronRight: <path d="m9 5 7 7-7 7"/>,
  search: <><circle cx="10.5" cy="10.5" r="7"/><path d="m16 16 5 5"/></>,
  copy: <><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M15 8V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h4"/></>,
  check: <path d="m4 12 5 5L20 6"/>,
  external: <><path d="M13 3h8v8m0-8L10 14M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4"/></>,
  arrowLeft: <path d="m14 4-8 8 8 8"/>,
  sidebar: <><rect x="2" y="4" width="20" height="16" rx="2.5"/><path d="M9 4v16M5 8h1m-1 4h1"/></>,
  sun: <><circle cx="12" cy="12" r="4"/><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l1.5 1.5m13 13L20 20M4 20l1.5-1.5m13-13L20 4"/></>,
  moon: <path d="M21 13.5A9 9 0 0 1 10.5 3 9 9 0 1 0 21 13.5Z"/>,
  document: <><path d="M13 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10ZM13 2v8h8M7 14h10M7 18h7"/></>,
  link: <><path d="m10 13 4-4m-6 6-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m5 3 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0" transform="translate(1 0) scale(.9)"/></>,
  phone: <><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 5h4m-3 14h2"/></>,
  sparkles: <><path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5Z"/></>,
  layers: <><path d="m12 2 10 6-10 6L2 8Zm-9 11 9 6 9-6m-18 5 9 5 9-5"/></>,
  shield: <><path d="M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6Z"/><path d="m8 12 3 3 5-6"/></>,
  play: <path d="m8 3 13 9-13 9Z"/>,
  close: <path d="m6 6 12 12M6 18 18 6"/>,
  expand: <><path d="M3 9V3h6m6 0h6v6M3 15v6h6m6 0h6v-6"/></>,
};

export default function MacIcon({ name, className = '', ...props }) {
  return <svg className={`mac-icon ${className}`} viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{shapes[name] || shapes.grid}</svg>;
}
