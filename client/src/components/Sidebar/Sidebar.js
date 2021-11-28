import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import PerfectScrollbar from "perfect-scrollbar";
import Logo from "../../assets/img/834326.png"

import { Nav, Collapse } from "reactstrap";

let ps;

const Sidebar = (props) => {
  const [state, setState] = React.useState({});
  const sidebarRef = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    setState(getCollapseStates(props.routes));
    /* eslint-disable-next-line */
  }, [props.routes]);

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarRef.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.map((prop) => {
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
      return null;
    });
    return initialState;
  };
  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.href.indexOf(routes[i].path) !== -1) {
        return true;
      }
    }
    return false;
  };
  const createLinks = (routes) => {
    const { rtlActive } = props;
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <>
            <li
              className={getCollapseInitialState(prop.views) ? "active" : ""}
              key={key}
            >
              <a
                href="/#"
                data-toggle="collapse"
                aria-expanded={state[prop.state]}
                onClick={(e) => {
                  e.preventDefault();
                  setState({ ...state, ...st });
                }}
              >
                {prop.icon !== undefined ? (
                  <>
                    <i className={prop.icon} />
                    <p>
                      {rtlActive ? prop.rtlName : prop.name}
                      <b className="caret" />
                    </p>
                  </>
                ) : (
                  <>
                  <span className="sidebar-mini-icon">
                    {rtlActive ? prop.rtlMini : prop.mini}
                  </span>
                    <span className="sidebar-normal">
                    {rtlActive ? prop.rtlName : prop.name}
                      <b className="caret" />
                  </span>
                  </>
                )}
              </a>
              <Collapse isOpen={state[prop.state]}>
                <ul className="nav">{createLinks(prop.views)}</ul>
              </Collapse>
            </li>
          </>
        );
      }
      return (
        <li className={activeRoute(prop.layout + prop.path)} key={key}>
          <NavLink
            to={prop.layout + prop.path}
            activeClassName=""
            onClick={props.closeSidebar}
          >
            {prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <p>{rtlActive ? prop.rtlName : prop.name}</p>
              </>
            ) : (
              <>
                <span className="sidebar-mini-icon">
                  {rtlActive ? prop.rtlMini : prop.mini}
                </span>
                <span className="sidebar-normal">
                  {rtlActive ? prop.rtlName : prop.name}
                </span>
              </>
            )}
          </NavLink>

        </li>
      );
    });
  };
  const activeRoute = (routeName) => {
    return location.pathname === routeName ? "active" : "";
  };

  const { activeColor, logo } = props;
  let logoImg = null;
  let logoText = null;
  if (logo !== undefined) {
    if (logo.outterLink !== undefined) {
      logoImg = (
        <a
          href={logo.outterLink}
          className="simple-text logo-mini"
          target="_blank"
          rel="noreferrer"
          onClick={props.closeSidebar}
        >
          <div className="logo-img">
            <img width="100%" height="100%" src={Logo} alt="react-logo" />
          </div>
        </a>
      );
      logoText = (
        <a
          href={logo.outterLink}
          className="simple-text logo-normal"
          target="_blank"
          rel="noreferrer"
          onClick={props.closeSidebar}
        >
          {logo.text}
        </a>
      );
    } else {
      logoImg = (
        <>
          <NavLink
            to={logo.innerLink}
            className="simple-text logo-mini"
            onClick={props.closeSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </NavLink>
        </>
      );
      logoText = (
        <>
          <NavLink
            to={logo.innerLink}
            className="simple-text logo-normal"
            onClick={props.closeSidebar}
          >
            {logo.text}
          </NavLink>
        </>
      );
    }
  }
  return (
    <>
      <div className="sidebar" data={activeColor}>
        <div className="sidebar-wrapper" ref={sidebarRef}>
          {logoImg !== null || logoText !== null ? (
            <div className="logo">
              {logoImg}
              {logoText}
            </div>
          ) : null}
          <Nav>{createLinks(props.routes)}</Nav>
        </div>
      </div>
    </>
  );
};

Sidebar.propTypes = {
  activeColor: PropTypes.oneOf(["primary", "blue", "green", "orange", "red"]),
  rtlActive: PropTypes.bool,
  routes: PropTypes.array.isRequired,
  logo: PropTypes.oneOfType([
    PropTypes.shape({
      innerLink: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
    PropTypes.shape({
      outterLink: PropTypes.string.isRequired,
      imgSrc: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ]),
  // this is used on responsive to close the sidebar on route navigation
  closeSidebar: PropTypes.func,
};

export default Sidebar;
