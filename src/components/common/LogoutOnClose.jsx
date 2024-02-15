import { useEffect } from 'react';

const LogoutOnClose = ({ onLogout }) => {
  useEffect(() => {
    const handleWindowClose = () => {
      // Wywołujemy funkcję do wylogowania, gdy okno jest zamykane
      onLogout();
    };

    // Dodajemy nasłuchiwanie na zdarzenie zamknięcia okna
    window.addEventListener('beforeunload', handleWindowClose);

    // Funkcja do usuwania nasłuchiwania zdarzenia po odmontowaniu komponentu
    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
    };
  }, [onLogout]);

  return null; // Ten komponent nie renderuje niczego na ekranie
};

export default LogoutOnClose;
