import { useState } from "react";

const FAQS = [
  {
    q: "What is the OIN framework?",
    a: "OIN stands for Ownership, Integration, and Narrative — three structural failure modes behind why enterprise AI pilots stall before reaching production. This diagnostic scores your organization across five dimensions and flags which of the three you're most at risk of.",
  },
  {
    q: "How is my score calculated?",
    a: "Each of five dimensions — Ownership, Integration Readiness, Financial Value, Governance, and Organizational Transformation — is scored from your answers, then combined into risk flags for Ownership Dissolution, Integration Tax, and Narrative Capture.",
  },
  {
    q: "Is my data stored securely?",
    a: "Your responses are stored to generate your report and build anonymized benchmarks. No personally identifying information is required beyond your organization name.",
  },
  {
    q: "Can I retake the assessment?",
    a: "Yes — start over from the homepage any time. Each submission is stored independently.",
  },
  {
    q: "What do the risk flags actually mean?",
    a: "A flag means your score in that dimension fell below the threshold associated with that failure mode. It's a diagnostic signal pointing to where to focus first, not a verdict.",
  },
];

function Landing({ onStart }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="landing">
      <nav className="landing-nav">
        <span className="logo">ScaleCheck</span>
        <div>
          <a href="#about">About</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero">
        <h1>ScaleCheck</h1>
        <p>
          An OIN Diagnostic for Pilot-to-Production Readiness. Answer a short
          questionnaire and get a scored readiness report — plus the specific
          structural risk most likely to stall your AI initiative before it
          reaches production.
        </p>
        <button className="cta-button" onClick={onStart}>
          Start Your Diagnostic →
        </button>
      </section>

      <section className="landing-content-section" id="about">
        <h2>Three Ways Pilots Stall</h2>
        <p className="section-subtitle">
          Grounded in research on why enterprise AI pilots fail to reach
          production — it's rarely the budget.
        </p>
        <div className="pillars">
          <div className="pillar-card">
            <div className="pillar-letter">O</div>
            <h3>Ownership Dissolution</h3>
            <p>No durable, named accountability for the initiative's full lifecycle — momentum dies when its champion moves on.</p>
          </div>
          <div className="pillar-card">
            <div className="pillar-letter">I</div>
            <h3>Integration Tax</h3>
            <p>The system works as a demo but was never built to connect to real production data and workflows.</p>
          </div>
          <div className="pillar-card">
            <div className="pillar-letter">N</div>
            <h3>Narrative Capture</h3>
            <p>The story of success outruns the actual, measured evidence of value.</p>
          </div>
        </div>
      </section>

      <section className="landing-content-section" id="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-flow">
          <div className="step-flow-item">
            <div className="step-flow-number">1</div>
            <h4>Tell us about your org</h4>
            <p>A quick intake — name, industry, team size.</p>
          </div>
          <div className="step-flow-item">
            <div className="step-flow-number">2</div>
            <h4>Answer 25 questions</h4>
            <p>Five short questions across five readiness dimensions.</p>
          </div>
          <div className="step-flow-item">
            <div className="step-flow-number">3</div>
            <h4>Get your diagnostic</h4>
            <p>A scored radar chart, risk flags, and a generated report.</p>
          </div>
        </div>
      </section>

      <section className="landing-content-section" id="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className={`faq-item ${openIndex === i ? "open" : ""}`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="faq-question">
                {item.q}
                <span className="faq-toggle-icon">+</span>
              </div>
              <div className="faq-answer">{item.a}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-content-section" id="contact">
        <h2>Contact</h2>
        <div className="contact-box">
          <p>Questions about the framework or your results?</p>
          <a href="mailto:hello@scalecheck.example.com">hello@scalecheck.example.com</a>
        </div>
      </section>

      <footer className="landing-footer">
        ScaleCheck — built on original research into stalled AI pilot-to-production conversion.
      </footer>
    </div>
  );
}

export default Landing;