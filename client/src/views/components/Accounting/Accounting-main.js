import React, {useContext, useEffect, useState} from "react"
import Header from "../../../components/Header/Header";
import {Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Row, Table, Input, Label} from "reactstrap";
import FooterUserName from "../../auth/FooterUserName";
import Footer from "../../../components/Footer/Footer";
import SidebarPositioning from "../../../components/Header/component/SidebarPositioning";
import {useHistory, useLocation} from "react-router-dom";
import {DriversContext} from "../../../context/DriversContext";
import DriverFinder from "../../../apis/DriverFinder";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {toast} from "react-toastify";

const AccountingMain = () => {
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

  const [loading, setLoading] = useState(false)

  const { accountings, setAccountings } = useContext(DriversContext);
  let history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DriverFinder.get("http://localhost:3001/api/v12/data");
        console.log(response.data.data);
        setAccountings(response.data.data.accountings);
      } catch (err) {}
      setLoading(true)
    };

    fetchData();
  }, [setAccountings]);
  const current1 = new Date();
  const [searchTerm, setSearchTerm] = useState("")
  const [toggled, toggle] = useState(false);
  const { addAccountings } = useContext(DriversContext);
  const [datecreated, setDatecreated ] = useState(`${current1.getMonth()+1}/${current1.getDate()}/${current1.getFullYear()} ${current1.getHours()}:${current1.getMinutes()}`);
  const [firstname, setFirstname ] = useState("");
  const [lastname, setLastname ] = useState("");
  const [address, setAddress ] = useState("");
  const [phonenumber, setPhonenumber ] = useState("");
  const [driverlicense, setDriverlicense ] = useState("");
  const [loanamount, setLoanamount ] = useState("");
  const [balance, setBalance ] = useState("");
  const [payments, setPayments ] = useState("");
  const [interests, setInterests ] = useState("");
  const [total, setTotal ] = useState("");
  const handleSubmit = async () => {
    try {
      const response = await DriverFinder.post("http://localhost:3001/api/v12/data", {
        datecreated,
        firstname,
        lastname,
        address,
        phonenumber,
        driverlicense,
        loanamount,
        balance,
        payments,
        interests,
        total
      });
      console.log(response.data.data);
      toast.success(`Successfully Added ID ${response.data.data.accounting.id}!`);
      addAccountings(response.data.data.accounting);
    } catch (err) {
      console.log(err);
    }
  };
  function calculateTotal() {
    setTotal(interests * balance / 100);
  }
  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/admin/accounting/data/${id}/update`);
  };
  const handleUpdatePayment = (e, id) => {
    e.stopPropagation();
    history.push(`/admin/accounting/data/${id}/update/payment_`);
  };
  const handleDelete = (e, id) => {
    e.stopPropagation();
    history.push(`/admin/accounting/data/${id}/delete`);
  };
  const handleRecordNavigation = (e) => {
    e.stopPropagation();
    history.push(`/admin/accounting/payment_records`);
  };
  const [toggled2, toggle2] = useState(false)
  const changeText1 = (text) => setFirstname(text);
  const changeText2 = (text) => setLastname(text);
  const changeText3 = (text) => setAddress(text);
  const changeText4 = (text) => setPhonenumber(text);
  const changeText5 = (text) => setDriverlicense(text);
  const changeText6 = (text) => setLoanamount(text);
  const changeText7 = (text) => setBalance(text);
  const changeText8 = (text) => setDatecreated(text);
  const changeText9 = (text) => setInterests(text);
  return (
    <React.Fragment>
      {toggled && (
        <ReactBSAlert
          style={{ display: "block", marginTop: "-100px" }}
          title="Add New Customer"
          showConfirm={false}
          closeOnClickOutside={false}
          showCancel={false}
        >
          <div style={{visibility: "hidden", position: "absolute"}}>
            <input onChange={(e) => setDatecreated(e.target.value)} value={datecreated} />
          </div>
          <>
            <Row>
              <Col md="6">
                <Label>First Name</Label>
                  <Input onChange={(e) => setFirstname(e.target.value)} value={firstname} placeholder="First Name" type="text" />
              </Col>
              <Col md="6">
                <Label>Last Name</Label>
                  <Input onChange={(e) => setLastname(e.target.value)} value={lastname} placeholder="Last Name" type="text" />
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
            <Label>Phone: </Label>
            <Input onChange={(e) => setPhonenumber(e.target.value)} value={phonenumber} style={{marginLeft: 15}} placeholder="Phone Number" type="number" />
          </div>
          <br />
          <>
            <Row>
              <Col md="6">
                <Label>Driver License</Label>
                <Input onChange={(e) => setDriverlicense(e.target.value)} value={driverlicense} placeholder="Driver License" type="text" />
              </Col>
              <Col md="6">
                <Label>Loan Amount</Label>
                <Input onChange={(e) => setLoanamount(e.target.value) + setBalance(e.target.value)} value={loanamount} placeholder="Loan Amount" type="number" />
              </Col>
              <div style={{position: "absolute", visibility: "hidden"}}>
                <Label>Balance</Label>
                <Input onChange={(e) => setBalance(e.target.value)} value={balance} placeholder="Balance" type="number" />
              </div>
            </Row>
          </>
          <br />
          <div className="data-actions">
            <Label>Interest: </Label>
            <Input onChange={(e) => setInterests(e.target.value)} value={interests} style={{marginLeft: 15}} placeholder="Interest" type="number" />%
          </div>
          <br />
          <button onClick={() => toggle((toggled) => !toggled)} className="btn btn-danger">Cancel</button>
          {toggled2 ? <button className="btn btn-info" onClick={() => handleSubmit() + toggle((toggled) => !toggled) + toggle2((toggled2) => !toggled2) + changeText1("") + changeText2("") + changeText3("") + changeText4("") + changeText5("") + changeText6("") + changeText7("") + changeText8("") + changeText9("")}>Confirm</button> : <button onClick={() => toggle2((toggled2) => !toggled2) + calculateTotal() + changeText8(`${current1.getMonth()+1}/${current1.getDate()}/${current1.getFullYear()} ${current1.getHours()}:${current1.getMinutes()}`)} className="btn btn-success">Submit</button>}
        </ReactBSAlert>
      )}
      <div style={{position: "absolute", visibility: "hidden"}}>
        {opacity}
        {color}
        {sidebarMini}
        {setPayments}
        {setTotal}
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
                  <CardTitle tag="h4">Accounting <i style={{cursor: "pointer"}} onClick={() => window.location.reload()} className="tim-icons icon-refresh-02 refresh_hover" /></CardTitle>
                  <div className="data-actions" style={{marginTop: -50}}>
                    <div />
                    <div />
                    <div onClick={handleRecordNavigation} className="iconreportshover" style={{marginTop: 10, cursor: "pointer"}}>
                      <i style={{marginLeft: 20}} className="tim-icons icon-notes " />
                      <div style={{fontSize: 18}}>Records</div>
                    </div>
                  </div>
                  <br />
                  <div className="container"><button onClick={() => toggle((toggled) => !toggled)} className="btn btn-block btn-info">Add New Customer</button></div><br/>
                  <FormGroup><input onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }} placeholder="Search" type="search" className="form-control"/></FormGroup>
                </CardHeader>
                <CardBody>
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
                      <th style={{color: "white"}}>Actions</th>
                    </tr>
                    </thead>
                    {loading ? useEffect : <div><i style={{fontSize: "30px"}} className="tim-icons icon-refresh-01 loading" />Loading...</div>}
                    {/* eslint-disable */}
                    {accountings.filter((val) => {
                      if (searchTerm === "") {
                        return val
                      } else if (
                        val.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        val.phonenumber.toLowerCase().includes(searchTerm.toLowerCase())
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
                      <td onClick={(e) => handleUpdatePayment(e, accounting.id)} className="border_payments" >${accounting.payments}</td>
                      <td style={{borderRight: "2px solid #52585e"}} >{accounting.interests}%</td>
                      <td style={{borderRight: "2px solid #52585e"}} >${accounting.total}</td>
                      <td className="edit_boxCSS" >
                        <i onClick={(e) => handleUpdate(e, accounting.id)} className="tim-icons icon-pencil edit_iconCSS" />
                        <i onClick={(e) => handleDelete(e, accounting.id)} style={{marginLeft: 20}} className="tim-icons icon-trash-simple delete_iconCSS"  />
                      </td>
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
  )
}

export default AccountingMain
