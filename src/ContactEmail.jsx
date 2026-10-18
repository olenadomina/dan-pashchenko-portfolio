import React, { useEffect, useRef, useState } from 'react';
import './ContactEmail.css';
import Typographic from './Typographic.jsx';
import RollingText from './RollingText.jsx';

export default function ContactEmail({ email }) {
  const [status, setStatus] = useState('idle');
  const resetTimer = useRef(null);
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearTimeout(resetTimer.current);
    };
  }, []);

  async function copyEmail() {
    clearTimeout(resetTimer.current);
    setStatus('copying');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(email);
      if (!mounted.current) return;
      setStatus('copied');
      resetTimer.current = setTimeout(() => setStatus('idle'), 2200);
    } catch {
      if (!mounted.current) return;
      setStatus('error');
      resetTimer.current = setTimeout(() => setStatus('idle'), 6000);
    }
  }

  return <Typographic><div className="contact-email">
    <a className="contact-email-address roll-link" href={`mailto:${email}`}><RollingText>{email}</RollingText></a>
    <button type="button" className={`contact-email-copy${status === 'copied' ? ' is-copied' : ''}`} onClick={copyEmail} disabled={status === 'copying'} aria-label="Copy email address" title={status === 'copied' ? 'Copied' : 'Copy email address'}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        {status === 'copied' ? <path d="m5 12 4.5 4.5L19 7" /> : <><rect x="8" y="8" width="12" height="13" rx="2" /><path d="M15 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" /></>}
      </svg>
    </button>
    <span className={`contact-email-feedback${status === 'error' ? ' is-error' : ''}`} role="status" aria-live="polite" aria-atomic="true">
      {status === 'copied' ? 'Email address copied.' : status === 'error' ? 'Couldn’t copy. You can select and copy the address.' : ''}
    </span>
  </div></Typographic>;
}
