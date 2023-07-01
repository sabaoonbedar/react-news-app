import React from "react";
function PreDataLoader(props) {
  const loaderStyle = {
    position: "absolute",
    zIndex: "9999",
    left: props.left,
    right: props.right,
    top: props.top,
    bottom: props.bottom,
  };
  return (
    <>
      <div
        className="loader"
        style={{
          backgroundColor: "#094274",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <img src={require("../assets/logo.png")} width="120" height="120" />
      </div>
    </>
  );
}

export default PreDataLoader;
