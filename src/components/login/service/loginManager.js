export const loginManager = {
  login: async function (data, dispatch, navigate, setError, cartManager, jwt) {
    fetch(`${process.env.REACT_APP_API_SERVER_IP}/api/va/auth/authenticate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: data.email,
        password: data.password
      })
    })
      .then((res) => {
        if (res.status === 200) {
          // Obsługuj poprawny kod odpowiedzi (np. 200 OK)
          return res.json();
        } else if (res.status === 403) {
          // Obsługa błędu 403 - Forbidden
          setError('Access Denied' + res);
          throw new Error('Access Denied'); // Rzuć własny błąd
        } else {
          setError('Invalid credentials');
          throw new Error('Invalid credentials'); // Inne błędy obsługiwane jako błąd niepoprawnych danych logowania
        }
      })
      .then((apiResponse) => {
        if (apiResponse.token) {
          const decodedToken = jwt(apiResponse.token);
          sessionStorage.setItem('userToken', apiResponse.token);
          cartManager.syncCartWithServer(dispatch);
          navigate('/dashboard', { state: { loginMessage: 'Hi, ' + decodedToken.sub + ' 👋' } });
        } else {
          // Unsuccessful login - display an error message
          setError('Invalid credentials');
        }
      })
      .catch((error) => {
        if (error.message === 'Failed to fetch') {
          window.alert(
            "Backend application INFRABOX is using a self-signed certificate, which means it won't be automatically trusted by web browsers or other SSL/TSL clients. Please acknowledge the security warning and proceed with logging in again."
          ); // Wyświetl alert
          window.open(`${process.env.REACT_APP_API_SERVER_IP}`); // Przekieruj na stronę serwera backend (Aby wyłączyć ostrzeżenie certificate)
        } else {
          console.error('An error occurred:', error);
          setError(error.message);
        }
      });
  }
};
