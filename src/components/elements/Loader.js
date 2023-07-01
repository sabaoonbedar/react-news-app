import React from "react";
import Spinner from "react-bootstrap/Spinner";

function Loader(props) {
  const loaderStyle = {
    position: "absolute",
    zIndex: "9999",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  };
  return (
    <>
      <div className="loader" style={loaderStyle}>
        <div style={{ zIndex: "99999" }}>
          <Spinner
            animation="border"
            style={{
              width: props.width,
              height: props.height,
              color: props.backgroundColor,
            }}
          ></Spinner>
        </div>
      </div>
    </>
  );
}

export default Loader;
