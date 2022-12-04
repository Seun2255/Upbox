import React from "react";
import Image from "next/image";
import icons from "../assets/icons/icons";

function InputAddress(props) {
  const { setText } = props;

  return (
    <div style={style.outer}>
      <input
        type="text"
        placeholder="Address"
        style={style.input2}
        onChange={(e) => setText(e.target.value)}
      />
      <div style={style.imgContainer2}>
        <Image alt="an imported item" src={icons.whatsapp} fill />
      </div>
    </div>
  );
}

const style = {
  outer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 16px",
    width: "446px",
    height: "62px",
    border: "1px solid #AAAAAA",
    boxSizing: "border-box",
    borderRadius: "8px",
    position: "relative",
  },

  imgContainer2: {
    width: "18px",
    height: "16px",
    position: "absolute",
    right: "23px",
    top: "23px",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  input2: {
    border: "none",
    padding: 0,
    margin: 0,
    height: "100%",
    width: "80%",
    outline: "none",
    background: "transparent",
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "24px",
    color: "#888888",
  },
};

export default InputAddress;
