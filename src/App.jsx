import React, { useState } from 'react'
import './App.css'
import Login from './Login.jsx'
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

  async function logIn(user) {
    setIsLogged(true);
    setUser(user);
  }

  if(!isLogged)
    return (
      <>
        <Login logIn={logIn} />
      </>
    )
  else return (
    <>
      <Profile user={user} />
    </>
    )
}

export default App
