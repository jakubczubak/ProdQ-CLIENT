import './App.css';
import { Login } from './components/login/Login';
import { Infrabox } from './components/Infrabox';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

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
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
