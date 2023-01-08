import { useState, useRef, useEffect } from "react";

import logo from "./logo.png";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import {
  Routes,
  Route,
  Outlet,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/Auth";
import withAuth from "./hoc/withAuth";

import ProductList from "./pages/ProductList/ProductList";

function App() {
  const MainLayout = withAuth(Layout);

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="product-list" element={<ProductList />} />
          <Route index element={<Navigate to="product-list" />}></Route>
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </AuthProvider>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p></p>
    </div>
  );
}

type LayoutProps = {
  token: string;
  isAuthenticated: boolean;
  onLogOut: Function;
};

const Layout: React.FC<LayoutProps> = ({
  token,
  isAuthenticated,
  onLogOut,
}) => {
  const [showAccessTokenModal, setShowAccessTokenModal] =
    useState<boolean>(false);

  const { pathname } = useLocation();

  return (
    <div>
      <AccessTokenModal
        token={token}
        show={showAccessTokenModal}
        handleClose={() => {
          setShowAccessTokenModal(false);
        }}
      />
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img alt="" src={logo} className="d-inline-block align-top" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" style={{ fontWeight: "bold" }}>
              <Nav.Link
                href="/product-list"
                active={pathname.includes("/product-list")}
              >
                Product List
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          {isAuthenticated && (
            <Navbar.Collapse className="justify-content-end">
              <Button onClick={() => setShowAccessTokenModal(true)}>
                Show token
              </Button>
              <Button
                variant="danger"
                style={{ marginLeft: 10 }}
                onClick={() => onLogOut()}
              >
                Log out
              </Button>
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
      <div style={{ padding: 50 }}>
        <Outlet />
      </div>
    </div>
  );
};

type AccessTokenModalProps = {
  token: string;
  show: boolean;
  handleClose: () => any;
};

const AccessTokenModal: React.FC<AccessTokenModalProps> = ({
  token,
  show,
  handleClose,
}) => {
  const [showMessage, setShowMessage] = useState(false);
  const accessTokenRef = useRef(null);

  useEffect(() => {
    let timeout: any;
    if (showMessage) {
      timeout = setTimeout(() => setShowMessage(false), 3000);
    }

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [showMessage]);

  function copyToClipboard() {
    const currentText = accessTokenRef?.current as any;
    if (currentText) {
      currentText.select();
      document.execCommand("copy");
      setShowMessage(true);
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Your access token</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showMessage && (
          <Alert
            variant="success"
            onClose={() => setShowMessage(false)}
            dismissible
          >
            Access token is copied!
          </Alert>
        )}
        <Form.Control ref={accessTokenRef} value={token} readOnly />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={copyToClipboard}>
          Copy
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default App;
