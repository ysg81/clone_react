import { authService, firebaseInstance } from 'myfirebase'
import React, { useState } from 'react'

function Auth() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newAccount, setNewAccount] = useState(true)
  const [error, setError] = useState("")

  const onChange = (event) => {
    const {target: {name, value}} = event;
    if(name === "email")
      setEmail(value)
    if(name === "password")
      setPassword(value)
  }
  const onSubmit = async(event) => {
    event.preventDefault();
    try {
      let data
      if(newAccount){
        // 계정 생성
        data = await authService.createUserWithEmailAndPassword(
          email, password
        )
      } else {
        // 로그인
        data = await authService.signInWithEmailAndPassword(
          email, password
        )
      }
      console.log(data)
    } catch (error) {
      setError(error.message)
    }
  }

  const toggleAccount = () => {
    setNewAccount(prev => !prev)
  }
  const onSocailClick = async(event) => {
    const {target : {name}} = event;
    let provider
    if(name === "goggle"){
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data)
  }

  return (
    <div>

      <form onSubmit={onSubmit}>
        <input 
          type="text"
          placeholder="Email"
          required
          value={email}
          name="email"
          onChange={onChange}/>
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          name="password"
          onChange={onChange}/>
        <input type="submit" value={newAccount ? "계정 생성" : "로그인"}/>
        <div style={{color: "red", fontWeight: "500"}}>{error}</div>
      </form>

      <span onClick={toggleAccount}>{newAccount ? "로그인" : "계정 생성"}</span>
      <div>
        <button onClick={onSocailClick} name="goggle">Continue with Goggle</button>
      </div>

    </div>
  )
}

export default Auth
