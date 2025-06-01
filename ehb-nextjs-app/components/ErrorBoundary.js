"use client";
import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to service if needed
    // console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-100 text-red-700 p-6 rounded shadow text-center">
          <h2 className="text-xl font-bold mb-2">Something went wrong.</h2>
          <div className="text-sm">{this.state.error?.toString()}</div>
        </div>
      );
    }
    return this.props.children;
  }
} 