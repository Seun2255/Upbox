import React from "react";
import icons from "../assets/icons/icons";
import Image from "next/image";

function Input(props) {
  const { setText } = props;

  return (
    <div style={style.outer}>
      <input
        type="text"
        placeholder="Search"
        style={style.input2}
        onChange={(e) => setText(e.target.value)}
      />
      <div style={style.imgContainer2}>
        <Image alt="an imported item" src={icons.search} fill />
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
    padding: "8px 8px 8px 16px",
    width: "231px",
    height: "50px",
    border: "1px solid #AAAAAA",
    boxSizing: "border-box",
    borderRadius: "8px",
    margin: "0 10px",
    position: "relative",
  },

  imgContainer2: {
    width: "14px",
    height: "14px",
    position: "absolute",
    right: "10px",
    top: "15px",
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
    color: "white",
  },
};

export default Input;
