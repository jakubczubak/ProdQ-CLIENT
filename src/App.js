import './App.css';
import { Login } from './components/login/Login';
import { Infrabox } from './components/Infrabox';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'Infrabox';
  }, []);

  return (
    <div className="App">
      {/* <Login /> */}
      <Infrabox />
    </div>
  );
}

export default App;
