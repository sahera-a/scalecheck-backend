import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
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

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function AnimatedStat({ value, suffix = "", label }) {
  const [ref, visible] = useReveal();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1200;
    const stepTime = 16;
    const steps = duration / stepTime;
    const increment = value / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [visible, value]);

  return (
    <div ref={ref} className="stat-item">
      <div className="stat-number">{count}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function RevealSection({ id, className = "", children }) {
  const [ref, visible] = useReveal();
  return (
    <section
      id={id}
      ref={ref}
      className={`landing-content-section ${className} ${visible ? "in-view" : ""}`}
    >
      {children}
    </section>
  );
}

function Landing({ onStart, theme, onToggleTheme }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="landing">
      <nav className="landing-nav">
  <span className="logo">ScaleCheck</span>
  <div className="nav-right">
    <a href="#about">About</a>
    <a href="#faq">FAQ</a>
    <a href="#contact">Contact</a>
    <ThemeToggle theme={theme} onToggle={onToggleTheme} />
  </div>
</nav>

      <section className="hero">
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
        <div className="hero-content">
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
        </div>
        <div className="hero-graphic">
          <svg viewBox="0 0 300 300" className="radar-illustration">
            <polygon points="150,30 260,110 220,240 80,240 40,110" fill="none" stroke="var(--gold)" strokeWidth="1.5" opacity="0.5"/>
            <polygon points="150,70 220,125 195,215 105,215 80,125" fill="none" stroke="var(--gold)" strokeWidth="1.5" opacity="0.7"/>
            <polygon points="150,110 185,140 170,190 130,190 115,140" fill="var(--gold)" opacity="0.25" stroke="var(--gold)" strokeWidth="1.5"/>
            <line x1="150" y1="30" x2="150" y2="240" stroke="var(--gold)" strokeWidth="0.5" opacity="0.3"/>
            <line x1="40" y1="110" x2="220" y2="240" stroke="var(--gold)" strokeWidth="0.5" opacity="0.3"/>
            <line x1="260" y1="110" x2="80" y2="240" stroke="var(--gold)" strokeWidth="0.5" opacity="0.3"/>
            <circle cx="150" cy="30" r="4" fill="var(--gold)"/>
            <circle cx="260" cy="110" r="4" fill="var(--gold)"/>
            <circle cx="220" cy="240" r="4" fill="var(--gold)"/>
            <circle cx="80" cy="240" r="4" fill="var(--gold)"/>
            <circle cx="40" cy="110" r="4" fill="var(--gold)"/>
          </svg>
        </div>
      </section>

      <div className="stat-strip">
        <AnimatedStat value={44} suffix="%" label="average ownership maturity gap in stalled pilots" />
        <AnimatedStat value={5} suffix="" label="readiness dimensions scored" />
        <AnimatedStat value={3} suffix="" label="structural failure modes diagnosed" />
      </div>

      <RevealSection id="about">
        <h2>Three Ways Pilots Stall</h2>
        <p className="section-subtitle">
          Grounded in research on why enterprise AI pilots fail to reach
          production — it's rarely the budget.
        </p>
        <div className="pillars">
          <div className="pillar-card">
            <svg className="pillar-icon" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="16" r="8" stroke="var(--gold)" strokeWidth="2.5"/>
              <path d="M8 40c0-8.8 7.2-14 16-14s16 5.2 16 14" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round"/>
              <path d="M24 22v6M20 26l4 2 4-2" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h3>Ownership Dissolution</h3>
            <p>No durable, named accountability for the initiative's full lifecycle — momentum dies when its champion moves on.</p>
          </div>
          <div className="pillar-card">
            <svg className="pillar-icon" viewBox="0 0 48 48" fill="none">
              <rect x="8" y="8" width="14" height="14" rx="2" stroke="var(--gold)" strokeWidth="2.5"/>
              <rect x="26" y="26" width="14" height="14" rx="2" stroke="var(--gold)" strokeWidth="2.5"/>
              <path d="M22 15h8M15 22v8" stroke="var(--navy)" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <h3>Integration Tax</h3>
            <p>The system works as a demo but was never built to connect to real production data and workflows.</p>
          </div>
          <div className="pillar-card">
            <svg className="pillar-icon" viewBox="0 0 48 48" fill="none">
              <path d="M8 36V16a2 2 0 0 1 2-2h26a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H18l-8 8v-4z" stroke="var(--gold)" strokeWidth="2.5" strokeLinejoin="round"/>
              <path d="M14 20h20M14 26h12" stroke="var(--navy)" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <h3>Narrative Capture</h3>
            <p>The story of success outruns the actual, measured evidence of value.</p>
          </div>
        </div>
      </RevealSection>

      <RevealSection id="how-it-works" className="section-alt">
        <h2>How It Works</h2>
        <div className="steps-flow">
          <div className="step-flow-item">
            <div className="step-flow-number">1</div>
            <h4>Tell us about your org</h4>
            <p>A quick intake — name, sector, team size.</p>
          </div>
          <div className="step-flow-item">
            <div className="step-flow-number">2</div>
            <h4>Answer 25 questions</h4>
            <p>Five short questions across five readiness dimensions, tailored to your sector.</p>
          </div>
          <div className="step-flow-item">
            <div className="step-flow-number">3</div>
            <h4>Get your diagnostic</h4>
            <p>A scored radar chart, risk flags, and a generated report.</p>
          </div>
        </div>
      </RevealSection>

      <RevealSection id="faq">
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
      </RevealSection>

      <RevealSection id="contact" className="section-alt">
        <h2>Contact</h2>
        <div className="contact-box">
          <p>Questions about the framework or your results?</p>
          <a href="mailto:Helloscalecheck@OIN.com">Helloscalecheck@OIN.com</a>
        </div>
      </RevealSection>

      <footer className="landing-footer">
        ScaleCheck — built on original research into stalled AI pilot-to-production conversion.
      </footer>
    </div>
  );
}

export default Landing;