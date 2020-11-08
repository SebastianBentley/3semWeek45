import './App.css';
import jokeFacade from './jokeFacade';
import scrapeFacade from './scrapeFacade'
import facade from "./loginFacade";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink,
  useParams,
  useRouteMatch,
  Prompt,
  useLocation,
  useHistory
} from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let history = useHistory();

  const setLoginStatus = status => {
    setIsLoggedIn(status);
    history.push("/");
  }
  return (
    <div>
      <Header
        loginMsg={isLoggedIn ? "Logout" : "Login"}
        isLoggedIn={isLoggedIn}
      />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/jokes">
          <Jokes />
        </Route>
        <Route exact path="/scrape">
          <Scrape />
        </Route>
        <Route path="/login-out">
          <Login
          />
        </Route>
        <Route >
          <NoMatch />
        </Route>
      </Switch>
    </div>

  );
}

function Header({ isLoggedIn, loginMsg }) {
  return (
    <ul className="header">
      <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
      <li><NavLink activeClassName="active" to="/jokes">Jokes</NavLink></li>
      {isLoggedIn && (
        <React.Fragment>

        </React.Fragment>)}
      <li><NavLink activeClassName="active" to="/scrape">Scrape</NavLink></li>
      <li><NavLink activeClassName="active" to="/login-out">{loginMsg}</NavLink></li>
    </ul>

  )
}



function Home() {
  return (
    <h2>Home</h2>
  )
}


function Jokes() {
  const [joke, setJoke] = useState({ joke1: "", joke1Reference: "", joke2: "", jokeReference2: "" });
  const [pressed, setPressed] = useState(false);

  const getJoke = () => jokeFacade.getJokes()
    .then(data => {
      joke.joke1 = data.joke1;
      joke.joke1Reference = data.joke1Reference;
      joke.joke2 = data.joke2;
      joke.joke2Reference = data.joke2Reference;
      setPressed(true)
      setJoke({ ...joke })
    });

  return (
    <div>
      <h2>Joke</h2>

      {pressed && (
        <React.Fragment>
          <h3>Chuck Joke:</h3>
          <p>{joke.joke1}</p>
          <h3>Dad Joke:</h3>
          <p>{joke.joke2}</p>
          <h3>References</h3>
          <em>{joke.joke1Reference} </em><br />
          <em>{joke.joke2Reference} </em><br />
        </React.Fragment>
      )}

      <button onClick={getJoke}>Get Jokes</button>
    </div>
  )
}



function Scrape() {
  const [scrapeParallel, setScrapeParallel] = useState({ title: "", timeSpent: "", tags: "" });
  const [scrapeSeq, setScrapeSeq] = useState({ title: "", timeSpent: "", tags: "" });
  const [pressed, setPressed] = useState(false);

  function getScrape() {
    scrapeFacade.getScrapeParallel()
      .then(data => {
        scrapeParallel.title = data.title;
        scrapeParallel.timeSpent = data.timeSpent;
        scrapeParallel.tags = data.tags.map((t, index) => (
          <li key={index}>
            {"url: " + t.url + " "}
            {"divCount: " + t.divCount + " "}
            {"bodyCount: " + t.bodyCount + " "}
          </li>))


        setPressed(true)
        setScrapeParallel({ ...scrapeParallel })
      });
      
    scrapeFacade.getScrapeSequental()
    .then(data => {
      scrapeSeq.title = data.title;
      scrapeSeq.timeSpent = data.timeSpent;
      scrapeSeq.tags = data.tags.map((t, index) => (
        <li key={index}>
          {"url: " + t.url + " "}
          {"divCount: " + t.divCount + " "}
          {"bodyCount: " + t.bodyCount + " "}
        </li>))


      setPressed(true);
      setScrapeParallel({ ...scrapeParallel });
      setScrapeSeq({...scrapeSeq});
    });
  }


  return (
    <div>
      <h2>Scrape</h2>
      {pressed && (
        <React.Fragment>
          <h3>Scrape Parallel:</h3>
          <p>{scrapeParallel.title}</p>
          <p>{scrapeParallel.timeSpent}</p>
          <p>{scrapeParallel.tags}</p>
          <h3>Scrape Sequental</h3>
          <p>{scrapeSeq.title}</p>
          <p>{scrapeSeq.timeSpent}</p>
          <p>{scrapeSeq.tags}</p>

        </React.Fragment>
      )}
      <button onClick={getScrape}>Get Scrape</button>
    </div>
  )
}


function Login() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [errorMsg, setErrorMsg] = useState('');

  const logout = () => {
    facade.logout()
    setLoggedIn(false)
    setErrorMsg('')
  }
  const login = (user, pass) => {
    facade.login(user, pass)
      .then(res => setLoggedIn(true))
      .catch(err => {
        if (err.status){
         err.fullError.then(e => setErrorMsg(e.message)); 
        }
      });
  }

  return (
    <div>
      {!loggedIn ? (<div><LogIn login={login} /><p>{errorMsg}</p></div>) :
        (<div>
          <LoggedIn />
          <button onClick={logout}>Logout</button>
        </div>)}
    </div>
  )

}


function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  }
  const onChange = (evt) => {
    setLoginCredentials({ ...loginCredentials, [evt.target.id]: evt.target.value })
  }

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange} >
        <input placeholder="User Name" id="username" />
        <input placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
        <button onClick={facade.logout}>Logout</button>
      </form>
    </div>
  )

}

function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("Loading...")

  useEffect(() => { facade.fetchData().then(data => setDataFromServer(data.msg)); }, [])

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
    </div>
  )

}




function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3>No match for <code>{location.pathname}</code></h3>
    </div>
  )
}

export default App;
