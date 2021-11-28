import React, { useState } from "react";
import { toast } from "react-toastify";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  Container,
  Col,
  FormGroup,
} from "reactstrap";
import Footer from "../../components/Footer/Footer";

const Login = ({ setAuth }) => {
  React.useEffect(() => {
    document.body.classList.toggle("login-page");
    return function cleanup() {
      document.body.classList.toggle("login-page");
    };
  });
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <React.Fragment>
      <div className="wrapper wrapper-full-page">
        <div className={"full-page "}>
          <h4 style={{marginTop: 15, marginLeft: 15}}><strong>DRIVERS DATA - LOGIN</strong></h4>
          <div className="content">
            <Container>
              <Col className="ml-auto mr-auto" lg="4" md="6">
                <Form onSubmit={onSubmitForm} className="form">
                  <Card className="card-login card-primary">
                    <CardHeader>
                      <img
                        alt="..."
                        src={require("assets/img/card-info.png").default}
                      />
                      <CardTitle style={{color: "white"}} tag="h1">Log in</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <FormGroup>
                        <Input
                          type="text"
                          name="email"
                          placeholder="Email"
                          value={email}
                          onChange={e => onChange(e)}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Input
                          type="password"
                          name="password"
                          placeholder="Password"
                          className="form-control"
                          value={password}
                          onChange={e => onChange(e)}
                        />
                      </FormGroup>
                    </CardBody>
                    <CardFooter>
                      <Button
                        block
                        className="mb-3"
                        color="info"
                        size="lg"
                      >
                        Log in
                      </Button>
                    </CardFooter>
                  </Card>
                </Form>
              </Col>
            </Container>
          </div>
          <Footer fluid />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
