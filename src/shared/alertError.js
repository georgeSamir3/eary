import React from "react";
import { Alert } from "react-bootstrap";

const AlertError = ({errors}) => {
  if (!Array.isArray(errors)) {
    return null; // or return some default component
  }
  return (
    <>
      {errors.map((err, i) => {
        return (
          <Alert key={i} variant="danger">
            {err}
          </Alert>
        );
      })}
    </>
  );
};

export default AlertError;
