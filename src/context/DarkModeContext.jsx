import { createContext, useContext, useEffect } from 'react';

import { useLocalStorageState } from '../hooks/useLocalStorageState';

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const isSystemDarkMode = window.matchMedia(
    '(prefers-color-schema: dark)'
  ).matches;
  
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    isSystemDarkMode,
    'isDarkMode'
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.documentElement.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error('DarkModeContext was used outside of DarkModeProvider');

  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { DarkModeProvider, useDarkMode };
