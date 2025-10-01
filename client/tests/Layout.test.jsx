import { describe, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';

import Layout from '../src/Layout/Layout';
import { BrowserRouter } from "react-router-dom";

describe('Layout', () => {
  it('renders title', () => {
    render(<BrowserRouter><Layout/></BrowserRouter>);
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe("Task List App");
  });

  it('renders homepage link', () => {
    render(<BrowserRouter><Layout/></BrowserRouter>);
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  });

  it('renders tasks link', () => {
    render(<BrowserRouter><Layout/></BrowserRouter>);
    expect(screen.getByRole("link", { name: "Tasks" })).toHaveAttribute("href", "/tasks");
  });
});