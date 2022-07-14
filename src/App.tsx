import { useEffect, useState } from 'react';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setTheme('dark');
    }
  }, []);

  return (
    <div className={`App ${theme}`}>
      <div className="flex h-screen w-screen place-content-center place-items-center bg-light-background dark:bg-dark-background">
        <div className="test font-title text-3xl text-light-text dark:text-dark-text">
          Test
        </div>
      </div>
    </div>
  );
}

export default App;
