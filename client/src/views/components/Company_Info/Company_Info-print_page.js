import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import DriverFinder from "../../../apis/DriverFinder";
import SoftNativeLogo from "../../../assets/img/softnative-group-logo.png"

function Company_InfoPrint_Page() {

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
      const response = await DriverFinder.get(`/api/v4/data/${id}`);
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

  return (
    <div style={{background: "white", paddingBottom: 422, paddingTop: 1}} onClick={window.print}>
      <div className="container">
        <div style={{display: "flex", marginTop: 10}}>
          <img width="130" height="110" style={{marginRight: 60, cursor: "pointer", borderRight: "2px solid #007bff", borderBottom: "2px solid #007bff", padding: 10}} alt="SoftNative" src={SoftNativeLogo}/>
          <div style={{textAlign: "center", borderBottom: "2px solid #007bff", marginLeft: "-6%", marginTop: "-1%", width: "100%"}}>
            <div style={{marginLeft: 160}}>
              <h1 style={{marginBottom: "-1%", color: "#007bff"}} className="d-flex">SoftNative <strong style={{color: "blue", marginLeft: 10}}>Group LLP</strong></h1>
            </div>
            <div style={{marginLeft: 100, marginTop: 20}} className="d-flex">
              <div>
                <p style={{marginBottom: "-1%", color: "black"}}>(856)870-6684</p>
              </div>
              <div style={{marginLeft: 40}}><p style={{color: "black"}}>info@softnative.dev</p></div>
              <div>
                <p style={{marginBottom: "-1%", marginLeft: 40, color: "black"}}>9 s 35 St Camden, N.J. 08105</p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <form method="post">
          <div className="contact-form">
            <div className="d-flex" style={{marginBottom: 10}}>
              <div>
                <div style={{color: "#2B3C66"}}>Applicant's First Name:</div> <input style={{borderBottom: "2px solid transparent", borderRadius: 2.7, borderLeft: "2px solid transparent", borderRight: "2px solid transparent", borderTop: "2px solid transparent", background: "lightskyblue", width: "257.5%", color: "#2B3C66"}} value={firstname} />
              </div>
              <div style={{marginLeft: 300}}>
                <div style={{color: "#2B3C66"}}>Last:</div> <input style={{borderBottom: "2px solid transparent", borderRadius: 2.7, borderLeft: "2px solid transparent", borderRight: "2px solid transparent", borderTop: "2px solid transparent", background: "lightskyblue", width: "257.5%", color: "#2B3C66"}} value={lastname} />
              </div>
            </div>
            <div className="d-flex" style={{marginBottom: 10}}>
              <div>
                <div style={{color: "#2B3C66"}}>Address:</div> <input style={{borderBottom: "2px solid transparent", borderRadius: 2.7, borderLeft: "2px solid transparent", borderRight: "2px solid transparent", borderTop: "2px solid transparent", background: "lightskyblue", width: "225%", color: "#2B3C66"}} value={address} />
              </div>
              <div style={{marginLeft: 275}}>
                <div style={{color: "#2B3C66"}}>Phone Number:</div> <input style={{borderBottom: "2px solid transparent", borderRadius: 2.7, borderLeft: "2px solid transparent", borderRight: "2px solid transparent", borderTop: "2px solid transparent", background: "lightskyblue", width: "60%", color: "#2B3C66"}} value={phonenumber} />
              </div>
              <div style={{marginLeft: "-6%"}}>
                <div style={{color: "#2B3C66"}}>City, State & Zip Code:</div> <input style={{borderBottom: "2px solid transparent", borderRadius: 2.7, borderLeft: "2px solid transparent", borderRight: "2px solid transparent", borderTop: "2px solid transparent", background: "lightskyblue", width: "202%", color: "#2B3C66"}} value={cszc} />
              </div>
            </div>

            <div className="d-flex" style={{marginBottom: 10}}>
              <div>
                <div style={{color: "#2B3C66"}}>Email:</div> <input style={{borderBottom: "2px solid transparent", borderRadius: 2.7, borderLeft: "2px solid transparent", borderRight: "2px solid transparent", borderTop: "2px solid transparent", background: "lightskyblue", width: "257.5%", color: "#2B3C66"}} value={emails} />
              </div>
              <div style={{marginLeft: 300}}>
                <div style={{color: "#2B3C66"}}>Name Of Company:</div> <input style={{borderBottom: "2px solid transparent", borderRadius: 2.7, borderLeft: "2px solid transparent", borderRight: "2px solid transparent", borderTop: "2px solid transparent", background: "lightskyblue", width: "257.5%", color: "#2B3C66"}} value={companyname} />
              </div>
            </div>

            <div className="d-flex" style={{marginBottom: 10}}>
              <div>
                <div style={{color: "#2B3C66"}}>Credit Card Payment:</div> <input style={{borderBottom: "2px solid transparent", borderRadius: 2.7, borderLeft: "2px solid transparent", borderRight: "2px solid transparent", borderTop: "2px solid transparent", background: "lightskyblue", width: "130%", color: "#2B3C66"}} value={creditcardpayment} />
              </div>
              <div style={{marginLeft: 90}}>
                <div style={{color: "#2B3C66"}}>Expiration Date:</div> <input style={{borderBottom: "2px solid transparent", borderRadius: 2.7, borderLeft: "2px solid transparent", borderRight: "2px solid transparent", borderTop: "2px solid transparent", background: "lightskyblue", width: "60%", color: "#2B3C66"}} value={expirationdate} />
              </div>
              <div style={{marginLeft: "-5.5%"}}>
                <div style={{color: "#2B3C66"}}>Code:</div> <input style={{borderBottom: "2px solid transparent", borderRadius: 2.7, borderLeft: "2px solid transparent", borderRight: "2px solid transparent", borderTop: "2px solid transparent", background: "lightskyblue", width: "25%", color: "#2B3C66"}} value={code} />
              </div>
              <div style={{marginLeft: "-12.5%"}}>
                <div style={{color: "#2B3C66"}}>Price:</div> <input style={{borderBottom: "2px solid transparent", borderRadius: 2.7, borderLeft: "2px solid transparent", borderRight: "2px solid transparent", borderTop: "2px solid transparent", background: "lightskyblue", width: "25%", color: "#2B3C66"}} value={price} />
              </div>
              <div style={{marginLeft: "-12.5%"}}>
                <div style={{color: "#2B3C66"}}>Checking Account:</div> <input style={{borderBottom: "2px solid transparent", borderRadius: 2.7, borderLeft: "2px solid transparent", borderRight: "2px solid transparent", borderTop: "2px solid transparent", background: "lightskyblue", width: "232.5%", color: "#2B3C66"}} value={checkingaccount} />
              </div>
            </div>

            <div>
              <div style={{color: "#2B3C66"}}>Route:</div> <input style={{borderBottom: "2px solid transparent", borderRadius: 2.7, borderLeft: "2px solid transparent", borderRight: "2px solid transparent", borderTop: "2px solid transparent", background: "lightskyblue", width: "100%", color: "#2B3C66"}} value={route} />
            </div>
            <br />
            <h3 style={{color: "black"}}>
              Term & Termination Agreement and Fair Use Policy
            </h3>
            <p style={{color: "#2B3C66", textAlign: "justify"}}>
              Client may, at any time during the Term, upgrade to a different Uptrends account type. The change in account type will take effect immediately. After an upgrade in account type, Client will be billed immediately for the additional fees due under the upgraded account type for the remaining time of the applicable Term. The amount due and owing for the upgraded account type will be reduced by what the amount the Client has already paid for the applicable Term if it is a yearly license. In regard to an upgraded account type which will be renewed monthly, Client will be billed the fees due for the upgraded account type at the commencement of the Renewal Term.lF A CUSTOMER'S ACCOUNT IS SET TO RENEW ON THE ANNIVERSARY DATE, THE DATE OF THE START OF THE UPTRENDS MONITORING, UPTRENDS MAY AUTOMATICALLY CHARGE SAID CUSTOMER AT THE END OF THE TERM FOR THE RENEWAL FOR ADDITIONAL PERIODS EQUAL TO THE CURRENT SERVICES AND EXPIRING TERM, UNLESS EITHER PARTY GIVES NOTICE OF NON-RENEWALAT LEAST NINETY (90) DAYS PRIOR IN WRITING TO EXPIRATION OF THE THEN-CURRENT TERM. THIS NON-RENEWAL WRITTEN NOTICE MUST BE ACCEPTED AND ACKNOWLEDGED BY UPTRENDS IN WRITING. Uptrends reserves the right to increase the fees for any such renewal term at Uptrends own discretion without prior notice to the said customer. Any such fee increase shall not exceed more than a ten (10%) percent per unit increase from the fee level for the relevant Service in the immediately prior term unless the fees in such prior term were designated in the relevant Order Form as discount, multi-year, one-time or promotional pricing. The customer cannot copy the software, including app.

            </p>
            <div className="d-flex" style={{marginBottom: 10}}>
              <div>
                <div style={{color: "#2B3C66"}}>Applicant's Signature:</div> <input style={{borderBottom: "2px solid transparent", borderRadius: 2.7, borderLeft: "2px solid transparent", borderRight: "2px solid transparent", borderTop: "2px solid transparent", background: "lightskyblue", width: "257.5%", color: "#2B3C66"}} value={signature} />
              </div>
              <div style={{marginLeft: 300}}>
                <div style={{color: "#2B3C66"}}>Date:</div> <input style={{borderBottom: "2px solid transparent", borderRadius: 2.7, borderLeft: "2px solid transparent", borderRight: "2px solid transparent", borderTop: "2px solid transparent", background: "lightskyblue", width: "257.5%", color: "#2B3C66"}} value={dated} />
              </div>
            </div>
            <br />
            <br />
            <textarea style={{width: "100%", border: "2px solid transparent", height: 200}} value={note}/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Company_InfoPrint_Page;
