import React, {useContext, useEffect, useState} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col, Table, FormGroup, Input, Label
} from "reactstrap";
import {useHistory, useLocation} from "react-router-dom";
import Header from "../../../components/Header/Header";
import {toast} from "react-toastify";
import Footer from "../../../components/Footer/Footer";
import {DriversContext} from "../../../context/DriversContext";
import DriverFinder from "../../../apis/DriverFinder";
import {CopyToClipboard} from "react-copy-to-clipboard"
import SidebarPositioning from "../../../components/Header/component/SidebarPositioning";
import FooterUserName from "../../auth/FooterUserName";
import ReactBSAlert from "react-bootstrap-sweetalert";
const Client_ApisMain = () => {
  const [loading, setLoading] = useState(false)

  const { clientapis, setClientapis } = useContext(DriversContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DriverFinder.get("http://localhost:3001/api/v14/data");
        console.log(response.data.data);
        setClientapis(response.data.data.clientapis);
      } catch (err) {}
      setLoading(true)
    };

    fetchData();
  }, [setClientapis]);
  const [searchTerm, setSearchTerm] = useState("")
  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/admin/client_apis/data/${id}/update`);
  };
  const handleDelete = (e, id) => {
    e.stopPropagation();
    history.push(`/admin/client_apis/data/${id}/delete`);
  };
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
  const { addClientapis } = useContext(DriversContext);
  const [email, setEmail ] = useState("");
  const [apikey, setApikey ] = useState("");
  const [company, setCompany ] = useState("");
  const [apitype, setApitype ] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await DriverFinder.post("http://localhost:3001/api/v14/data", {
        email,
        apikey,
        company,
        apitype
      });
      console.log(response.data.data);
      toast.success(`Successfully Added ID ${response.data.data.clientapi.id}!`);
      addClientapis(response.data.data.clientapi);
    } catch (err) {
      console.log(err);
    }
  };
  const [text] = useState("")
  const changeText = (text) => setApitype(text);
  const [sidebarMini, setSidebarMini] = React.useState(true);
  const [toggled, toggle] = useState(false);

  const changeText1 = (text) => setEmail(text);
  const changeText2 = (text) => setApikey(text);
  const changeText3 = (text) => setApitype(text);
  const changeText4 = (text) => setCompany(text);
  return (
    <React.Fragment>
      {toggled && (
        <ReactBSAlert
          style={{ display: "block", marginTop: "-100px" }}
          title="Add Client Api"
          onConfirm={() => handleSubmit() + changeText1("") + changeText2("") + changeText3("") + changeText4("") + toggle((toggled) => !toggled)}
          onCancel={() => toggle((toggled) => !toggled)}
          confirmBtnBsStyle="success"
          confirmBtnText="Submit"
          cancelBtnBsStyle="danger"
          closeOnClickOutside={false}
          showCancel
        >
          <Col style={{textAlign: "left"}} className="checkbox-radios">
            Email:
            <Input
              type="email"
              placeholder="Email"
              value={email} onChange={(e) => setEmail(e.target.value)}
            /><br/>
            Api Key:
            <Input
              type="text"
              placeholder="Api key"
              onChange={(e) => setApikey(e.target.value)}
              value={apikey}
            />
            <hr />
            <FormGroup check className="form-check-radio">
              <h4 style={{color: "black"}}>Api Type: {apitype}</h4>
              <Label check>
                <Input
                  defaultValue="option1"
                  id="exampleRadios1"
                  name="exampleRadios"
                  onClick={() => changeText("Mapbox")}
                  type="radio"
                />
                <span className="form-check-sign" />
                Mapbox
              </Label>
            </FormGroup>
            <FormGroup check className="form-check-radio">
              <Label check>
                <Input
                  defaultValue="option1"
                  id="exampleRadios1"
                  name="exampleRadios"
                  onClick={() => changeText("Tomtom")}
                  type="radio"
                />
                <span className="form-check-sign" />
                Tomtom
              </Label>
            </FormGroup>
            <FormGroup check className="form-check-radio">
              <Label check>
                <Input
                  defaultValue="option1"
                  id="exampleRadios1"
                  name="exampleRadios"
                  onClick={() => changeText("Here")}
                  type="radio"
                />
                <span className="form-check-sign" />
                Here
              </Label>
            </FormGroup>
            <hr />
            Company Name:
            <Input
              type="text"
              placeholder="Company"
              onChange={(e) => setCompany(e.target.value)}
              value={company}
            />
            <hr />
            <FormGroup check className="form-check-radio">
              <input
                value={apitype+text}
                style={{marginLeft: 10, width: 170, visibility: "hidden", position: "absolute"}}
                onChange={(e) => setApitype(e.target.value)}
                type="text"
              />
            </FormGroup>
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
        <div className="content">
          <Row>
            <Col className="mb-5" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Company Client Apis <i style={{cursor: "pointer"}} onClick={() => window.location.reload()} className="tim-icons icon-refresh-02 refresh_hover" /></CardTitle>
                  <div className="container"><button onClick={() => toggle((toggled) => !toggled)} className="btn btn-block btn-info">Add Client Api</button></div><br/>
                  <FormGroup><input onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }} placeholder="Search" type="search" className="form-control"/></FormGroup>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                    <tr className="bg-default">
                      <th style={{color: "white"}}>Email</th>
                      <th style={{color: "white"}}>Api Key</th>
                      <th style={{color: "white"}}>Api Type</th>
                      <th style={{color: "white"}}>Company</th>
                      <th style={{color: "white"}}>Actions</th>
                    </tr>
                    </thead>
                    {loading ? useEffect : <div><i style={{fontSize: "30px"}} className="tim-icons icon-refresh-01 loading" />Loading...</div>}
                    {/* eslint-disable */}
                    {clientapis.filter((val) => {
                      if (searchTerm === "") {
                        return val
                      } else if (
                        val.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.apikey.toLowerCase().includes(searchTerm.toLowerCase())
                      ) {
                        return val
                      }
                    }).map((clientapi) => { return <tbody key={clientapi.id}>
                    <tr className="customCSS_table-hover"
                    >
                      <td style={{borderRight: "2px solid #52585e"}}>{clientapi.email}<CopyToClipboard text={clientapi.email}><strong onClick={() => toast.success(`Copied ${clientapi.email}`)} className="copy_btnCSS">Copy</strong></CopyToClipboard></td>
                      <td style={{borderRight: "2px solid #52585e"}}>{clientapi.apikey}<CopyToClipboard text={clientapi.apikey}><strong onClick={() => toast.success(`Copied Api Key from ${clientapi.email}`)} className="copy_btnCSS">Copy</strong></CopyToClipboard></td>
                      <td style={{borderRight: "2px solid #52585e"}}>{clientapi.apitype}</td>
                      <td style={{borderRight: "2px solid #52585e"}}>{clientapi.company}</td>
                      <td className="edit_boxCSS" ><i onClick={(e) => handleUpdate(e, clientapi.id)} className="tim-icons icon-pencil edit_iconCSS" />
                        <i onClick={(e) => handleDelete(e, clientapi.id)} style={{marginLeft: 20}} className="tim-icons icon-trash-simple delete_iconCSS"  /></td>
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

export default Client_ApisMain;
