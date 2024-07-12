//TODO : Retirar o codigo redundante
//DONE: Alterei os botões Sign Up / Sign In e o Forgot Password
import { Card, Button, CardHeader, CardBody, Form, FormGroup, Label, Input, CardFooter, CardText } from "reactstrap";
import { useState, useRef } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import { useTranslation } from "react-i18next";
import RecoverPassword from "../modals/recover-password.jsx";
import { terror, tsuccess } from "../toasts/message-toasts";
import { useUserStore } from "../../stores/useUserStore.js";
import { Api } from "../../api.js";
import "../../assets/css/general-css.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { t } = useTranslation();
  const recoverPasswordRef = useRef();
  const updateToken = useUserStore((state) => state.updateToken);
  const updateEmail = useUserStore((state) => state.updateEmail);
  const updateUnreadEmails = useUserStore((state) => state.updateUnreadEmails);
  const updateUnreadNotifications = useUserStore((state) => state.updateUnreadNotifications);
  const updateUserType = useUserStore((state) => state.updateUserType);
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);

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
        updateToken(response.data.token);
        updateEmail(response.data.email);
        updateUnreadEmails(response.data.unreadEmails);
        updateUnreadNotifications(response.data.unreadNotifications);
        updateUserType(response.data.userType);
        //TODO redirect to home page
        navigate("fica-lab/home");
      }
    } catch (error) {
      terror(error.message);
    }
  }

  async function handleSignUp() {
    console.log(registerUser);
    if (password !== confirmPassword) {
      terror("Passwords do not match");
      return;
    }
    try {
      const response = await Api.signup(registerUser);
      tsuccess(response.data);
      setPassword("");
      setConfirmPassword("");
      setEmail("");
      setIsSignUp(false);
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
              <h2 style={{ color: "var(--whitey)", fontWeight: 'bold' }}>{t("sign-up")}</h2>

              <CardText className="text-center" style={{ marginTop: "20px" }}>
                {t("sign-up-subtext")}
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
                  <Label>{t("confirm-password")}</Label>
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
                  {t("create-account")}
                </Button>
              </Form>
            </CardBody>
            <CardFooter className="text-center">
              <p style={{ color: "var(--whitey)", marginTop: "10px" }}>
                {t("already-have-account")}{" "}
                <button className="button-link" onClick={() => setIsSignUp(false)} style={{ cursor: "pointer", color: "#FFD700" }}>
                  {t("sign-in")}
                </button>
              </p>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader className="text-center" style={{ color: "var(--whitey)" }}>
              <h2 style={{ color: "var(--whitey)", fontWeight: 'bold' }}>{t("sign-in")}</h2>

              <CardText className="text-center" style={{ marginTop: "20px" }}>
                {t("sign-in-subtext")}
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
                  {t("forgot-password")}
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
                  {t("sign-in")}
                </Button>
              </Form>
            </CardBody>
            <CardFooter className="text-center">
              <p style={{ color: "var(--whitey)", marginTop: "10px" }}>
                {t("dont-have-account")}{" "}
                <button className="button-link" onClick={() => setIsSignUp(true)} style={{ cursor: "pointer", color: "#FFD700" }}>
                  {t("sign-up")}
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
