import React from "react";

import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";

type LoginProps = {
  onAuthenticated: Function;
};

const LogIn: React.FC<LoginProps> = ({ onAuthenticated }) => {
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
  function onSubmit(values: { username: string; password: string }) {
    console.log("values", values);
    onAuthenticated("access_token");
  }

  return (
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
  );
};

export default LogIn;
