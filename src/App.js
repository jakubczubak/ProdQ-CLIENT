import './App.css';
import { Login } from './components/login/Login';
import { Infrabox } from './components/Infrabox';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  useEffect(() => {
    document.title = 'Infrabox';
  }, []);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {/* <Login /> */}
        <Infrabox />
      </div>
    </QueryClientProvider>
  );
}

export default App;
