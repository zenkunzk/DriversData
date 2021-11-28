import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {toast} from "react-toastify";
import DriverFinder from "../../../apis/DriverFinder";
import {Col, Input} from "reactstrap";

const Available_EmailsEdit_data = () => {
  const { id } = useParams();
  let history = useHistory();
  const [aemail, setAemail] = useState("");
  const [hereapis, setHereapis] = useState("");
  const [mapboxapis, setMapboxapis] = useState("");
  const [tomtomapis, setTomtomapis] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await DriverFinder.get(`/api/v3/data/${id}`);
      console.log(response.data.data);
      setAemail(response.data.data.driversdataemail.aemail);
      setHereapis(response.data.data.driversdataemail.hereapis);
      setMapboxapis(response.data.data.driversdataemail.mapboxapis);
      setTomtomapis(response.data.data.driversdataemail.tomtomapis);
    };

    fetchData();
  }, [id]);

  const handleSubmit = async () => {
    const updatedDriver = await DriverFinder.put(`/api/v3/data/${id}`, {
      aemail,
      hereapis,
      mapboxapis,
      tomtomapis,
    });
    toast.success(`Edited ID ${id}!`);
    history.push("/admin/available_emails");
    console.log(updatedDriver)
  };
  return (
    <React.Fragment>
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px" }}
        title={"Edit Email"}
        onConfirm={() => handleSubmit()}
        onCancel={() => window.history.back()}
        confirmBtnBsStyle="success"
        confirmBtnText="Submit Changes"
        cancelBtnBsStyle="danger"
        showCancel
        closeOnClickOutside={false}
      >

        <Col style={{textAlign: "left"}} className="checkbox-radios">
          Email:
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setAemail(e.target.value)}
            value={aemail}
          /><hr />
          Here API:
          <Input
            type="text"
            placeholder="Here API Key"
            onChange={(e) => setHereapis(e.target.value)}
            value={hereapis}
          /><br />
          Mapbox API:
          <Input
            type="text"
            placeholder="Mapbox API Key"
            onChange={(e) => setMapboxapis(e.target.value)}
            value={mapboxapis}
          /><br />
          Tomtom API:
          <Input
            type="text"
            placeholder="Tomtom API Key"
            onChange={(e) => setTomtomapis(e.target.value)}
            value={tomtomapis}
          />
        </Col>
      </ReactBSAlert>
    </React.Fragment>
  )
}
export default Available_EmailsEdit_data
