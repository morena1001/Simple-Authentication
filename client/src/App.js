import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Home } from './Home';
import { Login } from './Login'
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("HA");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.token) {
      setLoggedIn(false);
      return;
    }

    fetch("/verify", {
      method: "POST",
      headers: {
        "jwt-token": user.token
      }
    })
    .then(r => r.json())
    .then(r => {
      setLoggedIn('success' === r.message);
      setEmail(user.email || "");
    });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={
            <Home 
              email={email} 
              loggedIn={loggedIn} 
              setLoggedIn={setLoggedIn} 
            /> }
          />
          <Route path="/login" element={
            <Login 
              setLoggedIn={setLoggedIn} 
              setEmail={setEmail} 
            /> }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
