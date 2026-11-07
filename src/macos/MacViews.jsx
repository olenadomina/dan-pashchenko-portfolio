import { useEffect, useRef, useState } from 'react';
import Typographic from '../Typographic.jsx';
import { skillGroups } from '../skills-data.js';
import MacIcon from './MacIcon.jsx';
import './views.css';

const email = 'contactiosengineer@gmail.com';
const resume = '/documents/dan-pashchenko-resume.pdf';
const toptal = 'https://www.toptal.com/developers/resume/bogdan-pashchenko';
const profiles = [
  { label: 'LinkedIn', detail: 'bogdanpashchenko', url: 'https://www.linkedin.com/in/bogdanpashchenko/' },
  { label: 'GitHub', detail: 'truemetal', url: 'https://github.com/truemetal' },
  { label: 'Toptal', detail: 'Full experience', url: toptal },
];

const projects = [
  {
    id: 'papaya', name: 'Papaya for HS', category: 'Health & wellbeing', icon: 'papaya.png',
    description: 'A companion for managing hidradenitis suppurativa. I took an existing MVP into production and delivered 28 App Store releases.',
    tags: ['Swift', 'SwiftUI', 'iOS'],
    url: 'https://apps.apple.com/us/app/papaya-for-hs/id1633481278',
    images: [
      { src: 'papaya-preview-1.webp', width: 1290, height: 2796, alt: 'Papaya journal calendar with symptom and treatment entries', caption: 'Daily health journal' },
      { src: 'papaya-preview-2.webp', width: 1290, height: 2796, alt: 'Papaya symptom entry with pain severity and notes', caption: 'Symptom tracking' },
    ],
  },
  {
    id: 'athleats', name: 'Athleats', category: 'Nutrition & performance', icon: 'athleats.png',
    description: 'Performance recipes, meal planning and macro tracking, all in one app.',
    tags: ['Swift', 'SwiftUI', 'Supabase'],
    url: 'https://apps.apple.com/ua/app/athleats-performance-recipes/id6754655851',
    images: [
      { src: 'athleats-preview-1.webp', width: 1284, height: 2778, screen: { x: 225, y: 744, width: 832, height: 1806 }, alt: 'Athleats Greek meatball bowl recipe with macros and nutrition', caption: 'Recipes & nutrition' },
      { src: 'athleats-preview-2.webp', width: 1284, height: 2778, screen: { x: 225, y: 744, width: 832, height: 1806 }, alt: 'Athleats saved recipe collections for workouts and everyday meals', caption: 'Personal recipe collections' },
    ],
  },
  {
    id: 'kuni', name: 'KUNI Cam', category: 'Photo & video', icon: 'kuni.png',
    description: 'Photo and video editing with an analog feel. I established the technical foundation and implemented around 90% of the product over two years.',
    tags: ['iOS', 'Image processing', 'Video'],
    url: 'https://apps.apple.com/us/app/kuni-cam-photo-video-editor/id1336488891',
    images: [
      { src: 'kuni-preview-1.webp', width: 1242, height: 2688, alt: 'KUNI Cam film grain and dust effects on a skateboard photograph', caption: 'Film textures & effects' },
      { src: 'kuni-preview-2.webp', width: 1242, height: 2688, alt: 'KUNI Cam custom photo presets applied to a food photograph', caption: 'Custom photo presets' },
    ],
  }
];

const topics = [
  { icon: 'phone', title: 'Native, through and through.', description: 'Swift, SwiftUI, UIKit and Objective-C.' },
  { icon: 'shield', title: 'Secure access. Connected systems.', description: 'Passkey authentication, secure sign-in and integrations with APIs and external services.' },
  { icon: 'sparkles', title: 'The technically tricky parts.', description: 'Image and video processing, Metal, Core Image and on-device intelligence.' },
  { icon: 'layers', title: 'A solid foundation.', description: 'App architecture, codebase modernisation and the path from MVP to App Store.' },
  { icon: 'person', title: 'Knowledge shared with teams.', description: 'Experience delivering corporate training for development teams.' },
];

const skillIcons = {
  languages: 'code',
  'apple-platforms': 'phone',
  'media-ai': 'sparkles',
  'apis-data': 'layers',
  'tools-delivery': 'briefcase',
  'architecture-teamwork': 'person',
};

function ResumeLink({ compact = false }) {
  return <a className="mac-content-button" href={resume} download="dan-pashchenko-resume.pdf">
    <MacIcon name="download" /><span>{compact ? 'Resume' : 'Download resume'}</span><span className="mac-file-type">PDF</span>
  </a>;
}

function ProfilePhoto({ large = false }) {
  return <img className={`mac-profile-photo${large ? ' mac-profile-photo-large' : ''}`} src="/images/portrait.jpg" width="100" height="100" alt="Dan Pashchenko" />;
}

function ViewHeading({ title, children, action }) {
  return <header className="mac-view-heading">
    <div><h1>{title}</h1>{children && <p>{children}</p>}</div>
    {action}
  </header>;
}

export function OverviewView({ navigate }) {
  return <Typographic><div className="mac-view mac-view-overview">
    <div className="mac-profile-intro">
      <ProfilePhoto large />
      <div className="mac-profile-identity"><p className="mac-profile-kicker">Independent iOS engineer</p><h1>Dan Pashchenko</h1><p className="mac-profile-promise">Clean & stable code. Great value for money.</p></div>
    </div>
    <p className="mac-overview-description">I build native apps from scratch and help take existing products to the next level.</p>
    <div className="mac-content-actions">
      <a className="mac-content-button mac-content-button-primary" href={`mailto:${email}`}><MacIcon name="mail" /><span>Email Dan</span></a>
      <ResumeLink />
    </div>

    <dl className="mac-experience-strip" aria-label="Experience at a glance">
      <div><dd>14</dd><dt>years in iOS</dt></div>
      <div><dd>12</dd><dt>years in Swift</dt></div>
      <div><dd>40+</dd><dt>iOS apps made</dt></div>
      <div><dd>20</dd><dt>years in IT</dt></div>
    </dl>

    <section className="mac-content-section" aria-labelledby="mac-overview-work">
      <div className="mac-content-section-heading"><h2 id="mac-overview-work">Selected work</h2><button type="button" className="mac-inline-action" onClick={() => navigate('work')}>View all<MacIcon name="chevronRight" /></button></div>
      <div className="mac-grouped-panel">
        {projects.map(project => <button key={project.id} type="button" className="mac-app-row" onClick={() => navigate('work', project.id)}>
          <img src={`/images/${project.icon}`} width="44" height="44" alt="" />
          <span className="mac-row-copy"><strong>{project.name}</strong><span>{project.category}</span></span>
          <span className="mac-row-platform">iOS</span><MacIcon name="chevronRight" />
        </button>)}
      </div>
      <p className="mac-section-footnote">A few apps I’ve helped bring into people’s everyday lives.</p>
    </section>

    <section className="mac-content-section" aria-labelledby="mac-overview-profile">
      <div className="mac-content-section-heading"><h2 id="mac-overview-profile">Technical profile</h2></div>
      <div className="mac-grouped-panel">
        <button className="mac-detail-row" type="button" onClick={() => navigate('expertise')}><span className="mac-row-symbol"><MacIcon name="briefcase" /></span><span className="mac-row-copy"><strong>What I bring</strong><span>Engineering beyond the interface</span></span><MacIcon name="chevronRight" /></button>
        <button className="mac-detail-row" type="button" onClick={() => navigate('skills')}><span className="mac-row-symbol"><MacIcon name="code" /></span><span className="mac-row-copy"><strong>Skills & toolkit</strong><span>{skillGroups.reduce((sum, group) => sum + group.skills.length, 0)} skills across {skillGroups.length} categories</span></span><MacIcon name="chevronRight" /></button>
      </div>
    </section>
  </div></Typographic>;
}

function AppPreview({ image }) {
  const { screen } = image;
  return <figure className="mac-app-preview">
    <div className={`mac-phone-preview${screen ? ' mac-phone-preview-cropped' : ''}`}>
      {screen ? <div className="mac-phone-screen" style={{ aspectRatio: `${screen.width} / ${screen.height}` }}>
        <img src={`/images/${image.src}`} width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async" style={{ width: `${image.width / screen.width * 100}%`, left: `${-screen.x / screen.width * 100}%`, top: `${-screen.y / screen.height * 100}%` }} />
      </div> : <img src={`/images/${image.src}`} width={image.width} height={image.height} alt={image.alt} loading="lazy" decoding="async" />}
    </div>
    <figcaption>{image.caption}</figcaption>
  </figure>;
}

export function WorkView({ selectedProject = 'kuni', onSelectProject }) {
  const project = projects.find(item => item.id === selectedProject) || projects[0];
  return <Typographic><div className="mac-view mac-view-work">
    <ViewHeading title="Selected work">Built for real life.</ViewHeading>
    <div className="mac-app-segments" role="group" aria-label="Choose an app">
      {projects.map(item => <button key={item.id} type="button" aria-pressed={project.id === item.id} onClick={() => onSelectProject?.(item.id)}>{item.name}</button>)}
    </div>
    <section className="mac-grouped-panel mac-project-summary" aria-labelledby="mac-project-title">
      <div className="mac-project-identity"><img src={`/images/${project.icon}`} width="64" height="64" alt="" /><div><h2 id="mac-project-title">{project.name}</h2><p>{project.category}</p></div><span className="mac-platform-label">iOS</span></div>
      <p className="mac-project-description">{project.description}</p>
      <div className="mac-project-details"><ul className="mac-project-tags" aria-label="Project focus">{project.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><a className="mac-content-button mac-content-button-primary" href={project.url} target="_blank" rel="noreferrer"><span>View on App Store</span><MacIcon name="external" /></a></div>
    </section>
    <section className="mac-content-section" aria-labelledby="mac-previews-title">
      <div className="mac-content-section-heading"><h2 id="mac-previews-title">App previews</h2><span className="mac-section-caption">iPhone</span></div>
      <div className="mac-grouped-panel mac-preview-gallery" key={project.id}>{project.images.map(image => <AppPreview image={image} key={image.src} />)}</div>
    </section>
  </div></Typographic>;
}

export function ExpertiseView() {
  return <Typographic><div className="mac-view mac-view-expertise">
    <ViewHeading title="What I bring">Engineering beyond the interface.</ViewHeading>
    <p className="mac-content-lead">The interface is only part of the work. I tackle the engineering behind it: secure authentication, complex integrations and performance that holds up as the product grows.</p>
    <div className="mac-grouped-panel mac-capabilities">
      {topics.map(topic => <div className="mac-capability-row" key={topic.title}><span className="mac-row-symbol"><MacIcon name={topic.icon} /></span><div><h2>{topic.title}</h2><p>{topic.description}</p></div></div>)}
    </div>
    <a className="mac-grouped-panel mac-profile-link" href={toptal} target="_blank" rel="noreferrer"><img src="/images/toptal-icon.svg" width="22" height="22" alt="" /><span className="mac-row-copy"><strong>Full experience on Toptal</strong><span>Projects, skills and professional background</span></span><MacIcon name="external" /></a>
  </div></Typographic>;
}

export function SkillsView() {
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLocaleLowerCase();
  const filteredGroups = skillGroups.map(group => ({
    ...group,
    skills: group.title.toLocaleLowerCase().includes(normalized) ? group.skills : group.skills.filter(skill => skill.toLocaleLowerCase().includes(normalized)),
  })).filter(group => group.skills.length);
  const count = filteredGroups.reduce((sum, group) => sum + group.skills.length, 0);
  return <Typographic><div className="mac-view mac-view-skills">
    <ViewHeading title="Skills & toolkit" action={<ResumeLink compact />}>Tools and technologies I work with.</ViewHeading>
    <div className="mac-skills-search-row">
      <label className="mac-content-search"><MacIcon name="search" /><input type="search" aria-label="Search skills" placeholder="Search skills" value={query} onChange={event => setQuery(event.target.value)} /></label>
      <span className="mac-search-result-count" role="status" aria-live="polite">{count} {count === 1 ? 'skill' : 'skills'}</span>
    </div>
    <div className="mac-skill-categories">
      {filteredGroups.map(group => <section className="mac-grouped-panel mac-skill-category" key={group.id} aria-labelledby={`mac-skills-${group.id}`}>
        <div className="mac-skill-category-heading"><span className="mac-row-symbol"><MacIcon name={skillIcons[group.id]} /></span><h2 id={`mac-skills-${group.id}`}>{group.title}</h2><span>{group.skills.length}</span></div>
        <ul className="mac-skill-tokens">{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
      </section>)}
      {count === 0 && <div className="mac-skills-empty"><MacIcon name="search" /><h2>No matching skills</h2><p>Try a language, framework or tool.</p><button type="button" className="mac-content-button" onClick={() => setQuery('')}>Clear search</button></div>}
    </div>
    <p className="mac-section-footnote">Based on my <a href={toptal} target="_blank" rel="noreferrer">Toptal profile</a>. The PDF includes a downloadable version of my experience.</p>
  </div></Typographic>;
}

export function ContactView() {
  const [copyState, setCopyState] = useState('idle');
  const emailRef = useRef(null);
  const resetTimer = useRef(null);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; clearTimeout(resetTimer.current); };
  }, []);

  async function copyEmail() {
    clearTimeout(resetTimer.current);
    setCopyState('copying');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(email);
      if (!mounted.current) return;
      setCopyState('copied');
      resetTimer.current = setTimeout(() => setCopyState('idle'), 3000);
    } catch {
      if (!mounted.current) return;
      const selection = window.getSelection();
      if (selection && emailRef.current) {
        const range = document.createRange();
        range.selectNodeContents(emailRef.current);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      setCopyState('error');
    }
  }

  return <Typographic><div className="mac-view mac-view-contact">
    <ViewHeading title="Contact">Let’s talk about your next iOS project.</ViewHeading>
    <div className="mac-contact-person"><ProfilePhoto large /><h2>Dan Pashchenko</h2><p>Independent iOS engineer</p></div>
    <p className="mac-contact-intro">Just drop me a line and I’ll get back to you.</p>
    <section className="mac-content-section" aria-labelledby="mac-contact-details">
      <div className="mac-content-section-heading"><h2 id="mac-contact-details">Contact details</h2></div>
      <div className="mac-grouped-panel">
        <div className="mac-contact-email-row"><span className="mac-contact-field-label">email</span><a ref={emailRef} href={`mailto:${email}`}>{email}</a><button type="button" className="mac-content-icon-button" onClick={copyEmail} disabled={copyState === 'copying'} aria-label={copyState === 'copied' ? 'Email copied' : 'Copy email address'} title="Copy email address"><MacIcon name={copyState === 'copied' ? 'check' : 'copy'} /></button></div>
        {profiles.map(profile => <a key={profile.label} className="mac-contact-profile-row" href={profile.url} target="_blank" rel="noreferrer"><span className="mac-contact-field-label">{profile.label}</span><span>{profile.detail}</span><MacIcon name="external" /></a>)}
      </div>
      <div className={`mac-copy-status${copyState === 'error' ? ' mac-copy-status-error' : ''}`} role="status" aria-live="polite">{copyState === 'copied' ? <><MacIcon name="check" />Email address copied.</> : copyState === 'error' ? 'Couldn’t copy automatically. The address is selected so you can copy it.' : ''}</div>
    </section>
    <section className="mac-content-section mac-contact-resume" aria-labelledby="mac-contact-resume-title"><div className="mac-content-section-heading"><h2 id="mac-contact-resume-title">Resume</h2></div><a className="mac-grouped-panel mac-profile-link" href={resume} download="dan-pashchenko-resume.pdf"><span className="mac-row-symbol"><MacIcon name="document" /></span><span className="mac-row-copy"><strong>Dan Pashchenko</strong><span>Experience & technical skills · PDF</span></span><MacIcon name="download" /></a></section>
  </div></Typographic>;
}
