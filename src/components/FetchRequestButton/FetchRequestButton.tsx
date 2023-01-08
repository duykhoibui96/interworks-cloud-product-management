import React, { useState } from "react";

import { Button, Spinner, ToastContainer, Toast } from "react-bootstrap";

type FetchRequestButtonProps = {
  btnText: string;
  request: () => Promise<any>;
  onData: (data: any) => any;
};

const FetchRequestButton: React.FC<FetchRequestButtonProps> = ({
  btnText,
  request,
  onData,
}) => {
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);

  function onFetchAPI() {
    setFetching(true);
    setError(false);
    request()
      .then((data) => onData(data))
      .catch((e) => setError(true))
      .finally(() => setFetching(false));
  }

  return (
    <>
      <ToastContainer position="top-end">
        <Toast bg="danger" show={error} onClose={() => setError(false)}>
          <Toast.Header>
            <strong className="me-auto">Message</strong>
          </Toast.Header>
          <Toast.Body style={{ color: "white" }}>
            Something went wrong! Please try again
          </Toast.Body>
        </Toast>
      </ToastContainer>
      {fetching ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Button variant="secondary" onClick={onFetchAPI}>
          {btnText}
        </Button>
      )}
    </>
  );
};

export default FetchRequestButton;

// import React, { useState } from 'react';
// import Toast from 'react-bootstrap/Toast';
// import ToastContainer from 'react-bootstrap/ToastContainer';

// function StackingExample() {
//   const [position, setPosition] = useState('top-start');

//   return (
//     <ToastContainer>
//       <Toast>
//         <Toast.Header>
//           <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
//           <strong className="me-auto">Bootstrap</strong>
//           <small className="text-muted">just now</small>
//         </Toast.Header>
//         <Toast.Body>See? Just like this.</Toast.Body>
//       </Toast>
//       <Toast>
//         <Toast.Header>
//           <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
//           <strong className="me-auto">Bootstrap</strong>
//           <small className="text-muted">2 seconds ago</small>
//         </Toast.Header>
//         <Toast.Body>Heads up, toasts will stack automatically</Toast.Body>
//       </Toast>
//     </ToastContainer>
//   );
// }

// export default StackingExample;
