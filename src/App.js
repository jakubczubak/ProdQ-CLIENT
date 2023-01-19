import './App.css';
// import { Login } from './components/login/Login';
import { Infrabox } from './components/Infrabox';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

function App() {
  useEffect(() => {
    document.title = 'Infrabox';
  }, []);

  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Infrabox />
          {/* <Login /> */}
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
