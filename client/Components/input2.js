import React from "react";

function Input2(props) {
  const { setDiscription } = props;
  return (
    <div style={style.outer}>
      <textarea
        type="text"
        placeholder="Description"
        style={style.input}
        onChange={(e) => setDiscription(e.target.value)}
      />
    </div>
  );
}

const style = {
  outer: {
    display: "flex",
    width: "401px",
    height: "80px",
    border: "1px solid #AAAAAA",
    boxSizing: "border-box",
    borderRadius: "8px",
  },

  input: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 16px",
    width: "100%",
    height: "100%",
    border: "1px solid #AAAAAA",
    boxSizing: "border-box",
    borderRadius: "8px",
    background: "transparent",
    fontWeight: 400,
    fontSize: "20px",
    lineHeight: "24px",
    color: "#888888",
    outline: "none",
  },
};

export default Input2;
