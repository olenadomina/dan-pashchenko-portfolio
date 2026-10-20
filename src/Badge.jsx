import { Component, useCallback, useLayoutEffect, useRef, useState } from 'react';
import Lanyard from './Lanyard';
import BadgeFallback from './BadgeFallback';
import './Lanyard.css';

class BadgeSceneBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    this.props.onError(error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function Badge({
  size = 0.5,
  strapLength = 0.4,
  strapWidth = 0.75,
  className = '',
  style
}) {
  const stageRef = useRef(null);
  const [frame, setFrame] = useState({ width: window.innerWidth, height: 900 });
  const [status, setStatus] = useState('loading');
  const [flipSignal, setFlipSignal] = useState(0);
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const resize = () => setFrame({ width: stage.clientWidth, height: Math.max(1, stage.clientHeight) });
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);
  const compact = frame.width <= 900;
  // Fixed mobile card dimensions keep it above the copy as the hero grows taller.
  const cardPixels = compact ? Math.min(300, Math.max(248, frame.width * 0.71)) : Math.min(440, frame.height * size);
  const topPixels = compact ? 155 : frame.height * (0.12 + 0.3 * strapLength);
  const cardSize = cardPixels / frame.height;
  const length = Math.max(0, (topPixels / frame.height - 0.12) / 0.3);
  const restingTop = (0.12 + 0.3 * length) * frame.height;
  const anchor = compact ? 'center' : 'left';
  const ready = status === 'ready';
  const handleReady = useCallback(() => setStatus('ready'), []);
  const handleError = useCallback(() => setStatus('error'), []);
  const handleCardTop = useCallback(top => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.dataset.cardTop = String(top);
  }, []);

  useLayoutEffect(() => {
    stageRef.current?.dispatchEvent(new Event('badge-bounds-change', { bubbles: true }));
  }, [status, frame.width, frame.height, restingTop]);

  return (
    <div
      ref={stageRef}
      className={`badge-stage ${ready ? 'is-ready' : status === 'error' ? 'is-fallback' : 'is-loading'} ${className}`.trim()}
      data-card-rest-top={restingTop}
      role="button"
      tabIndex={status === 'loading' ? -1 : 0}
      aria-busy={status === 'loading'}
      aria-label="Dan Pashchenko’s interactive badge. Press Enter or Space to flip."
      onKeyDown={event => {
        if (status !== 'loading' && (event.key === 'Enter' || event.key === ' ') && !event.repeat) {
          event.preventDefault();
          setFlipSignal(value => value + 1);
        }
      }}
      onClick={() => {
        if (status === 'error') setFlipSignal(value => value + 1);
      }}
      style={{
        '--badge-anchor': compact ? '50%' : '27%',
        '--badge-card-size': `${cardSize * 100}%`,
        '--badge-card-top': `${(0.12 + 0.3 * length) * 100}%`,
        ...style
      }}
    >
      {status === 'error' && <BadgeFallback flipped={flipSignal % 2 !== 0} />}

      {status !== 'error' && (
        <BadgeSceneBoundary onError={handleError}>
          <Lanyard
            frontImage="/images/badge-front.svg?v=badge-clean-3"
            backImage="/images/badge-back.svg?v=badge-clean-3"
            strapImage="/images/badge-strap.svg?v=engineer-1"
            cardColor="#e7e9eb"
            strapColor="#344351"
            finish="matte"
            metal="graphite"
            cornerRadius={0.12}
            anchor={anchor}
            size={cardSize}
            strapLength={length}
            strapWidth={strapWidth}
            damping={0.6}
            breeze={0}
            introAngle={compact ? 8 : 18}
            flipSignal={flipSignal}
            onReady={handleReady}
            onError={handleError}
            onCardTopChange={handleCardTop}
            className="badge-stage__scene"
          />
        </BadgeSceneBoundary>
      )}


    </div>
  );
}
