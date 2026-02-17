import { OverlayProvider } from 'overlay-kit';
import { Routes } from './pages/routes';

export function App() {
  return (
    <OverlayProvider>
      <Routes />
    </OverlayProvider>
  );
}
