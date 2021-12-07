import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Navbar, Container, Nav, NavDropdown} from "react-bootstrap"
import "./App.css";

import Login from "./components/login.component";
import Register from "./components/admin/registerCompany/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardCompany from "./components/board-company.component";
import BoardAdmin from "./components/board-admin.component";
import RegisterEmployee from "./components/company/employee/register-employee.component";
import AllPaymentsComponent from "./components/admin/payment/all-payments.component";
import CompanyPaymentsController from "./components/company/payments-component";
import DisplayCompaniesController from "./components/admin/company/display-companies.component";
import TasksController from "./components/company/task/tasks.component";
import CreateTaskController from "./components/company/task/create-task.component";
import TasksEmployeeNotAccepted from "./components/employee/task/tasks-employee_not_accepted.component";
import TasksEmployeeInProgress from "./components/employee/task/tasks-employee-in-progress.component";
import TasksEmployeeDone from "./components/employee/task/tasks-employee-done.component";
import AgreementsController from "./components/company/agreement/agreements-component";
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
      showCompanyBoard: false,
      showAdminBoard: false,
      showEmployeeBoard: false,
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
        showCompanyBoard: user.roles.includes("ROLE_COMPANY"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showEmployeeBoard: user.roles.includes("ROLE_EMPLOYEE"),
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
      showCompanyBoard: false,
      showAdminBoard: false,
      showEmployeeBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showCompanyBoard, showAdminBoard, showEmployeeBoard } = this.state;

    return (
      <Router history={history}>
        <div>
          <Navbar bg="secondary" expand="sm">
            <Container fluid>
              <Navbar.Brand href="/home">Home</Navbar.Brand>
              <Navbar.Collapse></Navbar.Collapse>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="me-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                    navbarScroll
                >
                  {/*{showCompanyBoard && (*/}
                  {/*<Nav.Link>*/}

                  {/*      <li className="nav-item">*/}
                  {/*        <Link to={"/company"} className="nav-link">*/}
                  {/*          Firma*/}
                  {/*        </Link>*/}
                  {/*      </li>*/}
                  {/*</Nav.Link>*/}
                  {/*)}*/}

                  {showCompanyBoard && (
                      <Nav.Link>
                        <li className="nav-item">
                          <Link to={"/register_employee"} className="nav-link">
                            Stwórz umowę
                          </Link>
                        </li>
                      </Nav.Link>
                  )}

                  {showCompanyBoard && (
                      <Nav.Link>
                        <li className="nav-item">
                          <Link to={"/company_payments"} className="nav-link">
                            Opłaty
                          </Link>
                        </li>
                      </Nav.Link>
                  )}

                  {showCompanyBoard && (
                      <Nav.Link>
                        <li className="nav-item">
                          <Link to={"/company_tasks"} className="nav-link">
                            Zadania
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

                  {showAdminBoard && (
                      <Nav.Link>
                        <li className="nav-item">
                          <Link to={"/all_payments"} className="nav-link">
                            Płatności
                          </Link>
                        </li>
                      </Nav.Link>
                  )}

                  {showAdminBoard && (
                      <Nav.Link>
                        <li className="nav-item">
                          <Link to={"/register"} className="nav-link">
                            Zarejestruj firmę
                          </Link>
                        </li>
                      </Nav.Link>
                  )}

                  {showAdminBoard && (
                      <Nav.Link>
                        <li className="nav-item">
                          <Link to={"/companies"} className="nav-link">
                            Wszystkie firmy
                          </Link>
                        </li>
                      </Nav.Link>
                  )}

                  {showEmployeeBoard && (
                      <Nav.Link>
                        <li className="nav-item">
                          <Link to={"/tasks_employee_not_accepted"} className="nav-link">
                            Przydzielone zadania
                          </Link>
                        </li>
                      </Nav.Link>
                  )}

                  {showEmployeeBoard && (
                      <Nav.Link>
                        <li className="nav-item">
                          <Link to={"/tasks_employee_in_progress"} className="nav-link">
                            Aktualne Zadania
                          </Link>
                        </li>
                      </Nav.Link>
                  )}

                  {showEmployeeBoard && (
                      <Nav.Link>
                        <li className="nav-item">
                          <Link to={"/tasks_employee_done"} className="nav-link">
                            Wykonane Zadania
                          </Link>
                        </li>
                      </Nav.Link>
                  )}

                  {/*{currentUser && (*/}
                  {/*<Nav.Link>*/}
                  {/*      <li className="nav-item">*/}
                  {/*        <Link to={"/user"} className="nav-link">*/}
                  {/*          User*/}
                  {/*        </Link>*/}
                  {/*      </li>*/}
                  {/*</Nav.Link>*/}
                  {/*)}*/}
                </Nav>
                <Nav>
                  <Nav.Link>
                    <NavDropdown title={
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor"
                           className="bi bi-person-lines-fill" viewBox="0 0 16 16">
                        <path
                            d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                      </svg>
                    }  id="navbarScrollingDropdown">
                      <NavDropdown.Item>
                        <Link to={"/agreements"} className="nav-link">
                          Umowy
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link className="nav-link">
                          Pacownicy
                        </Link>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav.Link>
                  <Nav.Link>
                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                          {/*<li className="nav-item">*/}
                          {/*  <Link to={"/profile"} className="nav-link">*/}
                          {/*    {currentUser.username}*/}
                          {/*  </Link>*/}
                          {/*</li>*/}
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
              <Route exact path="/register_employee" component={RegisterEmployee} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/company" component={BoardCompany} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/all_payments" component={AllPaymentsComponent} />
              <Route path="/company_payments" component={CompanyPaymentsController} />
              <Route path="/companies" component={DisplayCompaniesController} />
              <Route path="/company_tasks" component={TasksController} />
              <Route path="/create_task" component={CreateTaskController} />
              <Route path="/tasks_employee_not_accepted" component={TasksEmployeeNotAccepted} />
              <Route path="/tasks_employee_in_progress" component={TasksEmployeeInProgress} />
              <Route path="/tasks_employee_done" component={TasksEmployeeDone} />
              <Route path="/agreements" component={AgreementsController} />
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
