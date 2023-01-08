import React, { useState } from "react";

import { Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";

import {
  API_BASE_URL,
  GRANT_TYPE,
  CLIENT_ID,
  CLIENT_SECRET,
  PROXY_URL,
} from "../../config";

type LoginProps = {
  onAuthenticated: Function;
};

const LogIn: React.FC<LoginProps> = ({ onAuthenticated }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

  function onValidate(values: { username: string; password: string }) {
    const errors: any = {};
    if (!values.username) {
      errors.username = "Username is required";
    }

    if (!values.password) {
      errors.password = "Password is required";
    }

    return errors;
  }
  function onSubmit(
    values: { username: string; password: string },
    { setSubmitting = (flag: boolean) => {} }
  ) {
    setErrorMessage("");
    fetch(`${PROXY_URL}/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${window.btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
        "Target-URL": API_BASE_URL,
      },
      body: new URLSearchParams({
        username: values.username,
        password: values.password,
        grant_type: GRANT_TYPE,
      }).toString(),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(({ error }: any = {}) => {
            if (error === "invalid_grant") {
              setErrorMessage("Invalid user credentials");
            } else {
              setErrorMessage("Something went wrong! Please try again later.");
            }
          });
        }
      })
      .then(
        ({ access_token } = {}) => access_token && onAuthenticated(access_token)
      )
      .catch((e) => {
        console.log(e);
        setErrorMessage("Something went wrong! Please try again later.");
      })
      .finally(() => setSubmitting(false));
  }

  return (
    <>
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
          {errorMessage}
        </Alert>
      )}
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={onValidate}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
              />
              {touched.username && errors.username && (
                <Form.Text className="form-error">{errors.username}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Form.Text className="form-error">{errors.password}</Form.Text>
              )}
            </Form.Group>
            <div className="d-grid gap-2">
              <Button
                type="submit"
                variant="primary"
                disabled={!isValid || isSubmitting}
              >
                Log In
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LogIn;
