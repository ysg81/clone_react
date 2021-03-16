import React, { useState } from "react";
import AppRouter from "components/AppRouter";
import { authService } from "myfirebase";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser)
	return (
		<>
			<AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy;Clone Coding {new Date().getFullYear()}</footer>
		</>
	)
}

export default App
