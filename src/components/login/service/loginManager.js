export const loginManager = {
  login: async function (data, dispatch, navigate, setError, cartManager, jwt) {
    try {
      // Sprawdź dostępność backendu
      const backendAvailable = await this.checkBackendAvailability();
      if (!backendAvailable) {
        setError('Backend unavailable!');
        return;
      }

      // Żądanie logowania
      const response = await fetch(
        `${process.env.REACT_APP_API_SERVER_IP}/api/va/auth/authenticate`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: data.email,
            password: data.password
          })
        }
      );

      // Sprawdzanie odpowiedzi
      if (!response.ok) {
        if (response.status === 403 || response.status === 401) {
          // Ustawiamy "Invalid credentials" zamiast "Access Denied"
          setError('Invalid credentials');
          throw new Error('Invalid credentials');
        } else {
          setError('Unexpected error');
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }

      const apiResponse = await response.json();

      if (apiResponse.token) {
        const decodedToken = jwt(apiResponse.token);
        sessionStorage.setItem('userToken', apiResponse.token);
        await cartManager.syncCartWithServer(dispatch);
        navigate('/dashboard', { state: { loginMessage: 'Hi, ' + decodedToken.sub} });
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        setError('Connection error');
      } else if (error.message === 'Invalid credentials') {
        console.error('An error occurred:', error);
        setError('Invalid credentials');
      } else {
        console.error('An error occurred:', error);
        setError('Unexpected error');
      }
    }
  },

  // Sprawdzenie dostępności backendu
  checkBackendAvailability: async function () {
    try {
      await fetch(`${process.env.REACT_APP_API_SERVER_IP}`, {
        method: 'GET',
        mode: 'no-cors'
      });
      return true;
    } catch (error) {
      return false;
    }
  }
};
