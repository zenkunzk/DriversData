import React, {useContext, useEffect, useState} from "react"
import {useParams, useHistory} from "react-router-dom";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {toast} from "react-toastify";
import DriverFinder from "../../../apis/DriverFinder";
import {Col} from "reactstrap";
import {DriversContext} from "../../../context/DriversContext";

const Company_InfoDelete = () => {
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
  const { driversinfos, setDriversinfos } = useContext(DriversContext);
  const deleteData = async (e, id) => {
    try {
      const response = await DriverFinder.delete(`http://localhost:3001/api/v4/data/${id}`);
      setDriversinfos(
        driversinfos.filter(() => {
          return id;
        }, [response])
      );
      toast.error(`Deleted ID ${id}!`);
    } catch (err) {
      console.log(err);
    }
    history.push("/admin/company_info");
  };
  return (
    <React.Fragment>
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px" }}
        title={"Confirm Delete"}
        onConfirm={(e) => deleteData(e, id)}
        onCancel={() => history.push("/admin/company_info")}
        confirmBtnBsStyle="danger"
        confirmBtnText="Delete"
        cancelBtnBsStyle="info"
        closeOnClickOutside={false}
        showCancel
      >
        <div style={{visibility: "hidden", position: "absolute"}}>
          {firstname}
          {lastname}
          {address}
          {emails}
          {cszc}
          {phonenumber}
          {companyname}
          {creditcardpayment}
          {expirationdate}
          {code}
          {price}
          {checkingaccount}
          {route}
          {note}
          {dated}
        </div>
        Name: {signature}<br />
        id: {id}
        <Col style={{textAlign: "center"}}>
          This action cannot be undone.
        </Col>
      </ReactBSAlert>
    </React.Fragment>
  )
}
export default Company_InfoDelete
