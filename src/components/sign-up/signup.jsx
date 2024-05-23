import { Card, Button, CardHeader, CardBody, Form, FormGroup, Label, Input, CardFooter, CardText } from "reactstrap";
import { useState, useRef } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { useTranslation } from "react-i18next";
import RecoverPassword from "../modals/recover-password.jsx";
import { Api } from "../../api.js";
import "../../assets/css/general-css.css";

function SignUp() {
  const { t } = useTranslation();
  const recoverPasswordRef = useRef();

  const [isSignUp, setIsSignUp] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSingIn() {
    try {
      const response = await Api.signin(email, password);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <RecoverPassword ref={recoverPasswordRef} />
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
        {isSignUp ? (
          <>
            <CardHeader className="text-center" style={{ color: "var(--whitey)" }}>
              <h4>Sign Up</h4>

              <CardText className="text-center" style={{ marginTop: "20px" }}>
                Ready to make your projects a reality? Join us!
              </CardText>
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup floating>
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Email" type="email" required />
                  <Label for="exampleEmail">Email</Label>
                </FormGroup>
                <FormGroup floating>
                  <Input value={password} onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Password" type="password" required />
                  {password && <PasswordStrengthBar minLength={1} password={password} />}
                  <Label for="examplePassword">Password</Label>
                </FormGroup>
                <FormGroup floating>
                  <Input name="password" placeholder="Password" type="password" required />

                  <Label>Confirm Password</Label>
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
                <a onClick={() => setIsSignUp(false)} style={{ cursor: "pointer", color: "#FFD700" }}>
                  Sign In
                </a>
              </p>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader className="text-center" style={{ color: "var(--whitey)" }}>
              <h4>Sign In</h4>

              <CardText className="text-center" style={{ marginTop: "20px" }}>
                Time to get back to work!
              </CardText>
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup floating>
                  <Input name="email" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <Label for="exampleEmail">Email</Label>
                </FormGroup>

                <FormGroup floating>
                  <Input name="password" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                  <Label for="examplePassword">Password</Label>
                </FormGroup>

                <a style={{ color: "var(--whitey)", fontWeight: "bold" }} onClick={() => recoverPasswordRef.current.open()}>
                  Forgot password?
                </a>

                <Button
                  style={{
                    backgroundColor: "var(--secondary-color)",
                    color: "var(--whitey)",
                    marginTop: "20px",
                    width: "100%",
                    border: "none",
                  }}
                  onClick={handleSingIn}
                >
                  Sign In
                </Button>
              </Form>
            </CardBody>
            <CardFooter className="text-center">
              <p style={{ color: "var(--whitey)", marginTop: "10px" }}>
                Dont have an account yet?{" "}
                <a onClick={() => setIsSignUp(true)} style={{ cursor: "pointer", color: "#FFD700" }}>
                  Sign Up
                </a>
              </p>
            </CardFooter>
          </>
        )}
      </Card>
    </>
  );
}

export default SignUp;
