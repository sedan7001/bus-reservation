import { OverlayProvider } from 'overlay-kit';
import { Routes } from './pages/routes';
import { NetworkBanner } from './ui/network-banner';

export function App() {
  return (
    <OverlayProvider>
      <NetworkBanner />
      <Routes />
    </OverlayProvider>
  );
}
