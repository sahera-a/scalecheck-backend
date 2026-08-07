function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle dark mode">
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;