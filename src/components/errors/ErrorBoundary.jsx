import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

<<<<<<< HEAD
  componentDidCatch(error, info) {
    console.error("Error caught by Error Boundary: ", error, info);
=======
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
>>>>>>> 7672b03 (This is the updated kanban feature. Working CSS and functionality. Ready for deployment.)
  }

  render() {
    if (this.state.hasError) {
<<<<<<< HEAD
      return <h1>Iko shida mkuu!</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
=======
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
>>>>>>> 7672b03 (This is the updated kanban feature. Working CSS and functionality. Ready for deployment.)
