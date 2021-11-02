import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav} from "react-bootstrap"
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from './helpers/history';

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router history={history}>
        <div>
          <Navbar bg="secondary" expand="sm">
            <Container fluid>
              <Navbar.Brand>
                <Link to={"/home"}>Home</Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                  {showModeratorBoard && (
                  <Nav.Link>

                        <li className="nav-item">
                          <Link to={"/mod"} className="nav-link">
                            Moderator
                          </Link>
                        </li>
                  </Nav.Link>
                  )}
                  {showAdminBoard && (
                  <Nav.Link>
                        <li className="nav-item">
                          <Link to={"/admin"} className="nav-link">
                            Administrator
                          </Link>
                        </li>
                  </Nav.Link>
                  )}

                  {currentUser && (
                  <Nav.Link>
                        <li className="nav-item">
                          <Link to={"/user"} className="nav-link">
                            User
                          </Link>
                        </li>
                  </Nav.Link>
                  )}
                </Nav>
                <Nav>
                  <Nav.Link>
                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                          <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                              {currentUser.username}
                            </Link>
                          </li>
                          <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={this.logOut}>
                              Wyloguj
                            </a>
                          </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                          <li className="nav-item">
                            <Link to={"/login"} className="nav-link">
                              Zaloguj
                            </Link>
                          </li>

                          <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                              Zarejestruj
                            </Link>
                          </li>
                        </div>
                    )}
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
            </Switch>
          </div>

          {/* <AuthVerify logOut={this.logOut}/> */}
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
