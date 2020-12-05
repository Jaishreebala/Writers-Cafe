import React from 'react'
import { BrowserRouter as Router, Switch, Route, useLocation } from 'react-router-dom';
import './styles/app.scss'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Read from './pages/Read'
import Nav from './components/Nav';
function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Nav />
      <Router>
        <Switch location={location} key={location.pathname}>
          <Route path="/" exact component={Home} />
          {/* <Home />
          </Route> */}
          <Route path="/read" exact>
            <Read />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
