import React from "react";
import { render, screen } from "@testing-library/react";
import { PrivyProvider } from "../PrivyProviderTest.tsx";

describe("PrivyProvider", () => {
  const mockAppId = "test-app-id";

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });
  it("renders without crashing", () => {
    render(
      <PrivyProvider appId={mockAppId}>
        <div>Test Child</div>
      </PrivyProvider>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("logs initialization with correct appId", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    render(
      <PrivyProvider appId={mockAppId}>
        <div>Test Child</div>
      </PrivyProvider>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      "PrivyProvider initialized with:",
      expect.objectContaining({
        appId: mockAppId,
      })
    );

    consoleSpy.mockRestore();
  });

  it("renders children correctly", () => {
    const testContent = "Test Content";

    render(
      <PrivyProvider appId={mockAppId}>
        <span>{testContent}</span>
      </PrivyProvider>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it("accepts custom configuration props", () => {
    const customConfig = {
      appearance: {
        theme: "light" as const,
        accentColor: "#ff0000",
      },
    };

    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    render(
      <PrivyProvider appId={mockAppId} config={customConfig}>
        <div>Test</div>
      </PrivyProvider>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith(
      "PrivyProvider initialized with:",
      expect.objectContaining({
        appId: mockAppId,
        hasConfig: true,
      })
    );

    consoleSpy.mockRestore();
  });

  it("handles empty appId gracefully", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    render(
      <PrivyProvider appId="">
        <div>Test</div>
      </PrivyProvider>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith(
      "PrivyProvider initialized with:",
      expect.objectContaining({
        appId: "",
      })
    );

    consoleSpy.mockRestore();
  });

  it("initializes component state correctly", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    render(
      <PrivyProvider appId={mockAppId}>
        <div>Test</div>
      </PrivyProvider>
    );

    // Test that the component logs the expected initialization state
    expect(consoleSpy).toHaveBeenCalledWith("PrivyProvider initialized with:", {
      appId: mockAppId,
      clientId: undefined,
      hasConfig: false,
      hasSmartWalletConfig: false,
      disableSmartWallets: undefined,
    });

    consoleSpy.mockRestore();
  });
});
