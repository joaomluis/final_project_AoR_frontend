import {
  Card,
  Button,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  CardFooter,
  CardText,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";

import "../../assets/css/general-css.css";

import SignIn from "../sign-in/sign-in.jsx";

function SignUp() {

    const [password, setPassword] = useState("");

  return (
    <Card
      style={{
        backgroundColor: "var(--primary-color)",
        borderRadius: "20px",
        marginTop: "60px",
        marginBottom: "50px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.6)",
      }}
      body
    >
      <CardHeader className="text-center" style={{ color: "var(--whitey)" }}>
        <h4>Sign Up</h4>

        <CardText className="text-center" style={{ marginTop: "20px" }}>
          Ready to make your projects a reality? Join us!
        </CardText>
      </CardHeader>
      <CardBody>
        <Form>
          <FormGroup floating>
            <Input name="email" placeholder="Email" type="email" required />
            <Label for="exampleEmail">Email</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              placeholder="Password"
              type="password"
              required
            />
            {password && (
              <PasswordStrengthBar minLength={1} password={password} />
            )}
            <Label for="examplePassword">Password</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              name="password"
              placeholder="Password"
              type="password"
              required
            />

            <Label for="examplePassword">Confirm Password</Label>
          </FormGroup>
          <Button
            style={{
              backgroundColor: "var(--secondary-color)",
              color: "var(--whitey)",
              marginTop: "20px",
              width: "100%",
              border: "none",
            }}
          >
            Create Account
          </Button>
        </Form>
      </CardBody>
      <CardFooter className="text-center">
        <p style={{ color: "var(--whitey)", marginTop: "10px" }}>
          Already have an account?{" "}
          <Link to="/login">
            {" "}
            <a>Sign in</a>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

export default SignUp;
