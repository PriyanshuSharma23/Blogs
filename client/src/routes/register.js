import { useState } from "react";

const backend_uri = "http://localhost:5000"

function Register() {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('')

    const [usernameErr, setUserNameErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);

    const [userAlreadyExists, setUserAlreadyExists] = useState(false);
    /** 
     * @param {React.FormEvent<HTMLFormElement>} e 
     */
    async function handleSubmit(e) {
        e.preventDefault();
        if (!username) { setUserNameErr(true); return }
        if (password.length < 8) { setPasswordErr(true); return }

        const user = {
            username: username.trim(),
            password: password,
            dateCreated: new Date()
        }

        const res = await fetch(`${backend_uri}/addUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        if (!res.ok) {
            setUserAlreadyExists(true);
            return;
        }

        setUserName('')
        setPassword('')

        setPasswordErr(false)
        setUserNameErr(false)
        setUserAlreadyExists(false)
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={username} onChange={function (e) { setUserName(e ? e.target.value : '') }} />
                <input type="password" value={password} onChange={function (e) { setPassword(e ? e.target.value : '') }} />
                <button type="submit">Submit</button>
            </form>
            {usernameErr && <p>Username can't be empty</p>}
            {passwordErr && <p>Password can't be empty</p>}
            {userAlreadyExists && <p>User Already exists</p>}
        </div>

    );
}

export default Register;