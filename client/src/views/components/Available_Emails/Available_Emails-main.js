import React, {useContext, useEffect, useState} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col, Table, FormGroup, Input
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
const Available_EmailsMain = () => {
  const [loading, setLoading] = useState(false)

  const { driversdataemails, setDriversdataemails } = useContext(DriversContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DriverFinder.get("/api/v3/data");
        console.log(response.data.data);
        setDriversdataemails(response.data.data.driversdataemails);
      } catch (err) {}
      setLoading(true)
    };

    fetchData();
  }, [setDriversdataemails]);

  const [searchTerm, setSearchTerm] = useState("")
  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/admin/available_emails/data/${id}/update`);
  };
  const handleDelete = (e, id) => {
    e.stopPropagation();
    history.push(`/admin/available_emails/data/${id}/delete`);
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
  const [sidebarMini, setSidebarMini] = React.useState(true);
  const [toggled, toggle] = useState(false);
  const { addDriversDataEmails } = useContext(DriversContext);
  const [aemail, setAemail] = useState("");
  const [hereapis, setHereapis] = useState("");
  const [mapboxapis, setMapboxapis] = useState("");
  const [tomtomapis, setTomtomapis] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await DriverFinder.post("/api/v3/data", {
        aemail,
        hereapis,
        mapboxapis,
        tomtomapis,
      });
      console.log(response.data.data);
      window.location.reload()
      addDriversDataEmails(response.data.data.driversdataemail);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      {toggled && (
        <ReactBSAlert
          style={{ display: "block", marginTop: "-100px" }}
          title={"Add Email"}
          onConfirm={() => handleSubmit() + toggle((toggled) => !toggled)}
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
              onChange={(e) => setAemail(e.target.value)}
              value={aemail}
            /><hr />
            Here API:
            <Input
              type="text"
              placeholder="Here API Key"
              onChange={(e) => setHereapis(e.target.value)}
              value={hereapis}
            /><br />
            Mapbox API:
            <Input
              type="text"
              placeholder="Mapbox API Key"
              onChange={(e) => setMapboxapis(e.target.value)}
              value={mapboxapis}
            /><br />
            Tomtom API:
            <Input
              type="text"
              placeholder="Tomtom API Key"
              onChange={(e) => setTomtomapis(e.target.value)}
              value={tomtomapis}
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
        <div className="content">
          <Row>
            <Col className="mb-5" md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Available Emails <i style={{cursor: "pointer"}} onClick={() => window.location.reload()} className="tim-icons icon-refresh-02 refresh_hover" /></CardTitle>
                  <div className="container"><button onClick={() => toggle((toggled) => !toggled)} className="btn btn-block btn-info">Add Email</button></div><br/>
                  <FormGroup><input onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }} placeholder="Search" type="search" className="form-control"/></FormGroup>
                </CardHeader>
                <CardBody>

                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                    <tr className="bg-default">
                      <th style={{color: "white"}}>ID</th>
                      <th style={{color: "white"}}>Email</th>
                      <th style={{color: "white"}}>Here API's</th>
                      <th style={{color: "white"}}>Mapbox API's</th>
                      <th style={{color: "white"}}>Tomtom API's</th>
                      <th style={{color: "white"}}>Actions</th>
                    </tr>
                    </thead>
                    {loading ? useEffect : <div><i style={{fontSize: "30px"}} className="tim-icons icon-refresh-01 loading" />Loading...</div>}
                    {/* eslint-disable */}
                    {driversdataemails.filter((val) => {
                      if (searchTerm === "") {
                        return val
                      } else if (
                        val.aemail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.hereapis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.mapboxapis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.tomtomapis.toLowerCase().includes(searchTerm.toLowerCase())
                      ) {
                        return val
                      }
                    }).map((driversdataemail) => { return <tbody key={driversdataemail.id}>
                    <tr className="customCSS_table-hover"
                    >
                      <td className="bg-default" ><div style={{color: "white"}}>{driversdataemail.id}</div></td>
                      <td style={{borderRight: "2px solid #52585e"}} >{driversdataemail.aemail}<CopyToClipboard text={driversdataemail.aemail}><strong onClick={() => toast.success(`Copied ${driversdataemail.aemail}`)} className="copy_btnCSS">Copy</strong></CopyToClipboard></td>
                      <td style={{borderRight: "2px solid #52585e"}} >{driversdataemail.hereapis}<CopyToClipboard text={driversdataemail.hereapis}><strong onClick={() => toast.success(`Copied Here API from  ${driversdataemail.aemail}`)} className="copy_btnCSS">Copy</strong></CopyToClipboard></td>
                      <td style={{borderRight: "2px solid #52585e"}} >{driversdataemail.mapboxapis}<CopyToClipboard text={driversdataemail.mapboxapis}><strong onClick={() => toast.success(`Copied Mapbox API from  ${driversdataemail.aemail}`)} className="copy_btnCSS">Copy</strong></CopyToClipboard></td>
                      <td style={{borderRight: "2px solid #52585e"}} >{driversdataemail.tomtomapis}<CopyToClipboard text={driversdataemail.tomtomapis}><strong onClick={() => toast.success(`Copied Tomtom API from  ${driversdataemail.aemail}`)} className="copy_btnCSS">Copy</strong></CopyToClipboard></td>
                      <td className="edit_boxCSS" ><i onClick={(e) => handleUpdate(e, driversdataemail.id)} className="tim-icons icon-pencil edit_iconCSS" />
                        <i onClick={(e) => handleDelete(e, driversdataemail.id)} style={{marginLeft: 20}} className="tim-icons icon-trash-simple delete_iconCSS"  /></td>
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

export default Available_EmailsMain;
