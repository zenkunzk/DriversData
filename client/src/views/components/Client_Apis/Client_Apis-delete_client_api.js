import React, {useContext, useEffect, useState} from "react"
import {useParams, useHistory} from "react-router-dom";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {toast} from "react-toastify";
import DriverFinder from "../../../apis/DriverFinder";
import {Col} from "reactstrap";
import {DriversContext} from "../../../context/DriversContext";

const Client_ApisDelete_Client_Api = () => {
  const { id } = useParams();
  let history = useHistory();
  const [email, setEmail ] = useState("");
  const [apikey, setApikey ] = useState("");
  const [company, setCompany ] = useState("");
  const [apitype, setApitype ] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await DriverFinder.get(`http://localhost:3001/api/v14/data/${id}`);
      console.log(response.data.data);
      setEmail(response.data.data.clientapi.email);
      setApikey(response.data.data.clientapi.apikey);
      setCompany(response.data.data.clientapi.company);
      setApitype(response.data.data.clientapi.apitype);
    };

    fetchData();
  }, [id]);
  const { clientapis, setClientapis } = useContext(DriversContext);
  const deleteData = async (e, id) => {
    try {
      const response = await DriverFinder.delete(`http://localhost:3001/api/v14/data/${id}`);
      setClientapis(
        clientapis.filter(() => {
          return id;
        }, [response])
      );
      toast.error(`Deleted ID ${id}!`);
    } catch (err) {
      console.log(err);
    }
    history.push("/admin/client_apis");
  };
  return (
    <React.Fragment>
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px" }}
        title={"Confirm Delete"}
        onConfirm={(e) => deleteData(e, id)}
        onCancel={() => history.push("/admin/client_apis")}
        confirmBtnBsStyle="danger"
        confirmBtnText="Delete"
        cancelBtnBsStyle="info"
        closeOnClickOutside={false}
        showCancel
      >
        <div style={{visibility: "hidden", position: "absolute"}}>
          {apikey}
          {company}
          {apitype}
        </div>
        Email: {email}<br />
        id: {id}
        <Col style={{textAlign: "center"}}>
          This action cannot be undone.
        </Col>
      </ReactBSAlert>
    </React.Fragment>
  )
}
export default Client_ApisDelete_Client_Api
