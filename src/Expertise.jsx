import React from 'react';
import './Expertise.css';
import Typographic from './Typographic.jsx';
import RollingText from './RollingText.jsx';

const topics = [
  { id: 'native', title: 'Native, through and through.', description: 'Swift, SwiftUI, UIKit and Objective-C.' },
  { id: 'access', title: 'Secure access. Connected systems.', description: 'Passkey authentication, secure sign-in and integrations with APIs and external\u00a0services.' },
  { id: 'processing', title: 'The technically tricky parts.', description: 'Image and video processing, Metal, Core Image and on-device intelligence.' },
  { id: 'architecture', title: 'A solid foundation.', description: 'App architecture, codebase modernisation and the path from MVP to\u00a0App\u00a0Store.' },
  { id: 'training', title: 'Knowledge shared with teams.', description: 'Experience delivering corporate training for development teams.' },
];

export default function Expertise({ profileUrl }) {
  return <Typographic><section className="expertise-section expertise-illustrated" aria-labelledby="expertise-title">
    <div className="expertise-summary">
      <p className="eyebrow section-label">WHAT I BRING</p>
      <h2 id="expertise-title"><span>Engineering beyond</span> the interface.</h2>
      <p className="expertise-intro">The interface is only part of the work. I tackle the engineering behind it: <strong>secure authentication</strong>, <strong>complex integrations</strong> and <strong>performance</strong> that holds up as the product&nbsp;grows.</p>
      <a className="text-link expertise-profile roll-link" href={profileUrl} target="_blank" rel="noreferrer"><img src="/images/toptal-icon.svg" width="20" height="20" alt="" /><RollingText>Full experience on Toptal</RollingText></a>
    </div>
    <dl className="expertise-list">
      {topics.map(topic => <div key={topic.id} className="expertise-row">
        <dt>{topic.title}</dt>
        <dd>{topic.description}</dd>
      </div>)}
    </dl>
  </section></Typographic>;
}
