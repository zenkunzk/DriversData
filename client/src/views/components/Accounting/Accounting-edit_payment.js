import React, {useState, useEffect, useContext} from "react"
import {useParams, useHistory} from "react-router-dom";
import ReactBSAlert from "react-bootstrap-sweetalert";
import DriverFinder from "../../../apis/DriverFinder";
import {Col, Input, Label, Row} from "reactstrap";
import {DriversContext} from "../../../context/DriversContext";

const AccountingEdit_payment = () => {
  const { id } = useParams();
  let history = useHistory();
  const { addPaymentrecords } = useContext(DriversContext);
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
  const current1 = new Date();
  const [dateset, setDateset ] = useState(`${current1.getMonth()+1}/${current1.getDate()}/${current1.getFullYear()} ${current1.getHours()}:${current1.getMinutes()}`);

  useEffect(() => {
    const fetchData = async () => {
      const response = await DriverFinder.get(`http://localhost:3001/api/v12/data/${id}`);
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
    const updatedDriver = await DriverFinder.put(`http://localhost:3001/api/v12/data/${id}`, {
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
    window.location.reload(history.push("/admin/accounting"));
    console.log(updatedDriver)
  };
  const handleSubmit2 = async () => {
    try {
      const response = await DriverFinder.post("http://localhost:3001/api/v13/data", {
        dateset,
        firstname,
        lastname,
        payments
      });
      console.log(response.data.data);
      addPaymentrecords(response.data.data.paymentrecord);
    } catch (err) {
      console.log(err);
    }
  };

  function calculateTotal() {
    setBalance(balance - payments);
  }
  function calculateTotal2() {
    setTotal(interests * balance / 100);
  }
  const [toggled, toggle] = useState(false);
  const [toggled3, toggle3] = useState(false);
  return (
    <React.Fragment>
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px" }}
        title="Edit Payment"
        closeOnClickOutside={false}
        showCancel={false}
        showConfirm={false}
      >
        <div style={{visibility: "hidden", position: "fixed"}}>
          <input value={dateset}/>
          <input value={firstname+' '+lastname}/>
          <input value={payments}/>
          {setDateset}
        </div>
        <>
            <Row>
              <Col md="12">
                <Label>Payment</Label>
                <Input onChange={(e) => setPayments(e.target.value)} value={payments} placeholder="Payment" type="number" />
              </Col>
            </Row>
          <Col style={{marginTop: 25}}>
            <button onClick={() => history.push("/admin/accounting")} className="btn btn-danger">Cancel</button>
          </Col>
          {toggled ?
            <div>
              {toggled3 ?
                <div>
                  <button onClick={handleSubmit()+calculateTotal2()} className="btn btn-info">Confirm</button>
                </div>
                :
                <div />
              }
            </div>
            :
            <button onClick={() => calculateTotal() + toggle(toggled => !toggled) + toggle3(toggled3 => !toggled3) + handleSubmit2()} className="btn btn-success">Submit Changes</button>
          }
        </>
      </ReactBSAlert>
    </React.Fragment>
  )
}
export default AccountingEdit_payment
