import './BadgeFallback.css';

// This stays in the initial bundle so the strap is visible before Three.js loads.
export default function BadgeFallback({ loading = false, flipped = false }) {
  return <div className={`badge-fallback${loading ? ' badge-fallback--loading' : ''}`} aria-hidden="true">
    <div className="badge-fallback__strap"><span>iOS ENGINEER</span></div>
    <div className="badge-fallback__card">
      <span className="badge-fallback__clasp" />
      <img
        src={flipped ? '/images/badge-back.svg?v=badge-clean-3' : '/images/badge-front.svg?v=badge-clean-3'}
        alt=""
        width="1024"
        height="1440"
        decoding="async"
        draggable="false"
      />
    </div>
  </div>;
}
