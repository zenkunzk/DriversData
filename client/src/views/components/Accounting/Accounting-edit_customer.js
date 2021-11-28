import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom";
import ReactBSAlert from "react-bootstrap-sweetalert";
import DriverFinder from "../../../apis/DriverFinder";
import {Col, Input, Label, Row} from "reactstrap";
import {toast} from "react-toastify";

const AccountingEdit_customer = () => {
  const { id } = useParams();
  let history = useHistory();
  const [datecreated, setDatecreated ] = useState("");
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await DriverFinder.get(`/api/v12/data/${id}`);
      console.log(response.data.data);
      setDatecreated(response.data.data.accounting.datecreated);
      setFirstname(response.data.data.accounting.firstname);
      setLastname(response.data.data.accounting.lastname);
      setAddress(response.data.data.accounting.address);
      setPhonenumber(response.data.data.accounting.phonenumber);
      setDriverlicense(response.data.data.accounting.driverlicense);
      setLoanamount(response.data.data.accounting.loanamount);
      setBalance(response.data.data.accounting.balance);
      setPayments(response.data.data.accounting.payments);
      setInterests(response.data.data.accounting.interests);
      setTotal(response.data.data.accounting.total);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    const updatedDriver = await DriverFinder.put(`/api/v12/data/${id}`, {
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
    toast.success(`Edited ID ${id}!`)
    history.push("/admin/accounting");
    console.log(updatedDriver)
  };
  return (
    <React.Fragment>
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px" }}
        title="Edit Customer"
        onConfirm={() => handleSubmit()}
        onCancel={() => history.push("/admin/accounting")}
        confirmBtnBsStyle="success"
        confirmBtnText="Submit Changes"
        cancelBtnBsStyle="danger"
        closeOnClickOutside={false}
        showCancel
      >
        <div className="data-actions">
          <Label>Date: </Label>
          <Input style={{marginLeft: 10}} onChange={(e) => setDatecreated(e.target.value)} value={datecreated} placeholder="First Name" type="text" />
        </div>
        <br />
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
              <Input disabled style={{color: "white"}} onChange={(e) => setLoanamount(e.target.value)} value={loanamount} placeholder="Loan Amount" type="number" />
            </Col>
          </Row>
        </>
      </ReactBSAlert>
    </React.Fragment>
  )
}
export default AccountingEdit_customer
