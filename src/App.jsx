import React, { useState } from 'react'
import './App.css'
import Login from './Login.jsx'
import Header from './Header.jsx'
import Profile from './Profile.jsx'

function App () {
  const [isLogged, setIsLogged] = useState(false)
  const [user, setUser] = useState({
    "id": "",
    "email": "",
    "password": "",
    "firstName": "",
    "lastName": ""
  })

  function logIn(user) {
    setIsLogged(true);
    setUser(user);
  }

  function logOut(user) {
    setIsLogged(false);
    setUser({
      "id": "",
      "email": "",
      "password": "",
      "firstName": "",
      "lastName": ""
    });
  }

  if(!isLogged)
    return (
      <>
        <Login logIn={logIn} />
      </>
    )
  else return (
    <>
      <Header logOut={logOut} />
      <Profile user={user} />
    </>
    )
}

export default App
