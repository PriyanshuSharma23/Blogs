import { useEffect, useState } from "react"
import Login from "./routes/login"
import Register from "./routes/register"

export default function App() {

  const [isLogged, setIsLogged] = useState(false)

  useEffect(function(){
    let currUsername = localStorage.getItem("loggedUser")
    if (currUsername) setIsLogged(true);
  },[])

  return <div>
    {
      isLogged ? 
      <h1>ME LOGGED YEEE</h1>
      : <Login />
    }
  </div>
}