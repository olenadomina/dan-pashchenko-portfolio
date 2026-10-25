import React from 'react';
import Typographic from './Typographic.jsx';
import RollingText from './RollingText.jsx';
import { skillGroups } from './skills-data.js';
import './Skills.css';

export default function Skills({ resumeUrl = '/documents/dan-pashchenko-resume.pdf' }) {
  return <Typographic><section className="skills-section" id="skills" aria-labelledby="skills-title">
    <div className="skills-inner">
      <header className="skills-heading">
        <div>
          <p className="eyebrow section-label">SKILLS & TOOLKIT</p>
          <h2 id="skills-title">Technical skills.</h2>
        </div>
        <a className="skills-resume text-link roll-link" href={resumeUrl} download="dan-pashchenko-resume.pdf">
          <RollingText>Download resume</RollingText>
          <span className="skills-resume-format">PDF</span>
        </a>
      </header>
      <div className="skills-groups">
        {skillGroups.map(group => <section className="skills-group" key={group.id} aria-labelledby={`skills-${group.id}`}>
          <h3 id={`skills-${group.id}`}>{group.title}</h3>
          <ul className="skills-tags">
            {group.skills.map(skill => <li key={skill}>{skill}</li>)}
          </ul>
        </section>)}
      </div>
    </div>
  </section></Typographic>;
}
