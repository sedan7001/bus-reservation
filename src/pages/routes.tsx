import { Suspense } from 'react';
import { Navigate, RouterProvider, createBrowserRouter, useRouteError } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, Flex, Spacing, Text, colors } from '../lib';
import { AppError } from '../lib/app-error';
import { SearchPage } from './search-page';
import { StationPage } from './station-page';
import { TicketPage } from './ticket-page';
import { ConfirmPage } from './confirm-page';
import { CompletePage } from './complete-page';
import { ErrorFallback, LoadingSkeleton } from '../ui';

function RouteErrorFallback() {
  const error = useRouteError();

  const display = AppError.isAppError(error)
    ? { icon: error.icon, title: error.userMessage, message: '' }
    : {
        icon: '⚠️',
        title: '문제가 발생했어요',
        message: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
      };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      css={{ minHeight: '100vh', padding: '0 24px', textAlign: 'center' }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: '#F8F9FA',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
        }}
      >
        {display.icon}
      </div>
      <Spacing size={20} />
      <Text fontSize={20} fontWeight="bold" color={colors.grey900}>
        {display.title}
      </Text>
      {display.message && (
        <>
          <Spacing size={8} />
          <Text fontSize={14} color={colors.grey600}>
            {display.message}
          </Text>
        </>
      )}
      <Spacing size={24} />
      <Flex gap={12}>
        <Button style="weak" onClick={() => window.history.back()}>
          뒤로 가기
        </Button>
        <Button onClick={() => (window.location.href = '/')}>
          홈으로
        </Button>
      </Flex>
    </Flex>
  );
}

function PageLoading() {
  return (
    <div>
      <div style={{ height: 56 }} />
      <LoadingSkeleton lines={6} showHeader />
    </div>
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
        <Suspense fallback={<PageLoading />}>
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
        <Suspense fallback={<PageLoading />}>
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
        <Suspense fallback={<PageLoading />}>
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
