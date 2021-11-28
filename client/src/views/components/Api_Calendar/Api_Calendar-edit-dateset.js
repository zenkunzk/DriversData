import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {toast} from "react-toastify";
import DriverFinder from "../../../apis/DriverFinder";
import {Input} from "reactstrap";

const Api_CalendarEdit_dayset = () => {
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
  return (
    <React.Fragment>
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px" }}
        title="Edit Date Set"
        onConfirm={() => handleSubmit()}
        onCancel={() => window.history.back()}
        confirmBtnBsStyle="success"
        confirmBtnText="Submit Changes"
        cancelBtnBsStyle="danger"
        closeOnClickOutside={false}
        showCancel
      >
        <div>
          <Input placeholder="Day Number" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
      </ReactBSAlert>
    </React.Fragment>
  )
}
export default Api_CalendarEdit_dayset
