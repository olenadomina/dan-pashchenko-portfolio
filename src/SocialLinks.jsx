import React from 'react';
import './SocialLinks.css';

const profiles = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/bogdanpashchenko/' },
  { label: 'GitHub', url: 'https://github.com/truemetal' },
  { label: 'Toptal', url: 'https://www.toptal.com/developers/resume/bogdan-pashchenko' },
];

export default function SocialLinks() {
  return <nav className="footer-social-links" aria-label="Social profiles">
    {profiles.map(profile => <a key={profile.label} className="footer-social-link" href={profile.url} target="_blank" rel="noreferrer">
      <span className="social-link-window"><span className="social-link-roll"><span>{profile.label}</span><span aria-hidden="true">{profile.label}</span></span></span>
    </a>)}
  </nav>;
}
