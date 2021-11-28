import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {toast} from "react-toastify";
import DriverFinder from "../../../apis/DriverFinder";
import {Col, FormGroup, Input, Label, Row} from "reactstrap";

const Api_CalendarEdit_data = () => {
  const { id } = useParams();
  let history = useHistory();
  const [daynumber, setDaynumber ] = useState("");
  const [email, setEmail ] = useState("");
  const [api, setApi ] = useState("");
  const [startdate, setStartdate ] = useState("");
  const [enddate, setEnddate ] = useState("");
  const [type, setType ] = useState("");
  const [current, setCurrent ] = useState("");
  const [date, setDate ] = useState("");
  const [companycolor, setCompanycolor ] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await DriverFinder.get(`http://localhost:3001/api/v11/data/${id}`);
      console.log(response.data.data);
      setDaynumber(response.data.data.calendar.daynumber);
      setEmail(response.data.data.calendar.email);
      setApi(response.data.data.calendar.api);
      setStartdate(response.data.data.calendar.startdate);
      setEnddate(response.data.data.calendar.enddate);
      setType(response.data.data.calendar.type);
      setCurrent(response.data.data.calendar.current);
      setDate(response.data.data.calendar.date);
      setCompanycolor(response.data.data.calendar.companycolor);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    const updatedDriver = await DriverFinder.put(`http://localhost:3001/api/v11/data/${id}`, {
      daynumber,
      email,
      api,
      startdate,
      enddate,
      type,
      current,
      date,
      companycolor
    });
    toast.success(`Edited ID ${id}!`);
    history.push("/admin/api_calendar");
    console.log(updatedDriver)
  };
  const [text] = useState("")
  const changeText = (text) => setType(text);
  return (
    <React.Fragment>
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px" }}
        title={"Edit Day " +daynumber}
        onConfirm={() => handleSubmit()}
        onCancel={() => window.history.back()}
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          /><br/>
          Api Key:
          <Input
            type="text"
            placeholder="Api key"
            onChange={(e) => setApi(e.target.value)}
            value={api}
          />
          <hr />
          <FormGroup check className="form-check-radio">
            <h4 style={{color: "black"}}>Type: {type}</h4>
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
          <FormGroup check className="form-check-radio">
            <input
              value={type+text}
              style={{marginLeft: 10, width: 170, visibility: "hidden", position: "absolute"}}
              onChange={(e) => setType(e.target.value)}
              type="text"
            />
          </FormGroup>
          <h4 style={{color: "black"}}>Start/End Date: From {startdate} to {enddate}</h4>
          <Col className="data-actions">
            <Row>
              <Col md="6">
                <FormGroup>
                  <Input value={startdate} onChange={(e) => setStartdate(e.target.value)} placeholder="Start" type="number" />
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Input value={enddate} onChange={(e) => setEnddate(e.target.value)} placeholder="End" type="number" />
                </FormGroup>
              </Col>
            </Row>
          </Col>
        </Col>
      </ReactBSAlert>
    </React.Fragment>
  )
}
export default Api_CalendarEdit_data
