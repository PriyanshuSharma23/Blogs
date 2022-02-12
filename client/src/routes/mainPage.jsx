import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { backend_uri } from "../App"

export default function MainPage({ isLogged, setIsLogged }) {

    let history = useHistory()
    const [currUser, setCurrUser] = useState(null)

    useEffect(async function () {
        if (!isLogged) { history.push('/login'); return; }
        let user = localStorage.getItem("loggedUser")

        let res = await fetch(`${backend_uri}/fetchUser?username=${user}`)
        let userData = await res.json();
        
        setCurrUser(userData);
    }, [])

    function logout() {
        setIsLogged(false)
        localStorage.clear()
        setCurrUser(null)
        history.push("/login")

    }

    return (
        <div>
            Home
            <button onClick={logout}>logout</button>
            <div>
                {JSON.stringify(currUser)}
            </div>
        </div>

    )
}