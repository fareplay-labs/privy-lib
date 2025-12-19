import React from "react";
import { render, screen } from "@testing-library/react";
import { PrivyProvider } from "../PrivyProviderTest.tsx";

// Mock Privy modules
jest.mock("@privy-io/react-auth", () => ({
  PrivyProvider: ({ children, appId, config }: any) => (
    <div
      data-testid="mock-privy-provider"
      data-app-id={appId}
      data-config={JSON.stringify(config)}
    >
      {children}
    </div>
  ),
}));

jest.mock("@privy-io/react-auth/smart-wallets", () => ({
  SmartWalletsProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-smart-wallets-provider">{children}</div>
  ),
}));
describe("PrivyProvider", () => {
  const mockAppId = "test-app-id";

  it("renders without crashing", () => {
    render(
      <PrivyProvider appId={mockAppId}>
        <div>Test Child</div>
      </PrivyProvider>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });

  it("accepts custom configuration props", () => {
    const customConfig = {
      appearance: {
        theme: "light" as const,
        accentColor: "#ff0000" as `#${string}`,
      },
    };

    render(
      <PrivyProvider appId={mockAppId} config={customConfig}>
        <div>Test</div>
      </PrivyProvider>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("handles empty appId", () => {
    render(
      <PrivyProvider appId="">
        <div>Test</div>
      </PrivyProvider>
    );

    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
