import React, { useEffect, useRef, useState } from 'react';
import MacIcon from './MacIcon.jsx';
import { OverviewView, WorkView, ExpertiseView, SkillsView, ContactView } from './MacViews.jsx';

const sections = [
  { id: 'overview', title: 'Overview', icon: 'person', caption: 'Meet Dan Pashchenko', keywords: 'about engineer profile native ios' },
  { id: 'work', title: 'Selected work', icon: 'grid', caption: 'Three apps. Real-world impact.', keywords: 'kuni papaya athleats apps projects' },
  { id: 'expertise', title: 'What I bring', icon: 'briefcase', caption: 'Engineering beyond the interface', keywords: 'experience architecture integrations performance training security' },
  { id: 'skills', title: 'Skills & toolkit', icon: 'code', caption: 'The tools behind the work', keywords: 'swift swiftui uikit python languages frameworks tools technologies' },
  { id: 'contact', title: 'Contact', icon: 'mail', caption: 'Let’s build something useful', keywords: 'email linkedin github toptal message talk' },
];
const resume = '/documents/dan-pashchenko-resume.pdf';

export default function MacPortfolio() {
  const [view, setView] = useState('overview');
  const [selectedProject, setSelectedProject] = useState('kuni');
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const searchDialog = useRef(null);
  const searchInput = useRef(null);
  const content = useRef(null);
  const current = sections.find(section => section.id === view);
  const results = sections.filter(section => `${section.title} ${section.caption} ${section.keywords}`.toLowerCase().includes(query.toLowerCase().trim()));

  const navigate = (id, projectId) => {
    setMinimized(false);
    setView(id);
    if (projectId) setSelectedProject(projectId);
    if (window.location.hash !== `#${id}`) window.location.hash = id;
    searchDialog.current?.close();
  };
  const openSearch = () => {
    setQuery('');
    searchDialog.current?.showModal();
    searchInput.current?.focus();
  };

  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.slice(1);
      if (sections.some(section => section.id === id)) { setView(id); setMinimized(false); }
    };
    onHashChange();
    try { setDark(localStorage.getItem('dan-macos-appearance') === 'dark'); } catch { /* Storage is optional. */ }
    const onKeyDown = event => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); openSearch(); }
    };
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('keydown', onKeyDown);
    return () => { window.removeEventListener('hashchange', onHashChange); window.removeEventListener('keydown', onKeyDown); };
  }, []);
  useEffect(() => { if (content.current) content.current.scrollTop = 0; }, [view]);
  const changeTheme = () => {
    setDark(value => {
      try { localStorage.setItem('dan-macos-appearance', value ? 'light' : 'dark'); } catch { /* Storage is optional. */ }
      return !value;
    });
  };
  const navLink = (section, location) => <a key={section.id} href={`#${section.id}`} className={`${location} ${view === section.id ? 'is-selected' : ''}`} aria-current={view === section.id ? 'page' : undefined} onClick={event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault(); navigate(section.id);
  }}><MacIcon name={section.icon}/><span>{section.title}</span>{location === 'mac-sidebar-link' && section.id === 'work' && <span className="mac-count">3</span>}</a>;

  return <div className={`mac-desktop${dark ? ' mac-dark' : ''}${expanded ? ' mac-expanded' : ''}`}>
    <a className="mac-skip" href="#mac-content">Skip to content</a>
    <div className="mac-menubar">
      <button className="mac-menu-brand" onClick={() => navigate('overview')} aria-label="Dan Pashchenko overview"><img src="/images/dan-mark.svg?v=cut-d-3" width="17" height="17" alt=""/><strong>Dan Pashchenko</strong></button>
      <nav aria-label="Quick navigation"><button onClick={() => navigate('work')}>Work</button><button onClick={() => navigate('skills')}>Skills</button><button onClick={() => navigate('contact')}>Contact</button></nav>
      <div className="mac-menu-end"><button onClick={changeTheme} aria-label={dark ? 'Use light appearance' : 'Use dark appearance'} title="Change appearance"><MacIcon name={dark ? 'sun' : 'moon'}/></button><a href="/">Original version <MacIcon name="external"/></a></div>
    </div>

    <div className={`mac-window${sidebarOpen ? '' : ' mac-sidebar-hidden'}${minimized ? ' mac-is-minimized' : ''}`}>
      <div className="mac-window-controls">
        <div className="mac-traffic-lights">
          <a className="mac-light mac-light-close" href="/" aria-label="Return to original portfolio" title="Original portfolio"><span>×</span></a>
          <button className="mac-light mac-light-minimize" onClick={() => setMinimized(true)} aria-label="Minimize portfolio window" title="Minimize"><span>−</span></button>
          <button className="mac-light mac-light-expand" onClick={() => setExpanded(value => !value)} aria-label={expanded ? 'Restore window size' : 'Expand portfolio window'} title={expanded ? 'Restore size' : 'Expand'}><MacIcon name="expand"/></button>
        </div>
        <button className="mac-icon-button mac-sidebar-toggle" onClick={() => setSidebarOpen(value => !value)} aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'} aria-expanded={sidebarOpen}><MacIcon name="sidebar"/></button>
      </div>
      <header className="mac-toolbar">
        <div className="mac-toolbar-title"><strong>{current.title}</strong><span>{current.caption}</span></div>
        <div className="mac-toolbar-actions"><button className="mac-search-button" onClick={openSearch} aria-label="Search portfolio"><MacIcon name="search"/><span>Search</span><kbd>⌘ K</kbd></button><a href={resume} download="dan-pashchenko-resume.pdf" className="mac-icon-button" aria-label="Download resume PDF" title="Download resume"><MacIcon name="download"/></a></div>
      </header>
      <aside className="mac-sidebar" aria-label="Portfolio sidebar">
        <div className="mac-sidebar-profile"><img src="/images/portrait.jpg" alt="" width="38" height="38"/><div><strong>Dan Pashchenko</strong><span>Independent iOS engineer</span></div></div>
        <p className="mac-sidebar-label">Portfolio</p>
        <nav aria-label="Portfolio sections">{sections.map(section => navLink(section, 'mac-sidebar-link'))}</nav>
        <p className="mac-sidebar-label mac-resources-label">Resources</p>
        <a href={resume} download="dan-pashchenko-resume.pdf" className="mac-sidebar-link"><MacIcon name="document"/><span>Resume.pdf</span><span className="mac-file-size">PDF</span></a>
        <a href="https://www.toptal.com/developers/resume/bogdan-pashchenko" target="_blank" rel="noreferrer" className="mac-sidebar-link"><MacIcon name="link"/><span>Toptal profile</span><MacIcon name="external" className="mac-tiny-icon"/></a>
        <div className="mac-sidebar-footer"><MacIcon name="phone"/><span>Built around native iOS.</span></div>
      </aside>
      <nav className="mac-mobile-navigation" aria-label="Portfolio sections on mobile">{sections.map(section => navLink(section, 'mac-mobile-link'))}</nav>
      <main id="mac-content" ref={content} className="mac-content" tabIndex="-1" aria-label={current.title}>
        <div hidden={view !== 'overview'}><OverviewView navigate={navigate}/></div>
        <div hidden={view !== 'work'}><WorkView selectedProject={selectedProject} onSelectProject={setSelectedProject}/></div>
        <div hidden={view !== 'expertise'}><ExpertiseView/></div>
        <div hidden={view !== 'skills'}><SkillsView/></div>
        <div hidden={view !== 'contact'}><ContactView/></div>
      </main>
      <footer className="mac-statusbar"><span>Dan Pashchenko</span><span>{view === 'work' ? '3 selected projects' : view === 'skills' ? '52 skills · 6 categories' : 'Independent iOS engineer'}</span></footer>
    </div>

    {minimized && <div className="mac-restore"><img src="/images/dan-mark.svg?v=cut-d-3" width="58" height="58" alt=""/><h1>Portfolio minimized</h1><button className="mac-content-button mac-content-button-primary" onClick={() => setMinimized(false)}>Open portfolio</button></div>}
    <nav className="mac-dock" aria-label="Portfolio dock">{sections.map(section => <a key={section.id} href={`#${section.id}`} className={`mac-dock-item mac-dock-${section.id}${view === section.id && !minimized ? ' is-active' : ''}`} aria-label={section.title} aria-current={view === section.id ? 'page' : undefined} onClick={event => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); navigate(section.id); }}><span className="mac-dock-tooltip">{section.title}</span><span className="mac-dock-tile">{section.id === 'overview' ? <img src="/images/dan-mark.svg?v=cut-d-3" width="36" height="36" alt=""/> : <MacIcon name={section.icon}/>}</span></a>)}<span className="mac-dock-divider"/><a className="mac-dock-item mac-dock-resume" href={resume} download="dan-pashchenko-resume.pdf" aria-label="Download resume PDF"><span className="mac-dock-tooltip">Resume.pdf</span><span className="mac-dock-tile"><MacIcon name="document"/></span></a></nav>

    <dialog className="mac-search-dialog" ref={searchDialog} aria-labelledby="mac-search-title" onClick={event => { if (event.target === event.currentTarget) searchDialog.current.close(); }}>
      <form method="dialog" className="mac-search-top"><MacIcon name="search"/><label className="mac-sr-only" id="mac-search-title" htmlFor="mac-search-input">Search portfolio</label><input id="mac-search-input" ref={searchInput} value={query} onChange={event => setQuery(event.target.value)} placeholder="Search portfolio…" autoComplete="off"/><button className="mac-icon-button" aria-label="Close search"><MacIcon name="close"/></button></form>
      <div className="mac-search-results">{results.length ? results.map(section => <button key={section.id} onClick={() => navigate(section.id)}><span className={`mac-search-symbol mac-symbol-${section.id}`}><MacIcon name={section.icon}/></span><span><strong>{section.title}</strong><small>{section.caption}</small></span><MacIcon name="chevronRight"/></button>) : <p className="mac-search-empty">No sections found. Try “work”, “Swift” or “contact”.</p>}</div>
      <div className="mac-search-footer">Navigate the portfolio <span><kbd>esc</kbd> to close</span></div>
    </dialog>
  </div>;
}
