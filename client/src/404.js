import React from "react"
import ReactBSAlert from "react-bootstrap-sweetalert";
import {useHistory} from "react-router-dom";
const ErrorPage = () => {
  let history = useHistory();
  const hideAlert = () => {
    history.push("/")
  };
  return (
      <ReactBSAlert
        style={{ display: "block", marginTop: "-100px" }}
        title="404 Error"
        onConfirm={() => hideAlert()}
        confirmBtnBsStyle="info"
        confirmBtnText="Back To Home"
      >
        The page you were looking for was not found.
      </ReactBSAlert>
  )
}

export default ErrorPage
