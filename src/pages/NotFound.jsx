import React from "react";

const NotFound = () => {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
        <h1 className="text-9xl fw-bold">404</h1>
        <h1 className="fw-bolder">Page Not Found</h1>
        <p>we couldn't find what you were looking for.</p>
        <p className="mx-2">
          Please contact the owner of the site that linked you to the original
          URl and let them know their link is broken.
        </p>
      </div>
    </>
  );
};

export default NotFound;
