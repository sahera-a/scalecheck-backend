function EmptyState({ title = "Nothing here yet", message = "Data will appear once available." }) {
  return (
    <div className="empty-state">
      <svg viewBox="0 0 64 64" className="empty-state-icon" fill="none">
        <rect x="8" y="16" width="48" height="36" rx="4" stroke="var(--gold)" strokeWidth="2.5"/>
        <path d="M8 26h48" stroke="var(--gold)" strokeWidth="2.5"/>
        <circle cx="32" cy="40" r="6" stroke="var(--navy)" strokeWidth="2" strokeDasharray="2 2"/>
      </svg>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

export default EmptyState;