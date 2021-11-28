import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom";
import ReactBSAlert from "react-bootstrap-sweetalert";
import DriverFinder from "../../../apis/DriverFinder";
import {Label} from "reactstrap";

const Company_InfoView = () => {
  const { id } = useParams();
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
  let mail = `mailto:${emails}`
  let history = useHistory();
  const handleUpdate = (e, id) => {
    e.stopPropagation();
    history.push(`/admin/company_info/data/${id}/update`);
  };
  const handleDelete = (e, id) => {
    e.stopPropagation();
    history.push(`/admin/company_info/data/${id}/delete`);
  };
  const handleView = (e, id) => {
    e.stopPropagation();
    window.open(`/admin/company_info/data/${id}/print`)
  };
  return (
    <React.Fragment>
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px", width: 600 }}
        title={signature}
        closeOnClickOutside={false}
        showCancel={false}
        showConfirm={false}
      >
        <div style={{position: "absolute", visibility: "hidden"}}>
          {firstname}
          {lastname}
          {dated}
        </div>
        <>
          <h4 className="text-black-50">{companyname}</h4>
          <div style={{textAlign: "left"}}>
            <br />
            <section>
              <Label>Name: </Label>{" "}
              <strong style={{textDecoration: "underline"}}>{signature}</strong>
            </section>
            <section>
              <Label>Address: </Label>{" "}
              <strong style={{textDecoration: "underline"}}>{address}</strong>
            </section>
            <section>
              <Label>Email: </Label>{" "}
              <strong style={{textDecoration: "underline"}}><a href={mail}>{emails}</a></strong>
            </section>
            <section>
              <Label>City, State & Zip Code: </Label>{" "}
              <strong style={{textDecoration: "underline"}}>{cszc}</strong>
            </section>
            <section>
              <Label>Phone Number: </Label>{" "}
              <strong style={{textDecoration: "underline"}}>{phonenumber}</strong>
            </section>
            <section>
              <Label>Company Name: </Label>{" "}
              <strong style={{textDecoration: "underline"}}>{companyname}</strong>
            </section>
            <section>
              <Label>Credit Card Payment: </Label>{" "}
              <strong style={{textDecoration: "underline"}}>{creditcardpayment}</strong>
            </section>
            <section>
              <Label>Expiration Date: </Label>{" "}
              <strong style={{textDecoration: "underline"}}>{expirationdate}</strong>
            </section>
            <section>
              <Label>Code: </Label>{" "}
              <strong style={{textDecoration: "underline"}}>{code}</strong>
            </section>
            <section>
              <Label>Price: </Label>{" "}
              <strong style={{textDecoration: "underline"}}>{price}</strong>
            </section>
            <section>
              <Label>Checking Account: </Label>{" "}
              <strong style={{textDecoration: "underline"}}>{checkingaccount}</strong>
            </section>
            <section>
              <Label>Route: </Label>{" "}
              <strong style={{textDecoration: "underline"}}>{route}</strong>
            </section>
            <section>
              <Label>Note: </Label>{" "}
              <strong>{note}</strong>
            </section>
          </div>
          <hr />
          <div>
            <button onClick={(e) => handleUpdate(e, id)} className="btn btn-warning">Edit</button>
            <button onClick={(e) => handleView(e, id)} style={{marginLeft: 14.5}} className="btn btn-info">Print</button>
            <button onClick={(e) => handleDelete(e, id)} style={{marginLeft: 14.5}} className="btn btn-danger">Delete</button>
          </div>
          <br />
          <div className="container">
            <button onClick={() => history.push("/admin/company_info")} className="btn btn-danger btn-block">Close</button>
          </div>
        </>
      </ReactBSAlert>
    </React.Fragment>
  )
}
export default Company_InfoView
