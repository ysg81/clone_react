import React, { useState, useEffect } from 'react'
import AppRouter from 'components/AppRouter'
import { authService } from 'myfirebase'

function App() {
  const [init, setInit] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedIn(true)
        setUserObj(user)
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  }, [])

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>
      <footer>&copy; {new Date().getFullYear()} Gons Twitter</footer>
    </>
  )
}

export default App
