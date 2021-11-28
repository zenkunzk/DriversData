import React, {useContext, useEffect, useState} from "react";
import {CardBody, Col, Input, Table} from "reactstrap";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {useHistory} from "react-router-dom";
import DriverFinder from "../../../../apis/DriverFinder";
import {DriversContext} from "../../../../context/DriversContext";

const PaymentrecordMain = () => {
  const { paymentrecords, setPaymentrecords } = useContext(DriversContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await DriverFinder.get("/api/v13/data");
        console.log(response.data.data);
        setPaymentrecords(response.data.data.paymentrecords);
      } catch (err) {}
      setLoading(true)
    };

    fetchData();
  }, [setPaymentrecords]);
  let history = useHistory();
  const [loading, setLoading] = useState(false)
  const [searchTerm2, setSearchTerm2] = useState("")
  const deleteData = async (e, id) => {
    try {
      const response = await DriverFinder.delete(`/api/v13/data/${id}`);
      setPaymentrecords(
        paymentrecords.filter(() => {
          return id;
        }, [response])
      );
    } catch (err) {
      console.log(err);
    }
    window.location.reload(history.push("/admin/accounting/payment_records"));
  };
  return (
    <ReactBSAlert
      style={{ display: "block", marginTop: "-100px", width: 1000 }}
      title="Payment Records"
      onCancel={() => history.push("/admin/accounting")}
      cancelBtnText="Close"
      cancelBtnBsStyle="danger btn-block"
      closeOnClickOutside={false}
      showConfirm={false}
      showCancel
      showCloseButton
      openAnim={false}
    >
      <Col>
        <Input onChange={(event) => {setSearchTerm2(event.target.value)}} placeholder="Search" type="text" />
      </Col>
      <CardBody>
        <Table className="tablesorter" responsive>
          <thead className="text-primary">
          <tr className="bg-default">
            <th style={{color: "white"}}>Date Set</th>
            <th style={{color: "white"}}>Name</th>
            <th style={{color: "white"}}>Payment</th>
            <th style={{color: "white"}}>Delete</th>
          </tr>
          </thead>
          {loading ? useEffect : <div><i style={{fontSize: "30px"}} className="tim-icons icon-refresh-01 loading" />Loading...</div>}
          {/* eslint-disable */}
          {paymentrecords.filter((val) => {
            if (searchTerm2 === "") {
              return val
            } else if (
              val.firstname.toLowerCase().includes(searchTerm2.toLowerCase()) ||
              val.lastname.toLowerCase().includes(searchTerm2.toLowerCase()) ||
              val.payments.toLowerCase().includes(searchTerm2.toLowerCase())
            ) {
              return val
            }
          }).map((paymentrecord) => { return <tbody key={paymentrecord.id}>
          <tr className="customCSS_table-hover">
            <td style={{borderRight: "2px solid #52585e", borderLeft: "2px solid #52585e"}} ><div style={{color: "black"}}>{paymentrecord.dateset}</div></td>
            <td style={{borderRight: "2px solid #52585e"}} ><div style={{color: "black"}}>{paymentrecord.firstname} {paymentrecord.lastname}</div></td>
            <td style={{borderRight: "2px solid #52585e"}} ><div style={{color: "black"}}>{paymentrecord.payments}</div></td>
            <td className="edit_boxCSS" >
              <i onClick={(e) => deleteData(e, paymentrecord.id)} className="tim-icons icon-trash-simple delete_iconCSS"  />
            </td>
          </tr>
          </tbody> })}
        </Table>
      </CardBody>
    </ReactBSAlert>
  );
}
export default PaymentrecordMain
