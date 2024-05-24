//TODO : Retirar o codigo redundante
//DONE: Alterei os botões Sign Up / Sign In e o Forgot Password
import { Card, Button, CardHeader, CardBody, Form, FormGroup, Label, Input, CardFooter, CardText } from "reactstrap";
import { useState, useRef } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { useTranslation } from "react-i18next";
import RecoverPassword from "../modals/recover-password.jsx";
import { terror, tsuccess } from "../toasts/message-toasts";
import { Api } from "../../api.js";
import "../../assets/css/general-css.css";

function SignUp() {
  const { t } = useTranslation();
  const recoverPasswordRef = useRef();

  const [isSignUp, setIsSignUp] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = {
    email,
    password,
    confirmPassword,
  };

  async function handleSignIn() {
    try {
      const response = await Api.signin(email, password);
      if (response.data) {
        tsuccess("Login successful!");
        //TODO redirect to home page
      }
    } catch (error) {
      terror(error.message);
    }
  }

  async function handleSignUp() {
    if (password !== confirmPassword) {
      terror("Passwords do not match");
      return;
    }
    try {
      const response = await Api.signup(registerUser);
      //TODO redirect to login page
      tsuccess(response.data);
    } catch (error) {
      terror(error.message);
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
                  <Input
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name="password"
                    placeholder="Password"
                    type="password"
                    required
                  />
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
                  onClick={handleSignUp}
                >
                  Create Account
                </Button>
              </Form>
            </CardBody>
            <CardFooter className="text-center">
              <p style={{ color: "var(--whitey)", marginTop: "10px" }}>
                Already have an account?{" "}
                <button className="button-link" onClick={() => setIsSignUp(false)} style={{ cursor: "pointer", color: "#FFD700" }}>
                  Sign In
                </button>
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

                <span className="button-link" style={{ color: "var(--whitey)", fontWeight: "bold" }} onClick={() => recoverPasswordRef.current.open()}>
                  Forgot password?
                </span>

                <Button
                  style={{
                    backgroundColor: "var(--secondary-color)",
                    color: "var(--whitey)",
                    marginTop: "20px",
                    width: "100%",
                    border: "none",
                  }}
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
              </Form>
            </CardBody>
            <CardFooter className="text-center">
              <p style={{ color: "var(--whitey)", marginTop: "10px" }}>
                Dont have an account yet?{" "}
                <button className="button-link" onClick={() => setIsSignUp(true)} style={{ cursor: "pointer", color: "#FFD700" }}>
                  Sign Up
                </button>
              </p>
            </CardFooter>
          </>
        )}
      </Card>
    </>
  );
}

export default SignUp;
