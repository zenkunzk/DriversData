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
const Api_CalendarMain = () => {
  const [loading, setLoading] = useState(false)

  const { calendars, setCalendars } = useContext(DriversContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DriverFinder.get("http://localhost:3001/api/v11/data");
        console.log(response.data.data);
        setCalendars(response.data.data.calendars);
      } catch (err) {}
      setLoading(true)
    };

    fetchData();
  }, [setCalendars]);
  const [searchTerm, setSearchTerm] = useState("")
  const openPopUp = (e, id) => {
    e.stopPropagation();
    history.push(`/admin/api_calendar/data/${id}/update/pop-up/daynumber_`);
  };
  const editDate = (e, id) => {
    e.stopPropagation();
    history.push(`/admin/api_calendar/data/${id}/update/pop-up/dateset_`);
  };
  const editDay = (e, id) => {
    e.stopPropagation();
    history.push(`/admin/api_calendar/data/${id}/update/day_`);
  };
  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/admin/api_calendar/data/${id}/update`);
  };
  const handleDelete = (e, id) => {
    e.stopPropagation();
    history.push(`/admin/api_calendar/data/${id}/delete`);
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
  const { addCalendars } = useContext(DriversContext);
  const [daynumber, setDaynumber ] = useState("");
  const [email, setEmail ] = useState("");
  const [api, setApi ] = useState("");
  const [startdate, setStartdate ] = useState("");
  const [enddate, setEnddate ] = useState("");
  const [type, setType ] = useState("");
  const [current, setCurrent ] = useState("");
  const [date, setDate ] = useState("");
  const [companycolor, setCompanycolor ] = useState("");
  const [inuse, setInuse ] = useState("");
  const [inusetwo, setInusetwo ] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await DriverFinder.post("http://localhost:3001/api/v11/data", {
        daynumber,
        email,
        api,
        startdate,
        enddate,
        type,
        current,
        companycolor,
        date,
        inuse,
        inusetwo,
      });
      console.log(response.data.data);
      toast.success(`Successfully Added ID ${response.data.data.calendar.id}!`);
      addCalendars(response.data.data.calendar);
    } catch (err) {
      console.log(err);
    }
  };
  const [text] = useState("")
  const changeText = (text) => setType(text);
  const [sidebarMini, setSidebarMini] = React.useState(true);
  const [toggled, toggle] = useState(false);

  const changeText1 = (text) => setDaynumber(text);
  const changeText2 = (text) => setEmail(text);
  const changeText3 = (text) => setApi(text);
  const changeText4 = (text) => setStartdate(text);
  const changeText5 = (text) => setEnddate(text);
  return (
    <React.Fragment>
      {toggled && (
        <ReactBSAlert
          style={{ display: "block", marginTop: "-100px" }}
          title="Add Data"
          onConfirm={() => handleSubmit() + toggle((toggled) => !toggled) + changeText1("") + changeText2("") + changeText3("") + changeText4("") + changeText5("") + changeText("")}
          onCancel={() => toggle((toggled) => !toggled)}
          confirmBtnBsStyle="success"
          confirmBtnText="Submit"
          cancelBtnBsStyle="danger"
          closeOnClickOutside={false}
          showCancel
        >

          <Col style={{textAlign: "left"}} className="checkbox-radios">
            Day:
            <Input
              value={daynumber} onChange={(e) => setDaynumber(e.target.value)} placeholder="Day Number" type="number"
            /><br/>
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
              onChange={(e) => setApi(e.target.value)}
              value={api}
            />
            <hr />
            <FormGroup check className="form-check-radio">
              <h4 style={{color: "black"}}>Type: {type}</h4>
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
            <FormGroup check className="form-check-radio">
              <input
                value={type+text}
                style={{marginLeft: 10, width: 170, visibility: "hidden", position: "absolute"}}
                onChange={(e) => setType(e.target.value)}
                type="text"
              />
            </FormGroup>
            <h4 style={{color: "black"}}>Start/End Date: From {startdate} to {enddate}</h4>
            <Col className="data-actions">
              <Row>
                <Col md="6">
                  <FormGroup>
                    <Input value={startdate} onChange={(e) => setStartdate(e.target.value)} placeholder="Start" type="number" />
                  </FormGroup>
                </Col>
                <Col md="6">
                  <FormGroup>
                    <Input value={enddate} onChange={(e) => setEnddate(e.target.value)} placeholder="End" type="number" />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Col>
        </ReactBSAlert>
      )}
      <div style={{position: "absolute", visibility: "hidden"}}>
        {opacity}
        {color}
        {sidebarMini}
        {setCurrent}
        {setDate}
        {setCompanycolor}
        {setInuse}
        {setInusetwo}
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
                  <CardTitle tag="h4">API Calendar <i style={{cursor: "pointer"}} onClick={() => window.location.reload()} className="tim-icons icon-refresh-02 refresh_hover" /></CardTitle>
                  <div className="container"><button onClick={() => toggle((toggled) => !toggled)} className="btn btn-block btn-info">Add Data</button></div><br/>
                  <FormGroup><input onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }} placeholder="Search" type="search" className="form-control"/></FormGroup>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                    <tr className="bg-default">
                      <th style={{color: "white"}}>Day</th>
                      <th style={{color: "white"}}>Email</th>
                      <th style={{color: "white"}}>Api</th>
                      <th style={{color: "white"}}>Company Use</th>
                      <th style={{color: "white"}}>Day Set/Last Used</th>
                      <th style={{color: "white"}}>Type</th>
                      <th style={{color: "white"}}>Date</th>
                      <th style={{color: "white"}}>Actions</th>
                    </tr>
                    </thead>
                    {loading ? useEffect : <div><i style={{fontSize: "30px"}} className="tim-icons icon-refresh-01 loading" />Loading...</div>}
                    {/* eslint-disable */}
                    {calendars.filter((val) => {
                      if (searchTerm === "") {
                        return val
                      } else if (
                        val.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.api.toLowerCase().includes(searchTerm.toLowerCase())
                      ) {
                        return val
                      }
                    }).map((calendar) => { return <tbody key={calendar.id}>
                    <tr className="customCSS_table-hover"
                    >
                      <td onClick={(e) => editDay(e, calendar.id)} className="e_day" ><div style={{color: "white"}}>{calendar.daynumber}</div></td>
                      <td style={{borderRight: "2px solid #52585e"}} >{calendar.email}<CopyToClipboard text={calendar.email}><strong onClick={() => toast.success(`Copied ${calendar.email}`)} className="copy_btnCSS">Copy</strong></CopyToClipboard></td>
                      <td>{calendar.api}<CopyToClipboard text={calendar.api}><strong onClick={() => toast.success(`Copied ${calendar.api}`)} className="copy_btnCSS">Copy</strong></CopyToClipboard></td>
                      <td onClick={(e) => openPopUp(e, calendar.id)} style={{border: calendar.inuse, background: calendar.inusetwo}} className="border_companyUse"><strong style={{background: calendar.companycolor, textAlign: "center", borderRadius: "100px", padding: 6.5, color: "black"}}>{calendar.current}</strong></td>
                      <td onClick={(e) => editDate(e, calendar.id)} style={{borderRight: "2px solid #52585e", cursor: "pointer"}} >{calendar.date}</td>
                      <td style={{borderRight: "2px solid #52585e"}} >{calendar.type}</td>
                      <td style={{borderRight: "2px solid #52585e"}} >From {calendar.startdate} to {calendar.enddate}</td>
                      <td className="edit_boxCSS" ><i onClick={(e) => handleUpdate(e, calendar.id)} className="tim-icons icon-pencil edit_iconCSS" />
                        <i onClick={(e) => handleDelete(e, calendar.id)} style={{marginLeft: 20}} className="tim-icons icon-trash-simple delete_iconCSS"  /></td>
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

export default Api_CalendarMain;
