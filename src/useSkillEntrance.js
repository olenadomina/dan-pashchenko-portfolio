import { useEffect } from 'react';

// Animate the existing text nodes: their final flex layout never moves.
export default function useSkillEntrance(sectionRef) {
  useEffect(() => {
    const section = sectionRef.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!section || motion.matches || !window.IntersectionObserver || !Element.prototype.animate) return;

    const groups = [...section.querySelectorAll('.skills-group')];
    const animations = new Set();
    const played = new Set();
    let disposed = false;

    const reveal = group => {
      if (disposed || played.has(group)) return;
      played.add(group);
      const list = group.querySelector('.skills-tags');
      const pills = [...list.children];
      const listBounds = list.getBoundingClientRect();
      // Read the resting layout before starting any animations.
      const bounds = pills.map(pill => pill.getBoundingClientRect());
      const groupIndex = groups.indexOf(group);
      let remaining = pills.length;
      group.dataset.motion = 'falling';

      pills.forEach((pill, index) => {
        const rect = bounds[index];
        const spread = ((index * 29 + groupIndex * 17) % 73) - 36;
        const origin = Math.min(listBounds.width - rect.width / 2,
          Math.max(rect.width / 2, listBounds.width * 0.46 + spread));
        const x = origin - (rect.left - listBounds.left + rect.width / 2);
        const y = -42 - (rect.top - listBounds.top) - (index % 3) * 9;
        const turn = (index % 2 ? -1 : 1) * (7 + (index * 7) % 10);
        const transform = (dx, dy, angle, scale = 1) =>
          `translate3d(${dx}px,${dy}px,0) rotate(${angle}deg) scale(${scale})`;
        const animation = pill.animate([
          { offset: 0, opacity: 0, transform: transform(x, y, turn, 0.9), easing: 'cubic-bezier(.3,0,.7,.4)' },
          { offset: 0.16, opacity: 1, transform: transform(x * 0.82, y * 0.86, turn * 0.8, 0.96), easing: 'cubic-bezier(.32,0,.72,1)' },
          { offset: 0.62, opacity: 1, transform: transform(x * -0.025, 7, turn * -0.15, 1.02), easing: 'cubic-bezier(.2,.7,.3,1)' },
          { offset: 0.8, opacity: 1, transform: transform(0, -3, turn * 0.04), easing: 'cubic-bezier(.4,0,.6,1)' },
          { offset: 1, opacity: 1, transform: transform(0, 0, 0) }
        ], {
          duration: 780 + (index % 3) * 55,
          delay: ((index * 37) % pills.length) * 28 + (groupIndex % 2) * 65,
          fill: 'both'
        });
        animations.add(animation);
        animation.onfinish = () => {
          animations.delete(animation);
          animation.cancel();
          if (--remaining === 0) group.dataset.motion = 'settled';
        };
      });
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        reveal(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });

    groups.forEach(group => {
      group.dataset.motion = 'waiting';
      observer.observe(group);
    });

    const stop = () => {
      disposed = true;
      observer.disconnect();
      animations.forEach(animation => {
        animation.onfinish = null;
        animation.cancel();
      });
      animations.clear();
      groups.forEach(group => delete group.dataset.motion);
    };
    const onMotionChange = event => { if (event.matches) stop(); };
    motion.addEventListener('change', onMotionChange);
    return () => {
      stop();
      motion.removeEventListener('change', onMotionChange);
    };
  }, [sectionRef]);
}
