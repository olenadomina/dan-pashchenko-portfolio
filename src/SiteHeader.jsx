import { useEffect, useRef } from 'react';
import RollingText from './RollingText';

export default function SiteHeader() {
  const headerRef = useRef(null);

  useEffect(() => {
    const header = headerRef.current;
    const hero = document.getElementById('home');
    const updatePosition = () => {
      const headerBounds = header.getBoundingClientRect();
      const stage = hero?.querySelector('.badge-stage');
      const fallback = stage?.querySelector('.badge-fallback__card');
      const projectedTop = stage?.dataset.cardTop;
      const cardTop = fallback
        ? fallback.getBoundingClientRect().top
        : projectedTop !== undefined
          ? stage.getBoundingClientRect().top + Number(projectedTop)
          : null;
      // The strap scrolls naturally through the transparent header. Fill starts
      // only when the card itself crosses the header, completing over 24px.
      const fill = !hero || hero.getBoundingClientRect().bottom <= headerBounds.bottom
        ? 1
        : cardTop === null ? 0 : Math.min(1, Math.max(0, (headerBounds.bottom - cardTop) / 24));
      header.style.setProperty('--header-fill', String(fill));
    };
    updatePosition();
    window.addEventListener('scroll', updatePosition, { passive: true });
    document.addEventListener('badge-bounds-change', updatePosition);
    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(header);
    if (hero) resizeObserver.observe(hero);
    return () => {
      window.removeEventListener('scroll', updatePosition);
      document.removeEventListener('badge-bounds-change', updatePosition);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <header ref={headerRef} className="site-header">
      <a className="wordmark" href="#home" aria-label="Dan Pashchenko home">
        <img className="wordmark-symbol" src="/images/dan-mark.svg?v=cut-d-3" width="36" height="36" alt="" />
        <span className="wordmark-name">Dan <span>Pashchenko</span></span>
      </a>
      <nav aria-label="Main navigation">
        <a className="roll-link" href="#work"><RollingText>Selected work</RollingText></a>
        <a className="roll-link" href="#home"><RollingText>About</RollingText></a>
        <a className="nav-contact roll-link" href="#contact"><RollingText>Let’s talk</RollingText></a>
      </nav>
    </header>
  );
}
