import './App.css';
import { Login } from './components/login/Login';
import { Infrabox } from './components/Infrabox';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

function App() {
  useEffect(() => {
    document.title = 'Infrabox';
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity
      }
    }
  });

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Routes>
            <Route path="/*" element={<Infrabox />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
