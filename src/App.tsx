import './layout/theme/theme-light/blue/theme.scss';
import './layout/layout.scss';
import './layout/_theme_override.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import Routes from './pages/PageRoutes';
import i18n from './i18n';
import { useCallback, useEffect, useState } from 'react';

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    const handleI18nInit = () => setIsInitialized(true);
    i18n.store.on('added', handleI18nInit);

    return () => {
      i18n.store.off('added', handleI18nInit);
    };
  }, []);

  const renderRoutes = useCallback(() => {
    if (!isInitialized)
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
        </div>
      );

    return <Routes />;
  }, [isInitialized]);

  return <>{renderRoutes()}</>;
}

export default App;
