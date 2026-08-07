import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ScaleCheck error boundary caught:", error, info);
  }

  handleReset = () => {
    window.location.hash = "";
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>An unexpected error occurred. You can try reloading ScaleCheck.</p>
          <button className="primary-button" onClick={this.handleReset}>
            Reload ScaleCheck
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;