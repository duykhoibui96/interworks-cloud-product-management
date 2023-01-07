import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/Auth";

const withAuthenticatedScreen = (Component: React.FC) => (props: any) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <Component {...props} /> : null;
};

export default withAuthenticatedScreen;
