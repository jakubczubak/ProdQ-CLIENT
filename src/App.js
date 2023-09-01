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

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
        cacheTime: Infinity
      }
    }
  });

  const user = {
    id: 1,
    name: 'Jan',
    surname: 'Kowalski',
    email: 'jan.kowalski@example.com',
    phone: '123456789',
    notification: [
      {
        id: 1,
        author: 'Jan Kowalski',
        title: 'Zmiana statusu',
        description: 'Zmieniono status zamówienia na "W trakcie realizacji"',
        date: '2021-09-01 12:00:00',
        isRead: false
      },
      {
        id: 2,
        title: 'Zmiana statusu',
        description: 'Zmieniono status zamówienia na "W trakcie realizacji"',
        date: '2021-09-01 12:00:00',
        isRead: false
      }
    ],
    isAdmin: true,
    isBLocked: false
  };

  localStorage.setItem('user', JSON.stringify(user));

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
            </div>
          </LocalizationProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
