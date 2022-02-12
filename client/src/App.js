import { useEffect, useState } from "react"
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom"
import Login from "./routes/login"
import MainPage from "./routes/mainPage"
import Register from "./routes/register"

export const backend_uri = "http://localhost:5000"


export default function App() {

  const [isLogged, setIsLogged] = useState(false)
  const [currUser, setCurrUser] = useState(null)

  useEffect(function(){
    let user = localStorage.getItem("loggedUser")
    if (user) setIsLogged(true)
    else setIsLogged(false)
  },[])

  return <BrowserRouter>
    <div>
      {/* {isLogged && <h1>HI</h1>} */}
      <Switch>
        <Route path="/login">
          <Login isLogged={isLogged} setIsLogged={setIsLogged} />
        </Route>
        <Route path="/register" component={Register} />
        <Route exact path="/">
          <MainPage isLogged={isLogged} currUser = {currUser} setCurrUser = {setCurrUser} setIsLogged={setIsLogged}/>
        </Route>
      </Switch>
    </div>
  </BrowserRouter>

}