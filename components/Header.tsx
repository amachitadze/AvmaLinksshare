import React from 'react';
import { Icon } from './icons.tsx';
import HamburgerMenu from './HamburgerMenu.tsx';

type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error';

interface HeaderProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  onImport: () => void;
  onExport: () => void;
  onImportChrome: () => void;
  onToggleMoveMode: () => void;
  showInstallButton: boolean;
  onInstallClick: () => void;
  user: any;
  onLogin: () => void;
  onLogout: () => void;
  syncStatus: SyncStatus;
}

const SyncIndicator: React.FC<{ status: SyncStatus }> = ({ status }) => {
  const messages = {
    syncing: 'Saving...',
    synced: 'Saved',
    error: 'Sync Error',
  };

  if (status === 'idle' || !messages[status]) {
    return null;
  }

  const icons = {
    syncing: <Icon name="loading" className="w-4 h-4 mr-1.5 animate-spin" />,
    synced: <Icon name="cloud" className="w-4 h-4 mr-1.5 text-green-500" />,
    error: <Icon name="cloud-off" className="w-4 h-4 mr-1.5 text-red-500" />,
  }

  return (
    <div className="flex items-center text-sm text-on-surface-variant-light dark:text-on-surface-variant-dark transition-opacity duration-300">
       {icons[status]}
      <span>{messages[status]}</span>
    </div>
  );
};


const Header: React.FC<HeaderProps> = ({ 
  theme, 
  setTheme, 
  onImport, 
  onExport, 
  onImportChrome, 
  onToggleMoveMode,
  showInstallButton,
  onInstallClick,
  user,
  onLogin,
  onLogout,
  syncStatus
}) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <header className="bg-surface-light dark:bg-surface-dark shadow-sm sticky top-0 z-40 border-b border-outline-variant-light dark:border-outline-variant-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <h1 className="text-2xl font-medium text-on-surface-light dark:text-on-surface-dark">
            Avma Links
          </h1>
          <div className="flex items-center gap-2 sm:gap-4">
            {user && <SyncIndicator status={syncStatus} />}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-on-surface-variant-light dark:text-on-surface-variant-dark hover:bg-surface-container-highest-light dark:hover:bg-surface-container-highest-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
              aria-label="Toggle theme"
            >
              <Icon name={theme === 'light' ? 'moon' : 'sun'} className="w-6 h-6" />
            </button>
            <HamburgerMenu 
              onImport={onImport} 
              onExport={onExport} 
              onImportChrome={onImportChrome} 
              onToggleMoveMode={onToggleMoveMode}
              showInstallButton={showInstallButton}
              onInstall={onInstallClick}
              user={user}
              onLogin={onLogin}
              onLogout={onLogout}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;