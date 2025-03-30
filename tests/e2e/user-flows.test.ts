import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../client/src/App';
import { AuthProvider } from '../../client/src/hooks/use-auth-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

// Mock the fetch API
vi.mock('node-fetch', () => ({
  default: vi.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })),
}));

describe('End-to-End User Flows', () => {
  let queryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  const renderApp = (initialEntries = ['/']) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  describe('Authentication Flow', () => {
    it('should allow a user to sign up', async () => {
      const user = userEvent.setup();
      renderApp(['/auth']);

      // Find and click on the signup tab
      const signupTab = await screen.findByText(/Sign Up/i);
      await user.click(signupTab);

      // Fill out the signup form
      const usernameInput = screen.getByLabelText(/username/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const signupButton = screen.getByRole('button', { name: /create account/i });

      await user.type(usernameInput, 'testuser');
      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(signupButton);

      // Verify redirection to dashboard after successful signup
      await waitFor(() => {
        expect(window.location.pathname).toBe('/dashboard');
      });
    });

    it('should allow a user to log in', async () => {
      const user = userEvent.setup();
      renderApp(['/auth']);

      // Fill out the login form
      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /log in/i });

      await user.type(usernameInput, 'testuser');
      await user.type(passwordInput, 'password123');
      await user.click(loginButton);

      // Verify redirection to dashboard after successful login
      await waitFor(() => {
        expect(window.location.pathname).toBe('/dashboard');
      });
    });
  });

  describe('Database Configuration Flow', () => {
    it('should allow a user to configure database', async () => {
      const user = userEvent.setup();
      
      // Mock authentication state
      vi.mock('../../client/src/hooks/use-auth-context', () => ({
        useAuth: () => ({
          user: { id: 1, username: 'testuser', email: 'test@example.com', role: 'user' },
          isLoading: false,
          error: null,
        }),
      }));

      renderApp(['/settings']);

      // Fill out the database configuration form
      const hostnameInput = screen.getByLabelText(/hostname/i);
      const portInput = screen.getByLabelText(/port/i);
      const usernameInput = screen.getByLabelText(/database username/i);
      const passwordInput = screen.getByLabelText(/database password/i);
      const databaseNameInput = screen.getByLabelText(/database name/i);
      const saveButton = screen.getByRole('button', { name: /save credentials/i });

      await user.type(hostnameInput, 'db.example.com');
      await user.type(portInput, '5432');
      await user.type(usernameInput, 'postgres');
      await user.type(passwordInput, 'dbpassword');
      await user.type(databaseNameInput, 'heliusdb');
      await user.click(saveButton);

      // Verify success message
      await waitFor(() => {
        expect(screen.getByText(/credentials saved successfully/i)).toBeInTheDocument();
      });

      // Test the validate button
      const validateButton = screen.getByRole('button', { name: /validate connection/i });
      await user.click(validateButton);

      // Verify validation success message
      await waitFor(() => {
        expect(screen.getByText(/connection successful/i)).toBeInTheDocument();
      });
    });
  });

  describe('Indexing Configuration Flow', () => {
    it('should allow a user to configure indexing preferences', async () => {
      const user = userEvent.setup();
      
      // Mock authentication state
      vi.mock('../../client/src/hooks/use-auth-context', () => ({
        useAuth: () => ({
          user: { id: 1, username: 'testuser', email: 'test@example.com', role: 'user' },
          isLoading: false,
          error: null,
        }),
      }));

      renderApp(['/indexing']);

      // Toggle indexing options
      const nftBidsCheckbox = screen.getByLabelText(/nft bids/i);
      const tokenPricesCheckbox = screen.getByLabelText(/token prices/i);
      const borrowableTokensCheckbox = screen.getByLabelText(/borrowable tokens/i);
      const saveButton = screen.getByRole('button', { name: /save preferences/i });

      await user.click(nftBidsCheckbox);
      await user.click(tokenPricesCheckbox);
      await user.click(saveButton);

      // Verify success message
      await waitFor(() => {
        expect(screen.getByText(/preferences saved successfully/i)).toBeInTheDocument();
      });
    });
  });

  describe('Dashboard Navigation Flow', () => {
    it('should navigate between dashboard sections', async () => {
      const user = userEvent.setup();
      
      // Mock authentication state
      vi.mock('../../client/src/hooks/use-auth-context', () => ({
        useAuth: () => ({
          user: { id: 1, username: 'testuser', email: 'test@example.com', role: 'user' },
          isLoading: false,
          error: null,
        }),
      }));

      renderApp(['/dashboard']);

      // Navigate to Settings
      const settingsLink = screen.getByText(/settings/i);
      await user.click(settingsLink);

      await waitFor(() => {
        expect(window.location.pathname).toBe('/settings');
      });

      // Navigate to Indexing Options
      const indexingLink = screen.getByText(/indexing options/i);
      await user.click(indexingLink);

      await waitFor(() => {
        expect(window.location.pathname).toBe('/indexing');
      });

      // Navigate to Analytics
      const analyticsLink = screen.getByText(/analytics/i);
      await user.click(analyticsLink);

      await waitFor(() => {
        expect(window.location.pathname).toBe('/analytics');
      });

      // Navigate to Logs
      const logsLink = screen.getByText(/logs/i);
      await user.click(logsLink);

      await waitFor(() => {
        expect(window.location.pathname).toBe('/logs');
      });

      // Navigate back to Dashboard
      const dashboardLink = screen.getByText(/dashboard/i);
      await user.click(dashboardLink);

      await waitFor(() => {
        expect(window.location.pathname).toBe('/dashboard');
      });
    });
  });

  describe('Onboarding Flow', () => {
    it('should display onboarding tour for new users', async () => {
      const user = userEvent.setup();
      
      // Mock localStorage to simulate first visit
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
        if (key === 'helisync_tour_completed') {
          return null;
        }
        return null;
      });

      // Mock authentication state for new user
      vi.mock('../../client/src/hooks/use-auth-context', () => ({
        useAuth: () => ({
          user: { id: 1, username: 'newuser', email: 'new@example.com', role: 'user' },
          isLoading: false,
          error: null,
        }),
      }));

      renderApp(['/dashboard']);

      // Verify tour dialog is displayed
      await waitFor(() => {
        expect(screen.getByText(/welcome to helisync/i)).toBeInTheDocument();
      });

      // Start tour
      const startTourButton = screen.getByRole('button', { name: /start tour/i });
      await user.click(startTourButton);

      // Verify tour steps appear
      await waitFor(() => {
        expect(screen.getByText(/blockchain basics/i)).toBeInTheDocument();
      });

      // Verify localStorage was updated after completing tour
      expect(localStorage.setItem).toHaveBeenCalledWith('helisync_tour_completed', 'true');
    });

    it('should not display tour for returning users', async () => {
      // Mock localStorage to simulate returning user
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
        if (key === 'helisync_tour_completed') {
          return 'true';
        }
        return null;
      });

      // Mock authentication state
      vi.mock('../../client/src/hooks/use-auth-context', () => ({
        useAuth: () => ({
          user: { id: 1, username: 'testuser', email: 'test@example.com', role: 'user' },
          isLoading: false,
          error: null,
        }),
      }));

      renderApp(['/dashboard']);

      // Verify tour dialog is not displayed
      await waitFor(() => {
        expect(screen.queryByText(/welcome to helisync/i)).not.toBeInTheDocument();
      });
    });
  });
});