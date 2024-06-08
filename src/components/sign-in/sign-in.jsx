// import {
//   Row,
//   Col,
//   Card,
//   Button,
//   CardHeader,
//   CardBody,
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   CardFooter,
//   CardText,
//   Container,
// } from "reactstrap";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// import "../../assets/css/general-css.css";

// function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const [resetPassword, setResetPassword] = useState(false);

//   return (
//     <div className="section1" style={{ minHeight: "845px" }}>
//       <Container>
//         <Row>
//           <Col md="3"></Col>

//           <Col md="6">
//             <Card
//               style={{
//                 backgroundColor: "var(--primary-color)",
//                 borderRadius: "20px",
//                 marginTop: "110px",
//                 marginBottom: "50px",
//                 boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.6)",
//               }}
//               body
//             >
//               <CardHeader
//                 className="text-center"
//                 style={{ color: "var(--whitey)" }}
//               >
//                 <h4>Sign In</h4>

//                 <CardText className="text-center" style={{ marginTop: "20px" }}>
//                   Time to get back to work!
//                 </CardText>
//               </CardHeader>
//               <CardBody>
//                 <Form>
//                   <FormGroup floating>
//                     <Input
//                       name="email"
//                       placeholder="Email"
//                       type="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                     <Label for="exampleEmail">Email</Label>
//                   </FormGroup>

//                   <FormGroup floating>
//                     <Input
//                       name="password"
//                       placeholder="Password"
//                       type="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />

//                     <Label for="examplePassword">Password</Label>
//                   </FormGroup>
//                   <Link
//                     to="/confirm-account"
//                     style={{ color: "var(--whitey)", fontWeight: "bold" }}
//                   >
//                     Forgot password?
//                   </Link>
//                   <Button
//                     style={{
//                       backgroundColor: "var(--secondary-color)",
//                       color: "var(--whitey)",
//                       marginTop: "20px",
//                       width: "100%",
//                       border: "none",
//                     }}
//                   >
//                     Sign In
//                   </Button>
//                 </Form>
//               </CardBody>
//               <CardFooter className="text-center">
//                 <p style={{ color: "var(--whitey)", marginTop: "10px" }}>
//                   Dont have an account yet? <Link to="/">Sign up</Link>
//                 </p>
//               </CardFooter>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// export default SignIn;
