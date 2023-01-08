import React, { useEffect, useContext, useState } from "react";
import { Modal } from "react-bootstrap";

import { AuthContext } from "../contexts/Auth";
import LogIn from "../components/Login/LogIn";

const withAuth = (Component: React.FC<any>) => (props: any) => {
  const { token, isAuthenticated, saveToken, clearToken } =
    useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsAuthenticating(true);
    }
  }, [isAuthenticated]);

  return (
    <>
      <Modal show={isAuthenticating} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Please login first</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: 30 }}>
          <LogIn
            onAuthenticated={(token: string) => {
              setIsAuthenticating(false);
              saveToken(token);
            }}
          />
        </Modal.Body>
      </Modal>
      <Component
        {...props}
        token={token}
        isAuthenticated={isAuthenticated}
        onLogOut={() => clearToken()}
      />
    </>
  );
};

export default withAuth;
