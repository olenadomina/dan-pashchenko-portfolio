import React, { Suspense, lazy } from 'react';
import WorkSpace from './WorkSpace.jsx';
import ContactCode from './ContactCode.jsx';
import Expertise from './Expertise.jsx';
import Typographic from './Typographic.jsx';
import ContactForm from './ContactForm.jsx';
import SocialLinks from './SocialLinks.jsx';
import SiteHeader from './SiteHeader.jsx';
import Skills from './Skills.jsx';

const Badge = lazy(() => import('./Badge.jsx'));
const email = 'contactiosengineer@gmail.com';
const toptal = 'https://www.toptal.com/developers/resume/bogdan-pashchenko';

export default function App({ renderBadge = true }) {
  return <Typographic>
    <a href="#main" className="skip-link">Skip to content</a>
    <SiteHeader />
    <main id="main">
      <section id="home" className="hero" aria-labelledby="hero-title">
        <ContactCode variant="hero" />
        <div className="hero-badge">{renderBadge && <Suspense fallback={null}><Badge /></Suspense>}</div>
        <div className="hero-content">
          <h1 id="hero-title">Hi, I’m Dan.</h1>
          <p className="hero-role">Strong iOS Engineer</p>
          <p className="hero-promise">Clean &amp; stable code.<br />Great value for&nbsp;money</p>
          <p className="hero-description">I build native apps from scratch and help take existing products to the next level.</p>
        </div>
        <dl className="stats-grid hero-stats" aria-label="Experience at a glance"><div><dt>years in iOS</dt><dd>14</dd></div><div><dt>years in Swift</dt><dd>12</dd></div><div><dt>iOS apps made</dt><dd>40+</dd></div><div><dt>years in IT</dt><dd>20</dd></div></dl>
      </section>

      <WorkSpace />

      <Expertise profileUrl={toptal} />

      <Skills />

      <section id="contact" className="contact-section" aria-labelledby="contact-title"><ContactCode /><p className="eyebrow section-label">YOUR NEXT iOS PROJECT</p><h2 id="contact-title">Want to discuss your&nbsp;project?</h2><p className="contact-description">Just drop me a&nbsp;line and I’ll get back to&nbsp;you</p><div className="contact-actions"><ContactForm email={email} /></div><div className="contact-footer"><span>Dan Pashchenko<br /><span className="footer-role">Independent iOS engineer</span></span><SocialLinks /><a className="back-top" href="#home" aria-label="Back to top">↑</a></div></section>
    </main>
  </Typographic>;
}
