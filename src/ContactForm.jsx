import './ContactForm.css';
import RollingText from './RollingText.jsx';

export default function ContactForm({ email }) {
  return <form className="contact-form" method="POST" action={`https://formspree.io/${email}`}>
    <label className="contact-form-field">
      <span>Your message</span>
      <textarea name="message" placeholder="Tell me about your project…" rows="5" required />
    </label>
    <label className="contact-form-field">
      <span>Your email or other contact</span>
      <input type="text" name="contact" autoComplete="email" placeholder="How can I reach you?" required />
    </label>
    <input type="hidden" name="_gotcha" value="" />
    <button className="contact-form-send roll-link" type="submit"><RollingText>Send message</RollingText></button>
  </form>;
}
