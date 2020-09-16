import React, {useEffect, useState} from "react";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import getHistory from "react-router-global-history";
import {
  Button,
  Container,
  Content,
  Dropdown,
  Footer,
  Header,
  Icon,
  Nav,
  Navbar,
} from "rsuite";
import HomePage from "./Home/home.page";
import LoginPage from "./Login/login.page";
import {getToken, removeUserSession} from "helpers/auth.helper";
import RegisterStaffBuider from "Containers/registerStaffBuilder";

const Main = () => {
  const [loged, setLoged] = useState(false);
  const token = getToken();
  const handleLogin = (param) => {
    sessionStorage.setItem("loged", true);
    setLoged(param);
  };
  const logout = () => {
    removeUserSession(() => {
      handleLogin(false);
      getHistory().push("/login");
    });
  };
  useEffect(() => {
    setLoged(getToken());
  }, [token]);
  return (
    <div className="show-fake-browser navbar-page">
      <Container>
        <Header>
          <Navbar appearance="inverse" style={{marginBottom: "20px"}}>
            <Navbar.Header>
              <a className="navbar-brand logo">Alquiler de Peliculas</a>
            </Navbar.Header>
            <Navbar.Body>
              {loged ? (
                <Nav>
                  <Nav.Item icon={<Icon icon="home" />}>
                    <Link to="/home" style={{color: "white"}}>
                      Home
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link to="/customer/list" style={{color: "white"}}>
                      Customer
                    </Link>
                  </Nav.Item>
                  <Nav.Item>Mi Store</Nav.Item>
                  <Dropdown title="About">
                    <Dropdown.Item>Company</Dropdown.Item>
                    <Dropdown.Item>Team</Dropdown.Item>
                    <Dropdown.Item>Contact</Dropdown.Item>
                  </Dropdown>
                </Nav>
              ) : (
                <Nav>
                  <Dropdown title={"Inicie Session "}></Dropdown>
                </Nav>
              )}

              {loged && (
                <Nav pullRight>
                  <Dropdown title={"Bienvenido"}>
                    <Dropdown.Item>Mis datos</Dropdown.Item>
                    <Dropdown.Item>Registrar</Dropdown.Item>
                    <Dropdown.Item>
                      <Button onClick={logout}>Salir</Button>
                    </Dropdown.Item>
                  </Dropdown>
                </Nav>
              )}
            </Navbar.Body>
          </Navbar>
        </Header>
        <Content>
          <Switch>
            <Container>
              <Route
                path="/login"
                exact
                render={() => {
                  return !loged ? (
                    <LoginPage handleLogin={handleLogin} />
                  ) : (
                    <Redirect to="/home" />
                  );
                }}
              />
              <ProtectedRute
                path="/home"
                exact
                logedstatus={loged}
                component={HomePage}
              />
              <ProtectedRute
                exact
                path="/customer/list"
                logedstatus={loged}
                component={RegisterStaffBuider}
              />
            </Container>
          </Switch>
        </Content>
      </Container>
    </div>
  );
};

export default Main;

const ProtectedRute = ({component: Component, logedstatus, ...rest}) => {
  return logedstatus !== null ? (
    <Route {...rest} render={(prop) => <Component {...prop} />} />
  ) : (
    <Redirect to="/login" />
  );
};
