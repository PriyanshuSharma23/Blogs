import { useState } from "react";

const backend_uri = "http://localhost:5000"

function Login() {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('')


    const [usernameErr, setUserNameErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);


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
        }



    }

    return <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={function (e) { setUserName(e ? e.target.value : '') }} />
            <input type="password" value={password} onChange={function (e) { setPassword(e ? e.target.value : '') }} />
            <button type="submit">Submit</button>
        </form>

        {usernameErr && <p>Username can't be empty</p>}
        {passwordErr && <p>Password can't be empty</p>}
        {/* {userAlreadyExists && <p>User Already exists</p>} */}

    </div>
}

export default Login;