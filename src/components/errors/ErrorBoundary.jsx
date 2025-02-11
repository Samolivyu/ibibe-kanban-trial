import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Ndio hii shida:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Iko shida mkuu.</h1>;
    }

    // Ensure children are valid React elements
    const children = React.Children.map(this.props.children, child => {
      if (React.isValidElement(child)) {
        return child;
      }
      console.warn("Invalid React child found:", child);
      return null; // or handle invalid children as needed
    });

    return <>{children}</>;
  }
}

export default ErrorBoundary;
