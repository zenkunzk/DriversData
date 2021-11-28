import React from "react"
import {
  Button,
  Collapse,
  Container, CustomInput, DropdownItem, DropdownMenu, DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand, NavLink,
  UncontrolledDropdown,
} from "reactstrap";
import classNames from "classnames";
import {useHistory} from "react-router-dom";
const Header = ({setAuth}, props) => {
  let history = useHistory();
  const [sidebarMini, setSidebarMini] = React.useState(true);
  const [sidebarOpened, setSidebarOpened] = React.useState(false);

  const handleMiniClick = () => {
    if (document.body.classList.contains("sidebar-mini")) {
      setSidebarMini(false);
    } else {
      setSidebarMini(true);
    }
    document.body.classList.toggle("sidebar-mini");
  };
  const toggleSidebar = () => {
    setSidebarOpened(!sidebarOpened);
    document.documentElement.classList.toggle("nav-open");
  };
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [color, setColor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setColor("bg-white");
    } else {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    if (collapseOpen) {
      setColor("navbar-transparent");
    } else {
      setColor("bg-white");
    }
    setCollapseOpen(!collapseOpen);
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  const [darkMode, setDarkMode] = React.useState(false);
  const handleActiveMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("white-content");
  };
  return (
    <>
      <div style={{visibility: "hidden", position: "absolute"}}>
        {sidebarMini}
        {color}
      </div>
      <Navbar
        className="navbar-absolute"
        expand="lg"
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-minimize d-inline">
              <Button
                className="minimize-sidebar btn-just-icon"
                color="link"
                style={{color: "transparent"}}
                id="tooltip209599"
                onClick={handleMiniClick}
              >
                `
                <i className="tim-icons icon-align-center visible-on-sidebar-regular" />
                <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini" />
              </Button>
            </div>
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: sidebarOpened,
              })}
            >
              <button
                className="navbar-toggler"
                type="button"
                style={{color: "transparent"}}
                onClick={toggleSidebar}
              >
                .
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="#">Drivers Data</NavbarBrand>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navigation"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div>
                    User
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                </DropdownToggle>
                <DropdownMenu style={{background: "white"}} className="dropdown-navbar" right tag="ul">
                  <DropdownItem  divider tag="li" />
                  <ul className="dropdown-menu show">
                    <li style={{color: "black"}} className="header-title">Settings</li>
                    <li style={{color: "black"}} className="header-title">SIDEBAR MINI</li>
                    <li className="adjustments-line">
                      <div className="togglebutton switch-sidebar-mini d-flex align-items-center justify-content-center">
                        <span style={{color: "black"}} className="label-switch">OFF</span>
                        <CustomInput
                          type="switch"
                          id="switch-1"
                          onChange={handleMiniClick}
                          value={props.sidebarMini}
                          className="mt-n4"
                        />
                        <span style={{color: "black"}} className="label-switch ml-n3">ON</span>
                      </div>
                    </li>
                    <li className="adjustments-line">
                      <div className="togglebutton switch-change-color mt-3 d-flex align-items-center justify-content-center">
                        <span style={{color: "black"}} className="label-switch">DARK MODE</span>
                        <CustomInput
                          type="switch"
                          id="switch-2"
                          onChange={handleActiveMode}
                          value={darkMode}
                          className="mt-n4"
                        />
                        <span style={{color: "black"}} className="label-switch ml-n3">LIGHT MODE</span>
                      </div>
                      <br />
                    </li>
                  </ul>
                  <NavLink tag="li">
                    <DropdownItem style={{color: "black"}} onClick={e => logout(e) + window.location.reload(history.push(`/login`))} className="nav-item">Log out</DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header
