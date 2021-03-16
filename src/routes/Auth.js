import { authService, firebaseInstance } from "myfirebase"
import React, { useState } from "react"


const Auth = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState("")
	const onChange = (e) => {
		const { name, value } = e.target
		if (name === "email") {
			setEmail(value)
		} else if (name === "password") {
			setPassword(value)
		}
	}
	const onSubmit = async (e) => {
		e.preventDefault()
		try {
            let data;
			if (newAccount) {
				// create account
				data = await authService.createUserWithEmailAndPassword(
                    email,
                    password
                )
			} else {
				// log in
				data = await authService.signInWithEmailAndPassword(
                    email,
                    password
                )
			}
			console.log(data)
		} catch (err) {
			setError(err.message)
		}
	}

    const toggleAccount = () => { setNewAccount(prev => !prev) }
    const onSocialClick = async (e) => {
        const {name} = e.target;
        let provider
        if(name === 'google'){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input name="email" type="text" placeholder="Email" required value={email} onChange={onChange} />
				<input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
				<input type="submit" value={newAccount ? "Create Account" : "Sign In"} />
			{error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "LogIn" : "Create Account" }</span>
			<div>
				<button onClick={onSocialClick} name="google">Continue with Google</button>
			</div>
		</div>
	)
}

export default Auth
