import './RollingText.css';

export default function RollingText({ children }) {
  return <span className="rolling-text"><span className="rolling-text-track"><span>{children}</span><span aria-hidden="true">{children}</span></span></span>;
}
