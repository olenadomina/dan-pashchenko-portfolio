import './ContactCode.css';

const Keyword = ({ children }) => <span className="contact-code-keyword">{children}</span>;
const Type = ({ children }) => <span className="contact-code-type">{children}</span>;
const Value = ({ children }) => <span className="contact-code-value">{children}</span>;

const lines = [
  <><Keyword>import</Keyword> <Type>SwiftUI</Type></>,
  '',
  <><Keyword>struct</Keyword> <Type>YourNextApp</Type>: <Type>App</Type> {'{'}</>,
  <>    <Keyword>var</Keyword> body: <Keyword>some</Keyword> <Type>Scene</Type> {'{'}</>,
  <>        <Type>WindowGroup</Type> {'{'}</>,
  <>            <Type>ContentView</Type>()</>,
  <>        {'}'}</>,
  <>    {'}'}</>,
  <>{'}'}</>,
  '',
  <><Keyword>struct</Keyword> <Type>ContentView</Type>: <Type>View</Type> {'{'}</>,
  <>    <Keyword>var</Keyword> body: <Keyword>some</Keyword> <Type>View</Type> {'{'}</>,
  <>        <Type>NavigationStack</Type> {'{'}</>,
  <>            <Type>VStack</Type>(spacing: <Value>24</Value>) {'{'}</>,
  <>                <Type>Image</Type>(systemName: <Value>"spark"</Value>)</>,
  <>                <Type>Text</Type>(<Value>"Your next idea."</Value>)</>,
  <>                    .font(.title)</>,
  <>            {'}'}</>,
  <>            .padding()</>,
  <>        {'}'}</>,
  <>    {'}'}</>,
  <>{'}'}</>,
  '',
  <><Keyword>#Preview</Keyword> {'{'}</>,
  <>    <Type>ContentView</Type>()</>,
  <>{'}'}</>,
];

export default function ContactCode({ variant = 'contact' }) {
  return (
    <div className={`contact-code${variant === 'hero' ? ' contact-code-hero' : ''}`} aria-hidden="true">
      <div className="contact-code-editor">
        {[0, 1].map((copy) => (
          <div className="contact-code-block" key={copy}>
            <div className="contact-code-file">YourNextApp.swift</div>
            <div className="contact-code-lines">
              {lines.map((line, index) => (
                <div className={`contact-code-line${index === 14 ? ' contact-code-line-current' : ''}`} key={index}>
                  <span className="contact-code-number">{index + 1}</span>
                  <code>{line || '\u00a0'}</code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
