import { useEffect, useRef } from 'react';
import './HeroCodeWords.css';

const words = ['SwiftUI', 'UIKit', 'Metal', 'Passkeys', 'async/await', 'Core Image'];

export default function HeroCodeWords() {
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const repositionRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const elements = wordRefs.current;
    let positions = [];
    let previousMeasurements = '';

    function measure() {
      return {
        width: container.clientWidth,
        height: container.clientHeight,
        words: elements.map(element => ({ width: element.offsetWidth, height: element.offsetHeight + 4 })),
      };
    }

    function placeWord(index, bounds, occupied, previous) {
      const size = bounds.words[index];
      const padding = bounds.width <= 760 ? 16 : 24;
      const minX = Math.min(padding, Math.max(0, (bounds.width - size.width) / 2));
      const minY = Math.min(padding, Math.max(0, (bounds.height - size.height) / 2));
      const rangeX = Math.max(0, bounds.width - padding - size.width - minX);
      const rangeY = Math.max(0, bounds.height - padding - size.height - minY);
      const minimumMove = Math.min(84, Math.hypot(rangeX, rangeY) * .28);
      const gap = 12;
      let chosen;
      let bestScore = Infinity;

      for (let attempt = 0; attempt < 64; attempt += 1) {
        const candidate = { x: minX + Math.random() * rangeX, y: minY + Math.random() * rangeY, ...size };
        const overlap = occupied.reduce((area, other) => {
          if (!other) return area;
          const width = Math.max(0, Math.min(candidate.x + size.width + gap, other.x + other.width + gap) - Math.max(candidate.x, other.x));
          const height = Math.max(0, Math.min(candidate.y + size.height + gap, other.y + other.height + gap) - Math.max(candidate.y, other.y));
          return area + width * height;
        }, 0);
        const distance = previous ? Math.hypot(candidate.x - previous.x, candidate.y - previous.y) : Infinity;
        const score = overlap * 1000 + Math.max(0, minimumMove - distance);
        if (score < bestScore) {
          chosen = candidate;
          bestScore = score;
        }
        if (score === 0) break;
      }

      elements[index].style.left = `${chosen.x}px`;
      elements[index].style.top = `${chosen.y}px`;
      return chosen;
    }

    function layoutWords() {
      const bounds = measure();
      const measurements = JSON.stringify(bounds);
      if (!bounds.width || !bounds.height || measurements === previousMeasurements) return;
      previousMeasurements = measurements;
      const previous = positions;
      positions = [];
      // Place the widest labels first so the remaining words can fit around them.
      bounds.words.map((size, index) => ({ index, width: size.width }))
        .sort((a, b) => b.width - a.width)
        .forEach(({ index }) => {
          positions[index] = placeWord(index, bounds, positions, previous[index]);
        });
      container.dataset.positioned = 'true';
    }

    repositionRef.current = index => {
      const bounds = measure();
      if (!bounds.width || !bounds.height) return;
      positions[index] = placeWord(index, bounds, positions.filter((_, otherIndex) => otherIndex !== index), positions[index]);
    };

    layoutWords();
    const observer = new ResizeObserver(layoutWords);
    observer.observe(container);
    elements.forEach(element => observer.observe(element));
    return () => {
      observer.disconnect();
      repositionRef.current = null;
    };
  }, []);

  return (
    <div className="hero-code-words" ref={containerRef} aria-hidden="true">
      {words.map((word, index) => (
        <span
          className={`hero-code-word hero-code-word-${index + 1}`}
          key={word}
          ref={element => { wordRefs.current[index] = element; }}
          onAnimationIteration={event => {
            if (event.animationName === 'hero-code-word-fade') repositionRef.current?.(index);
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}
