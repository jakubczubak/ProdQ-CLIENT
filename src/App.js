import "./App.css";
import { Login } from "./components/login/Login";
import { Infrabox } from "./components/infrabox/Infrabox";
import { useState } from 'react'

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  return (
    <div className="App">
      {/* <Login /> */}
      <Infrabox />
    </div>
  );
}

export default App;
