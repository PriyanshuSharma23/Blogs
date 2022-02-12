import { useState } from "react";
import { useHistory } from "react-router-dom";
import { backend_uri } from "../App";


function Register() {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('');

    const [usernameErr, setUserNameErr] = useState(false);
    const [passwordErr, setPasswordErr] = useState(false);
    const [rePasswordErr, setRePasswordErr] = useState(false);

    let history = useHistory();

    const [userAlreadyExists, setUserAlreadyExists] = useState(false);
    /** 
     * @param {React.FormEvent<HTMLFormElement>} e 
     */
    async function handleSubmit(e) {
        e.preventDefault();
        if (!username || username.includes(' ')) { setUserNameErr(true); return }
        if (password.length < 8) { setPasswordErr(true); return }
        if (password !== rePassword) {setRePasswordErr(true); return}

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

        history.push("/login")
    }

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="enter username"type="text" value={username} onChange={function (e) { setUserName(e ? e.target.value : '') }} />
                <input placeholder="enter password" type="password" value={password} onChange={function (e) { setPassword(e ? e.target.value : '') }} />
                <input placeholder="retype password" type="password" value={rePassword} onChange={function (e) { setRePassword(e ? e.target.value : '') }} />
                <button type="submit">Submit</button>
            </form>
            <button onClick={()=>{history.push('/login')}}>Login</button>

            {usernameErr && <p>Username can't be empty or contain whitespace</p>}
            {passwordErr && <p>Password can't be less than 8 characters</p>}
            {rePasswordErr && <p>Password and retyped password aren't same</p>}
            {userAlreadyExists && <p>User Already exists</p>}
        </div>

    );
}

export default Register;
