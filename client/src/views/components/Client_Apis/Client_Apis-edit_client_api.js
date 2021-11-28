import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom";
import ReactBSAlert from "react-bootstrap-sweetalert";
import DriverFinder from "../../../apis/DriverFinder";
import {Col, FormGroup, Input, Label} from "reactstrap";
import {toast} from "react-toastify";

const Client_ApisEdit_Client_Api = () => {
  const { id } = useParams();
  let history = useHistory();
  const [email, setEmail ] = useState("");
  const [apikey, setApikey ] = useState("");
  const [company, setCompany ] = useState("");
  const [apitype, setApitype ] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await DriverFinder.get(`/api/v14/data/${id}`);
      console.log(response.data.data);
      setEmail(response.data.data.clientapi.email);
      setApikey(response.data.data.clientapi.apikey);
      setCompany(response.data.data.clientapi.company);
      setApitype(response.data.data.clientapi.apitype);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    const updatedDriver = await DriverFinder.put(`/api/v14/data/${id}`, {
      email,
      apikey,
      company,
      apitype
    });
    toast.success(`Edited ID ${id}!`)
    history.push("/admin/client_apis");
    console.log(updatedDriver)
  };
  const [text] = useState("")
  const changeText = (text) => setApitype(text);
  return (
    <React.Fragment>
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px" }}
        title="Edit Company"
        onConfirm={() => handleSubmit()}
        onCancel={() => history.push("/admin/client_apis")}
        confirmBtnBsStyle="success"
        confirmBtnText="Submit Changes"
        cancelBtnBsStyle="danger"
        closeOnClickOutside={false}
        showCancel
      >
        <Col style={{textAlign: "left"}} className="checkbox-radios">
          Email:
          <Input
            type="email"
            placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)}
          /><br/>
          Api Key:
          <Input
            type="text"
            placeholder="Api key"
            onChange={(e) => setApikey(e.target.value)}
            value={apikey}
          />
          <hr />
          <FormGroup check className="form-check-radio">
            <h4 style={{color: "black"}}>Api Type: {apitype}</h4>
            <Label check>
              <Input
                defaultValue="option1"
                id="exampleRadios1"
                name="exampleRadios"
                onClick={() => changeText("Mapbox")}
                type="radio"
              />
              <span className="form-check-sign" />
              Mapbox
            </Label>
          </FormGroup>
          <FormGroup check className="form-check-radio">
            <Label check>
              <Input
                defaultValue="option1"
                id="exampleRadios1"
                name="exampleRadios"
                onClick={() => changeText("Tomtom")}
                type="radio"
              />
              <span className="form-check-sign" />
              Tomtom
            </Label>
          </FormGroup>
          <FormGroup check className="form-check-radio">
            <Label check>
              <Input
                defaultValue="option1"
                id="exampleRadios1"
                name="exampleRadios"
                onClick={() => changeText("Here")}
                type="radio"
              />
              <span className="form-check-sign" />
              Here
            </Label>
          </FormGroup>
          <hr />
          Company Name:
          <Input
            type="text"
            placeholder="Company"
            onChange={(e) => setCompany(e.target.value)}
            value={company}
          />
          <hr />
          <FormGroup check className="form-check-radio">
            <input
              value={apitype+text}
              style={{marginLeft: 10, width: 170, visibility: "hidden", position: "absolute"}}
              onChange={(e) => setApitype(e.target.value)}
              type="text"
            />
          </FormGroup>
        </Col>
      </ReactBSAlert>
    </React.Fragment>
  )
}
export default Client_ApisEdit_Client_Api
