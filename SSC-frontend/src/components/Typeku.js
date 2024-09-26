import React from "react";
import Typewriter from "typewriter-effect";


function Typeku() {
  return (
    <Typewriter 
      options={{
        strings: [
          "“Empowering communities, transforming lives”",
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Typeku;
