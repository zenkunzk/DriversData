import React, {useContext, useEffect, useState} from "react"
import {useParams, useHistory} from "react-router-dom";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {toast} from "react-toastify";
import DriverFinder from "../../../apis/DriverFinder";
import {Col} from "reactstrap";
import {DriversContext} from "../../../context/DriversContext";

const Api_CalendarDelete_data = () => {
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
  const [date, setDate ] = useState(`${current1.getMonth()+1}/${current1.getDate()}/${current1.getFullYear()}`);
  const [companycolor, setCompanycolor ] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await DriverFinder.get(`/api/v11/data/${id}`);
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
  const { calendars, setCalendars } = useContext(DriversContext);
  const deleteData = async (e, id) => {
    try {
      const response = await DriverFinder.delete(`/api/v11/data/${id}`);
      setCalendars(
        calendars.filter(() => {
          return id;
        }, [response])
      );
      toast.error(`Deleted ID ${id}!`);
    } catch (err) {
      console.log(err);
    }
    history.push("/admin/api_calendar");
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
          {email}
          {api}
          {startdate}
          {enddate}
          {type}
          {current}
          {date}
          {companycolor}
        </div>
        Day {daynumber}<br />
        id: {id}
        <Col style={{textAlign: "center"}}>
          This action cannot be undone.
        </Col>
      </ReactBSAlert>
    </React.Fragment>
  )
}
export default Api_CalendarDelete_data
