import React from 'react';
import { render, screen } from '@testing-library/react';
import { PrivyProvider } from '../PrivyProviderTest.tsx';

// Don't mock @privy-io/react-auth since your component doesn't use it directly
// Instead, let's test your actual component

describe('PrivyProvider', () => {
  const mockAppId = 'test-app-id';

  it('renders without crashing', () => {
    render(
      <PrivyProvider appId={mockAppId}>
        <div>Test Child</div>
      </PrivyProvider>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('logs initialization with correct appId', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    render(
      <PrivyProvider appId={mockAppId}>
        <div>Test Child</div>
      </PrivyProvider>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'PrivyProvider initialized with:',
      expect.objectContaining({
        appId: mockAppId,
      })
    );

    consoleSpy.mockRestore();
  });

  it('renders children correctly', () => {
    const testContent = 'Test Content';
    
    render(
      <PrivyProvider appId={mockAppId}>
        <span>{testContent}</span>
      </PrivyProvider>
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('accepts custom configuration props', () => {
    const customConfig = {
      appearance: {
        theme: 'light' as const,
        accentColor: '#ff0000',
      },
    };

    render(
      <PrivyProvider appId={mockAppId} config={customConfig}>
        <div>Test</div>
      </PrivyProvider>
    );

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('handles empty appId', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
    render(
      <PrivyProvider appId="">
        <div>Test</div>
      </PrivyProvider>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      'PrivyProvider initialized with:',
      expect.objectContaining({
        appId: '',
      })
    );

    consoleSpy.mockRestore();
  });
});