import React from "react";

const Error = ({ message }) => {
  return (
    <div>
      <h4 className="text-sm text-red-600">{message}</h4>
    </div>
  );
};

export default Error;
