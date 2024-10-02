import React, { useState } from 'react'
import './App.css'
import Login from './Login.jsx'
import Header from './Header.jsx'
import Profile from './Profile.jsx'
import {usePersistState} from "./utils.js"

/**
 * A React component that represents the entire app.
 */
function App () {
  const default_user = {
    "id": "",
    "email": "",
    "password": "",
    "firstName": "",
    "lastName": ""
  }
  const [user, setUser] = usePersistState(default_user, "user")
  const [isLogged, setIsLogged] = useState(JSON.stringify(user) !== JSON.stringify(default_user))

  /**
   * Method used to log in a valid user.
   *
   * @param {{id: string, email: string, password: string, firstName: string, lastName: string} User} user
   * A valid user.
  */
  function logIn(user) {
    setIsLogged(true);
    setUser(user);
  }

  /**
   * Method used to log out the user.
   *
   * @param {{{id: string, email: string, password: string, firstName: string, lastName: string}} User} user
   * A valid user.
  */
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
