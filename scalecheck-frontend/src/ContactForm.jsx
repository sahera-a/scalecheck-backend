import { useState } from "react";
import axios from "axios";

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus("sending");
    try {
      await axios.post("https://ion-scale-check-diagnostic.onrender.com/contact", {
        name,
        email,
        message,
      });
      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div className="contact-box">
        <p>Thanks — your message has been received. I'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="contact-box">
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {status === "error" && (
          <p className="error">Something went wrong — please try again.</p>
        )}
        <button type="submit" className="primary-button" disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}

export default ContactForm;