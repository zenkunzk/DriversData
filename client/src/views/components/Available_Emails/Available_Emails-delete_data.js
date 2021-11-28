import React, {useContext, useEffect, useState} from "react"
import {useParams, useHistory} from "react-router-dom";
import ReactBSAlert from "react-bootstrap-sweetalert";
import {toast} from "react-toastify";
import DriverFinder from "../../../apis/DriverFinder";
import {Col} from "reactstrap";
import {DriversContext} from "../../../context/DriversContext";

const Available_EmailsDelete_data = () => {
  const { id } = useParams();
  let history = useHistory();
  const { driversdataemails, setDriversdataemails } = useContext(DriversContext);
  const [aemail, setAemail] = useState("");
  const [hereapis, setHereapis] = useState("");
  const [mapboxapis, setMapboxapis] = useState("");
  const [tomtomapis, setTomtomapis] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await DriverFinder.get(`http://localhost:3001/api/v3/data/${id}`);
      console.log(response.data.data);
      setAemail(response.data.data.driversdataemail.aemail);
      setHereapis(response.data.data.driversdataemail.hereapis);
      setMapboxapis(response.data.data.driversdataemail.mapboxapis);
      setTomtomapis(response.data.data.driversdataemail.tomtomapis);
    };

    fetchData();
  }, [id]);
  const deleteData = async (e, id) => {
    try {
      const response = await DriverFinder.delete(`http://localhost:3001/api/v3/data/${id}`);
      setDriversdataemails(
        driversdataemails.filter(() => {
          return id;
        }, [response]),
        console.log(response)
      );
      toast.error(`Deleted ID ${id}!`);
    } catch (err) {
      console.log(err);
    }
    history.push("/admin/available_emails");
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
        showCancel
        closeOnClickOutside={false}
      >
        <div style={{visibility: "hidden", position: "absolute"}}>
          {aemail}
          {hereapis}
          {mapboxapis}
          {tomtomapis}
        </div>
        id: {id}
        <Col style={{textAlign: "center"}}>
          This action cannot be undone.
        </Col>
      </ReactBSAlert>
    </React.Fragment>
  )
}
export default Available_EmailsDelete_data
