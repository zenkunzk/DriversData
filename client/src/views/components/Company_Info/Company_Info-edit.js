import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom";
import ReactBSAlert from "react-bootstrap-sweetalert";
import DriverFinder from "../../../apis/DriverFinder";
import {Col, Input, Label, Row} from "reactstrap";
import {toast} from "react-toastify";

const Company_InfoEdit = () => {
  const { id } = useParams();
  let history = useHistory();
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
  const [dated, setDated ] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await DriverFinder.get(`http://localhost:3001/api/v4/data/${id}`);
      console.log(response.data.data);
      setFirstname(response.data.data.driversinfo.firstname);
      setLastname(response.data.data.driversinfo.lastname);
      setAddress(response.data.data.driversinfo.address);
      setEmails(response.data.data.driversinfo.emails);
      setCszc(response.data.data.driversinfo.cszc);
      setPhonenumber(response.data.data.driversinfo.phonenumber);
      setCompanyname(response.data.data.driversinfo.companyname);
      setCreditcardpayment(response.data.data.driversinfo.creditcardpayment);
      setExpirationdate(response.data.data.driversinfo.expirationdate);
      setCode(response.data.data.driversinfo.code);
      setPrice(response.data.data.driversinfo.price);
      setCheckingaccount(response.data.data.driversinfo.checkingaccount);
      setRoute(response.data.data.driversinfo.route);
      setSignature(response.data.data.driversinfo.signature);
      setNote(response.data.data.driversinfo.note);
      setDated(response.data.data.driversinfo.dated);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    const updatedDriver = await DriverFinder.put(`http://localhost:3001/api/v4/data/${id}`, {
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
    toast.success(`Edited ID ${id}!`)
    history.push("/admin/company_info");
    console.log(updatedDriver)
  };
  return (
    <React.Fragment>
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px", width: 600 }}
        title="Edit Company"
        onConfirm={() => handleSubmit()}
        onCancel={() => history.push("/admin/company_info")}
        confirmBtnBsStyle="success"
        confirmBtnText="Submit Changes"
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
    </React.Fragment>
  )
}
export default Company_InfoEdit
