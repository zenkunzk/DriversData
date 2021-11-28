import React, {useContext, useEffect, useState} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col, Table, FormGroup, Input, Label
} from "reactstrap";
import {useLocation} from "react-router-dom";
import Header from "../../components/Header/Header";
import {toast} from "react-toastify";
import Footer from "../../components/Footer/Footer";
import {DriversContext} from "../../context/DriversContext";
import DriverFinder from "../../apis/DriverFinder";
import SidebarPositioning from "../../components/Header/component/SidebarPositioning";
import FooterUserName from "../auth/FooterUserName";
import ReactBSAlert from "react-bootstrap-sweetalert";
const Register = ({setAuth}) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: ""
  });

  const { email, password, name } = inputs;


  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    try {
      const body = { email, password, name };
      const response = await fetch(
        "http://localhost:3001/auth/register",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Register Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const { users, setUsers } = useContext(DriversContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DriverFinder.get("http://localhost:3001/api/v5/data");
        console.log(response.data.data);
        setUsers(response.data.data.users);
      } catch (err) {}
      setLoading(true)
    };

    fetchData();
  }, [setUsers]);

  const [loading, setLoading] = useState(false)

  const [searchTerm, setSearchTerm] = useState("")
  const [opacity, setOpacity] = React.useState(0);
  const mainPanelRef = React.useRef(null);
  const location = useLocation();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);
  React.useEffect(() => {
    let innerMainPanelRef = mainPanelRef;
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.classList.add("perfect-scrollbar-on");
      document.documentElement.classList.remove("perfect-scrollbar-off");
      mainPanelRef.current &&
      mainPanelRef.current.addEventListener("ps-scroll-y", showNavbarButton);
    }
    window.addEventListener("scroll", showNavbarButton);
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        innerMainPanelRef.current &&
        innerMainPanelRef.current.removeEventListener(
          "ps-scroll-y",
          showNavbarButton
        );
      }
      window.removeEventListener("scroll", showNavbarButton);
    };
  }, []);
  const showNavbarButton = () => {
    if (
      document.documentElement.scrollTop > 50 ||
      document.scrollingElement.scrollTop > 50 ||
      (mainPanelRef.current && mainPanelRef.current.scrollTop > 50)
    ) {
      setOpacity(1);
    } else if (
      document.documentElement.scrollTop <= 50 ||
      document.scrollingElement.scrollTop <= 50 ||
      (mainPanelRef.current && mainPanelRef.current.scrollTop <= 50)
    ) {
      setOpacity(0);
    }
  };
  const [collapseOpen] = React.useState(false);
  const [color, setColor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setColor("bg-white");
    } else {
      setColor("navbar-transparent");
    }
  };
  const [activeColor] = React.useState("blue");
  const handleMiniClick = () => {
    if (document.body.classList.contains("sidebar-mini")) {
      setSidebarMini(false);
    } else {
      setSidebarMini(true);
    }
    document.body.classList.toggle("sidebar-mini");
  };
  const [sidebarMini, setSidebarMini] = React.useState(true);
  const [toggled, toggle] = useState(false);
  return (
    <React.Fragment>
      {toggled && (
        <ReactBSAlert
          style={{ display: "block", marginTop: "-100px" }}
          title="Add New User"
          onConfirm={onSubmitForm}
          onCancel={() => toggle((toggled) => !toggled)}
          confirmBtnBsStyle="success"
          confirmBtnText="Submit"
          cancelBtnBsStyle="danger"
          closeOnClickOutside={false}
          showCancel
        >

          <Col style={{textAlign: "left"}} className="checkbox-radios">
            <Label className="d-flex">Email <div style={{color: "red", fontSize: 12}}>* Required</div></Label>
            <Input
              type="email"
              name="email"
              value={email}
              placeholder="Enter Email"
              onChange={e => onChange(e)}
            />
            <br />
            <Label className="d-flex">Password <div style={{color: "red", fontSize: 12}}>* Required</div></Label>
            <Input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={e => onChange(e)}
            />
            <br />
            <Label className="d-flex">Name <div style={{color: "red", fontSize: 12}}>* Required</div></Label>
            <Input
              type="name"
              name="name"
              value={name}
              placeholder="Name"
              onChange={e => onChange(e)}
            />
          </Col>
        </ReactBSAlert>
      )}
      <div style={{position: "absolute", visibility: "hidden"}}>
        {opacity}
        {color}
        {sidebarMini}
      </div>
      <div className="navbar-minimize-fixed" style={{ opacity: opacity }}>
        <button
          className="minimize-sidebar btn btn-link btn-just-icon"
          onClick={handleMiniClick}
        >
          `
          <i className="tim-icons icon-align-center visible-on-sidebar-regular text-muted" />
          <i className="tim-icons icon-bullet-list-67 visible-on-sidebar-mini text-muted" />
        </button>
      </div>
      <SidebarPositioning />
      <div className="main-panel" ref={mainPanelRef} data={activeColor}>
        <Header />
        <div className="content container">
          <Row>
            <Col className="mb-5" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Users <i style={{cursor: "pointer"}} onClick={() => window.location.reload()} className="tim-icons icon-refresh-02 refresh_hover" /></CardTitle>
                  <div className="container"><button onClick={() => toggle((toggled) => !toggled)} className="btn btn-block btn-info">Add New User</button></div><br/>
                  <FormGroup><input onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }} placeholder="Search" type="search" className="form-control"/></FormGroup>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                    <tr className="bg-default">
                      <th style={{color: "white"}}>Name</th>
                      <th style={{color: "white"}}>Email</th>
                    </tr>
                    </thead>
                    {loading ? useEffect : <div><i style={{fontSize: "30px"}} className="tim-icons icon-refresh-01 loading" />Loading...</div>}
                    {/* eslint-disable */}
                    {users.filter((val) => {
                      if (searchTerm === "") {
                        return val
                      } else if (
                        val.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.user_email.toLowerCase().includes(searchTerm.toLowerCase())
                      ) {
                        return val
                      }
                    }).map((user) => { return <tbody key={user.id}>
                    <tr className="customCSS_table-hover"
                    >
                      <td>{user.user_name}</td>
                      <td style={{borderLeft: "2px solid #52585e"}} >{user.user_email}</td>
                    </tr>
                    </tbody> })}
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <FooterUserName />
        </div>
        {
          <Footer fluid />
        }
      </div>
    </React.Fragment>
  );
};

export default Register;
