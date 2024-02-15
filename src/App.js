import './App.css';
import { Login } from './components/login/Login';
import { Infrabox } from './components/Infrabox';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import PrivateRoutes from '../src/components/utils/PrivateRoutes.js';
import LogoutOnClose from './components/common/LogoutOnClose';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity
      }
    }
  });

  const logout = () => {
    localStorage.removeItem('userToken');
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="App">
              <Routes>
                <Route element={<PrivateRoutes />}>
                  <Route path="/*" element={<Infrabox />} />
                </Route>
                <Route path="/login" element={<Login />} />
              </Routes>
              <LogoutOnClose onLogout={logout} />
            </div>
          </LocalizationProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
