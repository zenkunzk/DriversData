import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {toast} from "react-toastify";
import DriverFinder from "../../../apis/DriverFinder";
import {Col, FormGroup, Input, Label} from "reactstrap";

const Api_CalendarPop_up = () => {
  const { id } = useParams();
  let history = useHistory();
  const current1 = new Date();
  const [daynumber, setDaynumber ] = useState("");
  const [email, setEmail ] = useState("");
  const [api, setApi ] = useState("");
  const [startdate, setStartdate ] = useState("");
  const [enddate, setEnddate ] = useState("");
  const [type, setType ] = useState("");
  const [current, setCurrent ] = useState("");
  const [date, setDate ] = useState("");
  const [companycolor, setCompanycolor ] = useState("");
  const [inuse, setInuse ] = useState("");
  const [inusetwo, setInusetwo ] = useState("");

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
      setInuse(response.data.data.calendar.inuse);
      setInusetwo(response.data.data.calendar.inusetwo);
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
      companycolor,
      inuse,
      inusetwo
    });
    toast.success(`Edited ID ${id}!`);
    history.push("/admin/api_calendar");
    console.log(updatedDriver)
  };
  const changeText = (text) => setCurrent(text);
  const changeText2 = (text) => setCompanycolor(text);
  const changeText3 = (text) => setDate(text);
  const changeText4 = (text) => setInuse(text);
  const changeText5 = (text) => setInusetwo(text);
  return (
    <React.Fragment>
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px", border: inuse, background: "black" }}
        onConfirm={() => handleSubmit()}
        onCancel={() => window.history.back()}
        confirmBtnBsStyle="success"
        confirmBtnText="Submit Changes"
        cancelBtnBsStyle="danger"
        closeOnClickOutside={false}
        showCancel
      >

        <h3>Edit Company Use</h3>
        <Col style={{textAlign: "left", color: "white"}} className="checkbox-radios" sm="10">
          <div className="d-flex">Current: {current} <strong className="remove_hover" onClick={() => changeText("") + changeText2("") + changeText3("")} style={{marginLeft: "10px"}}><b>Remove</b></strong></div>
          <FormGroup check className="form-check-radio">
            <Label check>
              <Input
                defaultValue="option1"
                id="exampleRadios1"
                name="exampleRadios"
                onClick={() => changeText("FiveStar") + changeText2("goldenrod") + changeText3(`${current1.getMonth()+1}/${current1.getDate()}/${current1.getFullYear()}`)}
                type="radio"
              />
              <span className="form-check-sign" />
              FiveStar
            </Label>
          </FormGroup>
          <FormGroup check className="form-check-radio">
            <Label check>
              <Input
                defaultValue="option2"
                id="exampleRadios2"
                name="exampleRadios"
                onClick={() => changeText("EcuAmerica") + changeText2("steelblue") + changeText3(`${current1.getMonth()+1}/${current1.getDate()}/${current1.getFullYear()}`)}
                type="radio"
              />
              <span className="form-check-sign" />
              EcuAmerica
            </Label>
          </FormGroup>
          <FormGroup check className="form-check-radio">
            <Label check>
              <Input
                defaultValue="option3"
                id="exampleRadios3"
                name="exampleRadios"
                onClick={() => changeText("Taxi Rodriguez") + changeText2("#3b90fd") + changeText3(`${current1.getMonth()+1}/${current1.getDate()}/${current1.getFullYear()}`)}
                type="radio"
              />
              <span className="form-check-sign" />
              Taxi Rodriguez
            </Label>
            <br />
            <Label style={{marginTop: 9}} check>
              <Input
                defaultValue="option4"
                id="exampleRadios4"
                name="exampleRadios"
                onClick={() => changeText("SUSPENDED") + changeText2("grey") + changeText3(`${current1.getMonth()+1}/${current1.getDate()}/${current1.getFullYear()}`)}
                type="radio"
              />
              <span className="form-check-sign" />
              Suspended
            </Label>
            <hr />
          </FormGroup>
          <FormGroup check className="form-check-radio">
            <Label check>
              <Input
                defaultValue="option5"
                id="exampleRadios5"
                name=""
                value={inuse}
                onClick={() => changeText4("2px solid limegreen") + changeText5("rgba(0,0,0,0.3)")}
                type="radio"
              />
              <span className="form-check-sign" />
              Mark as in use
            </Label>
            <strong className="remove_hover" onClick={() => changeText4("") + changeText5("")} style={{marginLeft: "10px"}}><b>Remove</b></strong>
          </FormGroup>
          <br />
          <button className="btn-default" onClick={() => changeText("") + changeText2("") + changeText3("") + changeText4("") + changeText5("")}>Clear All</button>
        </Col>
      </ReactBSAlert>
    </React.Fragment>
  )
}
export default Api_CalendarPop_up
