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
import Footer from "../../../components/Footer/Footer";
import {DriversContext} from "../../../context/DriversContext";
import DriverFinder from "../../../apis/DriverFinder";
import SidebarPositioning from "../../../components/Header/component/SidebarPositioning";
import FooterUserName from "../../auth/FooterUserName";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {toast} from "react-toastify";
const Company_InfoMain = () => {
  const [loading, setLoading] = useState(false)

  const { driversinfos, setDriversinfos } = useContext(DriversContext);
  let history = useHistory();
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
  const [searchTerm, setSearchTerm] = useState("")
  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/admin/company_info/data/${id}/update`);
  };
  const handleView = (e, id) => {
    e.stopPropagation();
    history.push(`/admin/company_info/data/${id}/view`);
  };
  const handleDelete = (e, id) => {
    e.stopPropagation();
    history.push(`/admin/company_info/data/${id}/delete`);
  };
  const handlePrint = (e, id) => {
    e.stopPropagation();
    window.open(`/admin/company_info/data/${id}/print`)
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
  const current1 = new Date();
  const { addDriversinfos } = useContext(DriversContext);
  const [firstname, setFirstname ] = useState("");
  const [lastname, setLastname ] = useState("");
  const [address, setAddress ] = useState("");
  const [emails, setEmails ] = useState("");
  const [cszc, setCszc ] = useState("");
  const [phonenumber, setPhonenumber ] = useState("");
  const [companyname, setCompanyname ] = useState("");
  const [creditcardpayment, setCreditcardpayment ] = useState("");
  const [expirationdate, setExpirationdate ] = useState("");
  const [code, setCode ] = useState("");
  const [price, setPrice ] = useState("");
  const [checkingaccount, setCheckingaccount ] = useState("");
  const [route, setRoute ] = useState("");
  const [signature, setSignature ] = useState("");
  const [note, setNote ] = useState("");
  const [dated, setDated ] = useState(`${current1.getMonth()+1}/${current1.getDate()}/${current1.getFullYear()}`);
  const handleSubmit = async () => {
    try {
      const response = await DriverFinder.post("/api/v4/data", {
        firstname,
        lastname,
        address,
        emails,
        cszc,
        phonenumber,
        companyname,
        creditcardpayment,
        expirationdate,
        code,
        price,
        checkingaccount,
        route,
        signature,
        note,
        dated
      });
      console.log(response.data.data);
      toast.success(`Successfully Added ID ${response.data.data.driversinfo.id}!`);
      addDriversinfos(response.data.data.driversinfo);
    } catch (err) {
      console.log(err);
    }
  };
  const [sidebarMini, setSidebarMini] = React.useState(true);
  const [toggled, toggle] = useState(false);

  const changeText1 = (text) => setFirstname(text);
  const changeText2 = (text) => setLastname(text);
  const changeText3 = (text) => setAddress(text);
  const changeText4 = (text) => setEmails(text);
  const changeText5 = (text) => setCszc(text);
  const changeText6 = (text) => setPhonenumber(text);
  const changeText7 = (text) => setCompanyname(text);
  const changeText8 = (text) => setCreditcardpayment(text);
  const changeText9 = (text) => setExpirationdate(text);
  const changeText10 = (text) => setCode(text);
  const changeText11 = (text) => setPrice(text);
  const changeText12 = (text) => setCheckingaccount(text);
  const changeText13 = (text) => setRoute(text);
  const changeText14 = (text) => setSignature(text);
  const changeText15 = (text) => setNote(text);
  const changeText16 = (text) => setDated(text);
  return (
    <React.Fragment>
      {toggled && (
        <ReactBSAlert
          style={{ display: "block", marginTop: "-100px", width: 600 }}
          title="Add New Company"
          onConfirm={() => toggle((toggled) => !toggled) + handleSubmit() + changeText1("") + changeText2("") + changeText3("") + changeText4("") + changeText5("") + changeText6("") + changeText7("") + changeText8("") + changeText9("") + changeText10("") + changeText11("") + changeText12("") + changeText13("") + changeText14("") + changeText15("")}
          onCancel={() => toggle((toggled) => !toggled)}
          confirmBtnBsStyle="success"
          confirmBtnText="Submit"
          cancelBtnBsStyle="danger"
          closeOnClickOutside={false}
          showCancel
        >
          <>
            <Row>
              <Col md="6">
                <Label>First Name</Label>
                <Input onChange={(e) => setFirstname(e.target.value)} value={firstname} placeholder="First Name" type="name" />
              </Col>
              <Col md="6">
                <Label>Last Name</Label>
                <Input onChange={(e) => setLastname(e.target.value)} value={lastname} placeholder="Last Name" type="name" />
              </Col>
            </Row>
          </>
          <br />
          <div className="data-actions">
            <Label>Address: </Label>
            <Input onChange={(e) => setAddress(e.target.value)} value={address} style={{marginLeft: 10}} placeholder="Address" type="text" />
          </div>
          <br />
          <div className="data-actions">
            <Label>Email: </Label>
            <Input onChange={(e) => setEmails(e.target.value)} value={emails} style={{marginLeft: 10}} placeholder="Email" type="email" />
          </div>
          <br />
          <Col md="12">
            <Label>City, State & Zip Code</Label>
            <Input onChange={(e) => setCszc(e.target.value)} value={cszc} placeholder="City, State & Zip Code" type="text" />
          </Col>
          <br />
          <div className="data-actions">
            <Label>Phone: </Label>
            <Input onChange={(e) => setPhonenumber(e.target.value)} value={phonenumber} style={{marginLeft: 10}} placeholder="Phone Number" type="number" />
          </div>
          <br />
          <Col md="12">
            <Label>Company Name</Label>
            <Input onChange={(e) => setCompanyname(e.target.value)} value={companyname} placeholder="Name of Company" type="name" />
          </Col>
          <br />
          <Col md="12">
            <Label>Credit Card Payment</Label>
            <Input onChange={(e) => setCreditcardpayment(e.target.value)} value={creditcardpayment} placeholder="Credit Card Payment" type="text" />
          </Col>
          <br />
          <>
            <Row>
              <Col md="5">
                <Label>Expiration Date</Label>
                <Input onChange={(e) => setExpirationdate(e.target.value)} value={expirationdate} placeholder="Expiration Date" type="date" />
              </Col>
              <Col md="3">
                <Label>Code</Label>
                <Input onChange={(e) => setCode(e.target.value)} value={code} placeholder="Code" type="number" />
              </Col>
              <Col md="4">
                <Label>Price</Label>
                <Input onChange={(e) => setPrice(e.target.value)} value={price} placeholder="Price" type="number" />
              </Col>
            </Row>
          </>
          <br />
          <div className="data-actions">
            <Label>Checking Account: </Label>
            <Input onChange={(e) => setCheckingaccount(e.target.value)} value={checkingaccount} style={{marginLeft: 10}} placeholder="Checking Account" type="text" />
          </div>
          <br />
          <>
            <Row>
              <Col md="4">
                <Label>Route</Label>
                <Input onChange={(e) => setRoute(e.target.value)} value={route} placeholder="Route" type="number" />
              </Col>
              <Col md="8">
                <Label>Applicant Signature</Label>
                <Input onChange={(e) => setSignature(e.target.value)} value={signature} placeholder="Signature" type="name" />
              </Col>
            </Row>
          </>
          <hr />
          <Col md="12">
            <Label>Note</Label>
            <Input style={{color: "black"}} onChange={(e) => setNote(e.target.value)} value={note} placeholder="Enter Your Notes Here" type="textarea" />
          </Col>
        </ReactBSAlert>
      )}
      <div style={{position: "absolute", visibility: "hidden"}}>
        {opacity}
        {color}
        {sidebarMini}
        {setDated}
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
                  <CardTitle tag="h4">Company Info <i style={{cursor: "pointer"}} onClick={() => window.location.reload()} className="tim-icons icon-refresh-02 refresh_hover" /></CardTitle>
                  <div className="container"><button onClick={() => toggle((toggled) => !toggled) + changeText16(`${current1.getMonth()+1}/${current1.getDate()}/${current1.getFullYear()}`)} className="btn btn-block btn-info">Add New Company</button></div><br/>
                  <FormGroup><input onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }} placeholder="Search" type="search" className="form-control"/></FormGroup>
                </CardHeader>
                <CardBody>
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
                      <th style={{color: "white"}}>Actions</th>
                    </tr>
                    </thead>
                    {loading ? useEffect : <div><i style={{fontSize: "30px"}} className="tim-icons icon-refresh-01 loading" />Loading...</div>}
                    {/* eslint-disable */}
                    {driversinfos.filter((val) => {
                      if (searchTerm === "") {
                        return val
                      } else if (
                        val.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.phonenumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.signature.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.companyname.toLowerCase().includes(searchTerm.toLowerCase())
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
                      <td className="edit_boxCSS" >
                        <i onClick={(e) => handleUpdate(e, driversinfo.id)} style={{fontSize: 21, }} className="tim-icons icon-pencil edit_iconCSS" />
                        <i onClick={(e) => handleView(e, driversinfo.id)} style={{fontSize: 21, marginLeft: 9}} className="tim-icons icon-zoom-split edit_iconCSS" />
                        <i onClick={(e) => handlePrint(e, driversinfo.id)} style={{fontSize: 21, marginLeft: 9}} className="tim-icons icon-paper edit_iconCSS" />
                        <i onClick={(e) => handleDelete(e, driversinfo.id)} style={{fontSize: 21, marginLeft: 9}} className="tim-icons icon-trash-simple delete_iconCSS"  /></td>
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

export default Company_InfoMain;
