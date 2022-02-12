import { useEffect, useState } from "react";
import { BrowserRouter, useHistory } from "react-router-dom";
import { backend_uri } from "../App";


function Login({ isLogged, setIsLogged }) {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('')


    const [usernameErr, setUserNameErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);

    const [incorrectCred, setIncorrectCred] = useState(false)
    let history = useHistory();
    async function handleSubmit(e) {
        e.preventDefault();
        if (!username) { setUserNameErr(true); return }
        if (password.length < 8) { setPasswordErr(true); return }

        const user = {
            username: username.trim(),
            password: password,
        }

        const res = await fetch(`${backend_uri}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        if (res.ok) {
            localStorage.setItem("loggedUser", username)
            setIsLogged(true)
            history.push('/')
        } else {
            setIncorrectCred(true);
        }


    }
    useEffect(function () {

        if (isLogged) history.push('/')

    }, [])

    return <BrowserRouter>

        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder = {"enter username"}type="text" value={username} onChange={function (e) { setUserName(e ? e.target.value : '') }} />
                <input placeholder = {"enter password"}type="password" value={password} onChange={function (e) { setPassword(e ? e.target.value : '') }} />
                <button type="submit">Submit</button>
            </form>

            <button onClick={() => { history.push('/register') }}>Register</button>
            {usernameErr && <p>Username can't be empty</p>}
            {passwordErr && <p>Password can't be empty</p>}
            {incorrectCred && <p>Either username or password is incorrect</p>}
        </div>
    </BrowserRouter>
}

export default Login;