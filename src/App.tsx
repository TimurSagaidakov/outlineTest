import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';

import './App.scss';
import HomePage from './pages/HomePage';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const App = () => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </StrictMode>
  );
};
