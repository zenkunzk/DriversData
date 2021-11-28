import React, {useContext, useEffect, useState} from "react";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import SidebarPositioning from "../components/Header/component/SidebarPositioning";
import FooterUserName from "./auth/FooterUserName";
import {Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Row, Table} from "reactstrap";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {toast} from "react-toastify";
import {DriversContext} from "../context/DriversContext";
import DriverFinder from "../apis/DriverFinder";
import {useHistory} from "react-router-dom";

const Home = () => {
  const [opacity, setOpacity] = React.useState(0);
  const mainPanelRef = React.useRef(null);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, []);
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

  const [searchTerm, setSearchTerm] = useState("")
  const [searchTerm2, setSearchTerm2] = useState("")
  const [searchTerm3, setSearchTerm3] = useState("")
  const [searchTerm4, setSearchTerm4] = useState("")
  const [searchTerm5, setSearchTerm5] = useState("")
  const [searchTerm6, setSearchTerm6] = useState("")

  const [loading, setLoading] = useState(false)
  const [sidebarMini, setSidebarMini] = React.useState(true);
  const { clientapis, setClientapis } = useContext(DriversContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DriverFinder.get("/api/v14/data");
        console.log(response.data.data);
        setClientapis(response.data.data.clientapis);
      } catch (err) {}
      setLoading(true)
    };

    fetchData();
  }, [setClientapis]);
  const { users, setUsers } = useContext(DriversContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DriverFinder.get("/api/v5/data");
        console.log(response.data.data);
        setUsers(response.data.data.users);
      } catch (err) {}
      setLoading(true)
    };

    fetchData();
  }, [setUsers]);
  const { driversdataemails, setDriversdataemails } = useContext(DriversContext);
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
  const { driversinfos, setDriversinfos } = useContext(DriversContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DriverFinder.get("/api/v4/data");
        console.log(response.data.data);
        setDriversinfos(response.data.data.driversinfos);
      } catch (err) {}
      setLoading(true)
    };

    fetchData();
  }, [setDriversinfos]);
  const { accountings, setAccountings } = useContext(DriversContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DriverFinder.get("/api/v12/data");
        console.log(response.data.data);
        setAccountings(response.data.data.accountings);
      } catch (err) {}
      setLoading(true)
    };

    fetchData();
  }, [setAccountings]);
  const { calendars, setCalendars } = useContext(DriversContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DriverFinder.get("/api/v11/data");
        console.log(response.data.data);
        setCalendars(response.data.data.calendars);
      } catch (err) {}
      setLoading(true)
    };

    fetchData();
  }, [setCalendars]);
  let history = useHistory();
  return (
    <React.Fragment>
      <div style={{visibility: "hidden", position: "absolute"}}>
        {color}
        {opacity}
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
            <Col lg="3">
              <Card>
                <CardHeader>
                  <CardTitle className="d-flex" tag="h4"><div onClick={() => history.push("/admin/add_user")} className="hovertoSection">Users</div> <i style={{cursor: "pointer", marginLeft: 10}} onClick={() => window.location.reload()} className="tim-icons icon-refresh-02 refresh_hover" /></CardTitle>
                  <FormGroup><input onChange={(event) => {
                    setSearchTerm2(event.target.value);
                  }} placeholder="Search" type="search" className="form-control"/></FormGroup>
                </CardHeader>
                <CardBody>
                  <div style={{ overflow: "auto", width: "100%", height: "660px" }}>
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
                        if (searchTerm2 === "") {
                          return val
                        } else if (
                          val.user_name.toLowerCase().includes(searchTerm2.toLowerCase()) ||
                          val.user_email.toLowerCase().includes(searchTerm2.toLowerCase())
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
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="9">
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="d-flex" tag="h4"><div onClick={() => history.push("/admin/company_info")} className="hovertoSection">Company Info</div> <i style={{cursor: "pointer", marginLeft: 10}} onClick={() => window.location.reload()} className="tim-icons icon-refresh-02 refresh_hover" /></CardTitle>
                    <FormGroup><input onChange={(event) => {
                      setSearchTerm4(event.target.value);
                    }} placeholder="Search" type="search" className="form-control"/></FormGroup>
                  </CardHeader>
                  <CardBody>
                    <div style={{ overflow: "auto", width: "100%", height: "250px" }}>
                      <Table className="tablesorter" responsive>
                        <thead className="text-primary">
                        <tr className="bg-default">
                          <th style={{color: "white"}}>Date</th>
                          <th style={{color: "white"}}>Name</th>
                          <th style={{color: "white"}}>Address</th>
                          <th style={{color: "white"}}>Email</th>
                          <th style={{color: "white"}}>City, State & Zip Code</th>
                          <th style={{color: "white"}}>Phone</th>
                          <th style={{color: "white"}}>Company Name</th>
                          <th style={{color: "white"}}>Card Payment</th>
                          <th style={{color: "white"}}>Exp. Date</th>
                          <th style={{color: "white"}}>Code</th>
                          <th style={{color: "white"}}>Price</th>
                          <th style={{color: "white"}}>Checking Account</th>
                          <th style={{color: "white"}}>Route</th>
                        </tr>
                        </thead>
                        {loading ? useEffect : <div><i style={{fontSize: "30px"}} className="tim-icons icon-refresh-01 loading" />Loading...</div>}
                        {/* eslint-disable */}
                        {driversinfos.filter((val) => {
                          if (searchTerm4 === "") {
                            return val
                          } else if (
                            val.firstname.toLowerCase().includes(searchTerm4.toLowerCase()) ||
                            val.lastname.toLowerCase().includes(searchTerm4.toLowerCase()) ||
                            val.phonenumber.toLowerCase().includes(searchTerm4.toLowerCase()) ||
                            val.signature.toLowerCase().includes(searchTerm4.toLowerCase()) ||
                            val.companyname.toLowerCase().includes(searchTerm4.toLowerCase())
                          ) {
                            return val
                          }
                        }).map((driversinfo) => { return <tbody key={driversinfo.id}>
                        <tr className="customCSS_table-hover" onDoubleClick={(e) => handleView(e, driversinfo.id)}
                        >
                          <td style={{borderRight: "2px solid #52585e"}}>{driversinfo.dated}</td>
                          <td style={{borderRight: "2px solid #52585e"}}>{driversinfo.firstname} {driversinfo.lastname}</td>
                          <td style={{borderRight: "2px solid #52585e"}}>{driversinfo.address}</td>
                          <td style={{borderRight: "2px solid #52585e"}}>{driversinfo.emails}</td>
                          <td style={{borderRight: "2px solid #52585e"}}>{driversinfo.cszc}</td>
                          <td style={{borderRight: "2px solid #52585e"}}>{driversinfo.phonenumber}</td>
                          <td style={{borderRight: "2px solid #52585e"}}>{driversinfo.companyname}</td>
                          <td style={{borderRight: "2px solid #52585e"}}>{driversinfo.creditcardpayment}</td>
                          <td style={{borderRight: "2px solid #52585e"}}>{driversinfo.expirationdate}</td>
                          <td style={{borderRight: "2px solid #52585e"}}>{driversinfo.code}</td>
                          <td style={{borderRight: "2px solid #52585e"}}>${driversinfo.price}</td>
                          <td style={{borderRight: "2px solid #52585e"}}>{driversinfo.checkingaccount}</td>
                          <td style={{borderRight: "2px solid #52585e"}}>{driversinfo.route}</td>
                        </tr>
                        </tbody> })}
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="d-flex" tag="h4"><div onClick={() => history.push("/admin/api_calendar")} className="hovertoSection">API Calendar</div> <i style={{cursor: "pointer", marginLeft: 10}} onClick={() => window.location.reload()} className="tim-icons icon-refresh-02 refresh_hover" /></CardTitle>
                    <FormGroup><input onChange={(event) => {
                      setSearchTerm6(event.target.value);
                    }} placeholder="Search" type="search" className="form-control"/></FormGroup>
                  </CardHeader>
                  <CardBody>
                    <div style={{ overflow: "auto", width: "100%", height: "250px" }}>
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
                        </tr>
                        </thead>
                        {loading ? useEffect : <div><i style={{fontSize: "30px"}} className="tim-icons icon-refresh-01 loading" />Loading...</div>}
                        {/* eslint-disable */}
                        {calendars.filter((val) => {
                          if (searchTerm6 === "") {
                            return val
                          } else if (
                            val.email.toLowerCase().includes(searchTerm6.toLowerCase()) ||
                            val.api.toLowerCase().includes(searchTerm6.toLowerCase())
                          ) {
                            return val
                          }
                        }).map((calendar) => { return <tbody key={calendar.id}>
                        <tr className="customCSS_table-hover"
                        >
                          <td className="e_day"><div style={{color: "white"}}>{calendar.daynumber}</div></td>
                          <td style={{borderRight: "2px solid #52585e"}} >{calendar.email}<CopyToClipboard text={calendar.email}><strong onClick={() => toast.success(`Copied ${calendar.email}`)} className="copy_btnCSS">Copy</strong></CopyToClipboard></td>
                          <td>{calendar.api}<CopyToClipboard text={calendar.api}><strong onClick={() => toast.success(`Copied ${calendar.api}`)} className="copy_btnCSS">Copy</strong></CopyToClipboard></td>
                          <td style={{border: calendar.inuse, background: calendar.inusetwo}} className="border_companyUse2"><strong style={{background: calendar.companycolor, textAlign: "center", borderRadius: "100px", padding: 6.5, color: "black"}}>{calendar.current}</strong></td>
                          <td style={{borderRight: "2px solid #52585e"}} >{calendar.date}</td>
                          <td style={{borderRight: "2px solid #52585e"}} >{calendar.type}</td>
                          <td style={{borderRight: "2px solid #52585e"}} >From {calendar.startdate} to {calendar.enddate}</td>
                        </tr>
                        </tbody> })}
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="6">
              <Card>
                <CardHeader>
                  <CardTitle className="d-flex" tag="h4"><div onClick={() => history.push("/admin/accounting")} className="hovertoSection">Accounting</div> <i style={{cursor: "pointer", marginLeft: 10}} onClick={() => window.location.reload()} className="tim-icons icon-refresh-02 refresh_hover" /></CardTitle>
                  <FormGroup><input onChange={(event) => {
                    setSearchTerm5(event.target.value);
                  }} placeholder="Search" type="search" className="form-control"/></FormGroup>
                </CardHeader>
                <CardBody>
                  <div style={{ overflow: "auto", width: "100%", height: "250px" }}>
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                      <tr className="bg-default">
                        <th style={{color: "white"}}>Date Created</th>
                        <th style={{color: "white"}}>Name</th>
                        <th style={{color: "white"}}>Address</th>
                        <th style={{color: "white"}}>Phone Number</th>
                        <th style={{color: "white"}}>Driver License</th>
                        <th style={{color: "white"}}>Loan Amount</th>
                        <th style={{color: "white"}}>Balance</th>
                        <th style={{color: "white"}}>Payments</th>
                        <th style={{color: "white"}}>Interests</th>
                        <th style={{color: "white"}}>Total</th>
                      </tr>
                      </thead>
                      {loading ? useEffect : <div><i style={{fontSize: "30px"}} className="tim-icons icon-refresh-01 loading" />Loading...</div>}
                      {/* eslint-disable */}
                      {accountings.filter((val) => {
                        if (searchTerm5 === "") {
                          return val
                        } else if (
                          val.firstname.toLowerCase().includes(searchTerm5.toLowerCase()) ||
                          val.lastname.toLowerCase().includes(searchTerm5.toLowerCase()) ||
                          val.phonenumber.toLowerCase().includes(searchTerm5.toLowerCase())
                        ) {
                          return val
                        }
                      }).map((accounting) => { return <tbody key={accounting.id}>
                      <tr className="customCSS_table-hover">
                        <td style={{borderRight: "2px solid #52585e", borderLeft: "2px solid #52585e"}} >{accounting.datecreated}</td>
                        <td style={{borderRight: "2px solid #52585e"}} >{accounting.firstname} {accounting.lastname}</td>
                        <td style={{borderRight: "2px solid #52585e"}} >{accounting.address}</td>
                        <td style={{borderRight: "2px solid #52585e"}} >{accounting.phonenumber}</td>
                        <td style={{borderRight: "2px solid #52585e"}} >{accounting.driverlicense}</td>
                        <td style={{borderRight: "2px solid #52585e"}} >${accounting.loanamount}</td>
                        <td>${accounting.balance}</td>
                        <td style={{borderRight: "2px solid #52585e", borderLeft: "2px solid #52585e"}}>${accounting.payments}</td>
                        <td style={{borderRight: "2px solid #52585e"}} >{accounting.interests}%</td>
                        <td style={{borderRight: "2px solid #52585e"}} >${accounting.total}</td>
                      </tr>
                      </tbody> })}
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="6">
              <Card>
                <CardHeader>
                  <CardTitle className="d-flex" tag="h4"><div onClick={() => history.push("/admin/client_apis")} className="hovertoSection">Company Client Apis</div> <i style={{cursor: "pointer", marginLeft: 10}} onClick={() => window.location.reload()} className="tim-icons icon-refresh-02 refresh_hover" /></CardTitle>
                  <FormGroup><input onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }} placeholder="Search" type="search" className="form-control"/></FormGroup>
                </CardHeader>
                <CardBody>
                  <div style={{ overflow: "auto", width: "100%", height: "250px" }}>
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                      <tr className="bg-default">
                        <th style={{color: "white"}}>Email</th>
                        <th style={{color: "white"}}>Api Key</th>
                        <th style={{color: "white"}}>Api Type</th>
                        <th style={{color: "white"}}>Company</th>
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
                      </tr>
                      </tbody> })}
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg="12">
              <Card>
                <CardHeader>
                  <CardTitle className="d-flex" tag="h4"><div onClick={() => history.push("/admin/available_emails")} className="hovertoSection">Available Emails</div> <i style={{cursor: "pointer", marginLeft: 10}} onClick={() => window.location.reload()} className="tim-icons icon-refresh-02 refresh_hover" /></CardTitle>
                  <FormGroup><input onChange={(event) => {
                    setSearchTerm3(event.target.value);
                  }} placeholder="Search" type="search" className="form-control"/></FormGroup>
                </CardHeader>
                <CardBody>
                  <div style={{ overflow: "auto", width: "100%", height: "250px" }}>
                    <Table className="tablesorter" responsive>
                      <thead className="text-primary">
                      <tr className="bg-default">
                        <th style={{color: "white"}}>ID</th>
                        <th style={{color: "white"}}>Email</th>
                        <th style={{color: "white"}}>Here API's</th>
                        <th style={{color: "white"}}>Mapbox API's</th>
                        <th style={{color: "white"}}>Tomtom API's</th>
                      </tr>
                      </thead>
                      {loading ? useEffect : <div><i style={{fontSize: "30px"}} className="tim-icons icon-refresh-01 loading" />Loading...</div>}
                      {/* eslint-disable */}
                      {driversdataemails.filter((val) => {
                        if (searchTerm3 === "") {
                          return val
                        } else if (
                          val.aemail.toLowerCase().includes(searchTerm3.toLowerCase()) ||
                          val.hereapis.toLowerCase().includes(searchTerm3.toLowerCase()) ||
                          val.mapboxapis.toLowerCase().includes(searchTerm3.toLowerCase()) ||
                          val.tomtomapis.toLowerCase().includes(searchTerm3.toLowerCase())
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
                      </tr>
                      </tbody> })}
                    </Table>
                  </div>
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

export default Home;
