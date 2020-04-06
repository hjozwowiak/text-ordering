import React, { useEffect } from "react";

const Test = ({ url }) => {
  useEffect(() => {
    console.log("TEST update");
  });

  return <p>Test {url}</p>;
};

export default Test;
