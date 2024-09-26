import React from "react";
import Typewriter from "typewriter-effect";

function Type() {
  return (
    <Typewriter
      options={{
        strings: [
          "Welcome to Social Service Council Of IIT BHU ",
          "Welcome to Social Service Council Of IIT BHU ",
          "Welcome to Social Service Council Of IIT BHU ",
          "Welcome to Social Service Council Of IIT BHU ",

        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
