import React, {useContext, useEffect, useState} from "react"
import {useParams, useHistory} from "react-router-dom";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {toast} from "react-toastify";
import DriverFinder from "../../../apis/DriverFinder";
import {Col} from "reactstrap";
import {DriversContext} from "../../../context/DriversContext";

const AccountingDelete_Customer = () => {
  const { id } = useParams();
  let history = useHistory();
  const current1 = new Date();
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
  const { accountings, setAccountings } = useContext(DriversContext);
  const deleteData = async (e, id) => {
    try {
      const response = await DriverFinder.delete(`/api/v12/data/${id}`);
      setAccountings(
        accountings.filter(() => {
          return id;
        }, [response])
      );
      toast.error(`Deleted ID ${id}!`);
    } catch (err) {
      console.log(err);
    }
    history.push("/admin/accounting");
  };
  return (
    <React.Fragment>
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px" }}
        title={"Confirm Delete"}
        onConfirm={(e) => deleteData(e, id)}
        onCancel={() => window.history.back()}
        confirmBtnBsStyle="danger"
        confirmBtnText="Delete"
        cancelBtnBsStyle="info"
        closeOnClickOutside={false}
        showCancel
      >
        <div style={{visibility: "hidden", position: "absolute"}}>
          {datecreated}
          {firstname}
          {lastname}
          {address}
          {phonenumber}
          {driverlicense}
          {loanamount}
          {balance}
          {payments}
          {interests}
          {total}
        </div>
        id: {id}
        <br />
        Customer Name: {firstname} {lastname}
        <Col style={{textAlign: "center"}}><br />
          This action cannot be undone.
        </Col>
      </ReactBSAlert>
    </React.Fragment>
  )
}
export default AccountingDelete_Customer
