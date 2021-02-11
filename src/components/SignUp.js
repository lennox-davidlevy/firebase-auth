import React, { useRef, useState } from "react";
import { Card, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const testSubmit = (e) => {
    console.log(e.target);
  };
  async function handleSubmit(e) {
    console.log("handle submit run");
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Passwords do not match");
      return;
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (err) {
      setError("Failed to create an account");
    }
    setLoading(false);
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={testSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
          </Form>
          <Form.Group id="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" ref={passwordRef} required />
          </Form.Group>
          <Form.Group id="password-confirm">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" ref={passwordConfirmRef} required />
          </Form.Group>
          <Button type="submit" className="w-100">
            Sign Up
          </Button>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? Log In
      </div>
    </>
  );
};
export default SignUp;
