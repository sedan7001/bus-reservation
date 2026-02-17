import { Suspense } from 'react';
import { Navigate, RouterProvider, createBrowserRouter, useRouteError } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, Flex, Spacing, Text, colors } from '../lib';
import { SearchPage } from './search-page';
import { StationPage } from './station-page';
import { TicketPage } from './ticket-page';
import { ConfirmPage } from './confirm-page';
import { CompletePage } from './complete-page';
import { ErrorFallback } from '../ui';

function RouteErrorFallback() {
  const error = useRouteError();
  const message = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      css={{ minHeight: '100vh', padding: '0 24px', textAlign: 'center' }}
    >
      <Text fontSize={48}>⚠️</Text>
      <Spacing size={16} />
      <Text fontSize={20} fontWeight="bold" color={colors.grey900}>
        문제가 발생했어요
      </Text>
      <Spacing size={8} />
      <Text fontSize={14} color={colors.grey600}>
        {message}
      </Text>
      <Spacing size={24} />
      <Button onClick={() => (window.location.href = '/')}>
        홈으로
      </Button>
    </Flex>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <SearchPage />,
    errorElement: <RouteErrorFallback />,
  },
  {
    path: '/search',
    element: <SearchPage />,
    errorElement: <RouteErrorFallback />,
  },
  {
    path: '/station',
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <StationPage />
        </Suspense>
      </ErrorBoundary>
    ),
    errorElement: <RouteErrorFallback />,
  },
  {
    path: '/tickets',
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <TicketPage />
        </Suspense>
      </ErrorBoundary>
    ),
    errorElement: <RouteErrorFallback />,
  },
  {
    path: '/confirm',
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <ConfirmPage />
      </ErrorBoundary>
    ),
    errorElement: <RouteErrorFallback />,
  },
  {
    path: '/complete',
    element: (
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<div>Loading...</div>}>
          <CompletePage />
        </Suspense>
      </ErrorBoundary>
    ),
    errorElement: <RouteErrorFallback />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace={true} />,
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
