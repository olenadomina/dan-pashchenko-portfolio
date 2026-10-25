import { useEffect } from 'react';

// After https://vladsosnenko-portfolio.netlify.app/: the deck pins below the header and
// each next case slides up over the previous one, which steps back and darkens.
const STACK_QUERY = '(prefers-reduced-motion: no-preference) and (min-width: 1001px) and (min-height: 760px)';
const STEP = 14;
const TOP_GAP = 20;
const BOTTOM_GAP = 24;
const MAX_CARD = 760;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function useWorkStack(sectionRef) {
  useEffect(() => {
    const section = sectionRef.current;
    const track = section?.querySelector('.workspace-projects');
    const cards = [...(section?.querySelectorAll('.workspace-window') ?? [])];
    if (!track || !cards.length) return undefined;
    const query = window.matchMedia(STACK_QUERY);
    let frame = 0;
    let layout = null;
    let measuredWidth = 0;

    const measure = () => {
      measuredWidth = window.innerWidth;
      const viewport = window.innerHeight;
      const top = (document.querySelector('.site-header')?.offsetHeight ?? 98) + TOP_GAP;
      const rise = STEP * (cards.length - 1);
      const card = Math.min(MAX_CARD, viewport - top - BOTTOM_GAP - rise);
      const deck = card + rise;
      const stickTop = Math.max(top, top + (viewport - top - BOTTOM_GAP - deck) / 2);
      const step = viewport * 0.9;
      layout = { rise, stickTop, step, below: viewport - stickTop + 60 };
      section.style.setProperty('--stack-card-h', `${card}px`);
      section.style.setProperty('--stack-deck-h', `${deck}px`);
      section.style.setProperty('--stack-top', `${stickTop}px`);
      section.style.setProperty('--stack-length', `${step * (cards.length - 1)}px`);
    };

    const update = () => {
      frame = 0;
      if (!layout) return;
      const { rise, stickTop, step, below } = layout;
      const progress = clamp((stickTop - track.getBoundingClientRect().top) / step, 0, cards.length - 1);
      cards.forEach((card, index) => {
        const arrived = index === 0 ? 1 : clamp(progress - index + 1, 0, 1);
        // How many cases already lie on top of this one, fractional while one slides in.
        const depth = Math.max(0, progress - index);
        const y = below + (rise - below) * arrived - depth * STEP;
        card.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${(1 - depth * 0.05).toFixed(4)})`;
        card.style.setProperty('--shade', Math.min(0.45, depth * 0.22).toFixed(3));
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Brings a case to the top of the deck (for links to #kuni etc. and keyboard focus).
    // Instant, so the page's smooth scrolling does not replay the pinned hero on the way.
    const scrollToCard = index => {
      if (!layout) return;
      const trackTop = track.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: trackTop - layout.stickTop + index * layout.step, behavior: 'instant' });
    };

    const onFocus = event => {
      if (!event.target.matches(':focus-visible')) return;
      const index = cards.findIndex(card => card.contains(event.target));
      if (index >= 0) scrollToCard(index);
    };

    const disable = () => {
      layout = null;
      section.removeAttribute('data-stack');
      ['--stack-card-h', '--stack-deck-h', '--stack-top', '--stack-length'].forEach(name => section.style.removeProperty(name));
      cards.forEach(card => {
        card.style.removeProperty('transform');
        card.style.removeProperty('--shade');
      });
    };

    const apply = () => {
      if (!query.matches || cards.length < 2) {
        disable();
        return;
      }
      section.setAttribute('data-stack', '');
      measure();
      update();
    };

    // A touch browser's toolbar changes only the height while scrolling; re-measuring
    // then would shift the deck under the finger, so wait for a real width change.
    const touch = window.matchMedia('(pointer: coarse)');
    const onResize = () => {
      if (!query.matches || !layout) return;
      if (touch.matches && window.innerWidth === measuredWidth) return;
      measure();
      schedule();
    };

    // The browser repeats its own fragment scroll on load, which would use the
    // translated card position, so open a linked case only after that.
    const openLinkedCase = () => {
      const index = cards.findIndex(card => card.id === window.location.hash.slice(1));
      if (index < 0) return;
      if (layout) scrollToCard(index);
      else cards[index].scrollIntoView({ block: 'start', behavior: 'instant' });
    };
    const onLoad = () => requestAnimationFrame(openLinkedCase);

    apply();
    if (document.readyState === 'complete') openLinkedCase();
    else window.addEventListener('load', onLoad, { once: true });

    window.addEventListener('hashchange', openLinkedCase);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', onResize);
    query.addEventListener('change', apply);
    section.addEventListener('focusin', onFocus);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('load', onLoad);
      window.removeEventListener('hashchange', openLinkedCase);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
      query.removeEventListener('change', apply);
      section.removeEventListener('focusin', onFocus);
      disable();
    };
  }, [sectionRef]);
}
