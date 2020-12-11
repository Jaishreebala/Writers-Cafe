import React, { useState } from 'react'
import { Switch, Route, useLocation } from 'react-router-dom';
import './styles/app.scss'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Read from './pages/Read'
import Profile from './pages/Profile'
import ReadWrittenWork from './pages/ReadWrittenWork'
import EditWrittenwork from './pages/EditWrittenwork'
import CreateWrittenwork from './pages/CreateWrittenwork'

import Resetpassword from './pages/Resetpassword'
import Nav from './components/Nav';
function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      <Nav isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Switch location={location} key={location.pathname}>
        <Route path="/" exact >
          <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/read" exact>
          <Read isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/profile" exact>
          <Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/login" exact>
          <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/register" exact>
          <Register isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/createWrittenwork" exact>
          <CreateWrittenwork isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/resetpassword/:resettoken" exact>
          <Resetpassword isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/readwrittenwork/:id" exact>
          <ReadWrittenWork isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route path="/editwrittenwork/:id" exact>
          <EditWrittenwork isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
