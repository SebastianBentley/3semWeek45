import './App.css';
import React, { useState } from "react";
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

function App({ bookFacade }) {
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
        <Route path="/products">
          <Products bookFacade={bookFacade} />
        </Route>
        <Route path="/add-book">
          <AddBook bookFacade={bookFacade} />
        </Route>
        <Route path="/company">
          <Company />
        </Route>
        <Route path="/find-book">
          <FindBook bookFacade={bookFacade} />
        </Route>
        <Route path="/login-out">
          <Login
            isLoggedIn={isLoggedIn}
            loginMsg={isLoggedIn ? "Logout" : "Login"}
            setLoginStatus={setLoginStatus}
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
      <li><NavLink activeClassName="active" to="/products">Products</NavLink></li>
      {isLoggedIn && (
        <React.Fragment>
          <li><NavLink activeClassName="active" to="/add-book">Add Book</NavLink></li>
          <li><NavLink activeClassName="active" to="/find-book">Find Book</NavLink></li>
        </React.Fragment>)}
      <li><NavLink activeClassName="active" to="/company">Company</NavLink></li>
      <li><NavLink activeClassName="active" to="/login-out">{loginMsg}</NavLink></li>
    </ul>

  )
}

function AddBook({ bookFacade }) {
  const [book, setBook] = useState({ id: 0, title: "", info: "" });
  let [isBlocking, setIsBlocking] = useState(false);
  const onTitleChange = evt => {
    const val = evt.target.value;
    setIsBlocking(val.length > 0);
    book.title = val;
    setBook({ ...book });
  }
  const onInfoChange = evt => {
    const val = evt.target.value;
    setIsBlocking(val.length > 0);
    book.info = val;
    setBook({ ...book });

  }


  return (
    <div>
      <h2>Add Book</h2>
      <form onSubmit={event => {
        event.preventDefault();
        setIsBlocking(false);
        if (book.title && book.info !== "") {
          bookFacade.addBook(book)
        }
      }}>
        <Prompt
          when={isBlocking}
          message={location => `Are you sure you want to go to ${location.pathname}`}
        />
        <input type="text" id="title" onChange={onTitleChange} placeholder="Add title" value={book.title} /><br />
        <input type="text" id="info" onChange={onInfoChange} placeholder="Add Info" value={book.info} /><br />
        <input type="submit" value="Save" />
      </form>
    </div>
  )
}

function Home() {
  return (
    <h2>Home</h2>
  )
}

function Products({ bookFacade }) {
  let { path, url } = useRouteMatch();
  const listBooks = bookFacade.getBooks().map(b => (
    <li key={b.id}>
      {b.title + " "}
      <Link to={`${url}/components/${b.id}`}>details</Link>
    </li>))
  return (
    <div>
      <h2>Products</h2>
      <p>{listBooks}</p>
      <Switch>
        <Route path={`${path}/components/:id`}>
          <Details bookFacade={bookFacade} />
        </Route>
      </Switch>

    </div>
  )
}

function Details({ bookFacade }) {
  let { id } = useParams();
  let book = bookFacade.findBook(id);
  return (
    <div >
      <p className="InfoBox"> Title: {book.title} <br /> ID: {book.id} <br /> Info: {book.info} </p>
    </div>
  )
}


function Company() {
  return (
    <h2>Company</h2>
  )
}

function FindBook({ bookFacade }) {
  const [bookId, setBookId] = useState('')
  const [book, setBook] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newInfo, setNewInfo] = useState('');

  const onChange = evt => {
    const val = evt.target.value;
    setBookId(val);
  }

  const onSubmit = evt => {
    evt.preventDefault();
    let book = bookFacade.findBook(bookId);
    setBook(book);
    if (undefined !== book) {
      setNewTitle(book.title);
      setNewInfo(book.info);
    }
  }

  const deleteBook = id => {
    bookFacade.deleteBook(id);
    setBook(null);
  }

  const editBook = (oldBook, newTitle, newInfo) => {
    bookFacade.editBook(oldBook, newTitle, newInfo);
    let newBook = bookFacade.findBook(oldBook.id);
    setBook({ ...newBook });
  }


  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" id="bookId" value={bookId} onChange={onChange} placeholder="Enter Book id" />
        <input type="submit" value="Find book" />
      </form>
      {book && (
        <div>
          <p> Title: {book.title} <br /> ID: {book.id} <br /> Info: {book.info} </p>
          <div>
            <button onClick={() => deleteBook(book.id)}>Delete Book</button>
          </div>
          <br />
          <form onSubmit={(e) => {
            e.preventDefault();
            editBook(book, newTitle, newInfo);
          }}>
            New Title: <input type="text" id="newTitle" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} /><br />
            New Info: <input type="text" id="newInfo" value={newInfo} onChange={(e) => setNewInfo(e.target.value)} /><br />
            <input type="submit" value="Edit Book" />
          </form>

        </div>
      )}
      {!book && <p>Enter id for book to see </p>}
    </div>
  )
}

function Login({ isLoggedIn, loginMsg, setLoginStatus }) {
  const handleBtnClick = () => {
    setLoginStatus(!isLoggedIn);
  }
  return (
    <div>
      <h2>{loginMsg}</h2>
      <em>This simulates a real login page. Here you jsut need to press the button</em>
      <em> In a real application you obviously need to add your credentials, and login via the server</em>
      <br />
      <button onClick={handleBtnClick}>{loginMsg}</button>
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
