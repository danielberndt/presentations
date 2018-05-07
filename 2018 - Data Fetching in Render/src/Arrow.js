import g from "glamorous";

const pointToProps = {
  top: col => ({borderTopWidth: 0, borderBottomColor: col}),
  bottom: col => ({borderBottomWidth: 0, borderTopColor: col}),
  left: col => ({borderLeftWidth: 0, borderRightColor: col}),
  right: col => ({borderRightWidth: 0, borderLeftColor: col}),
};

const Arrow = g.div(
  {
    position: "absolute",
    width: 0,
    height: 0,
    borderColor: "transparent",
    borderStyle: "solid",
  },
  ({pointTo, color, size}) => ({
    borderWidth: size,
    top: pointTo === "bottom" ? "100%" : pointTo === "top" ? undefined : "50%",
    bottom: pointTo === "top" ? "100%" : pointTo === "bottom" ? undefined : "50%",
    left: pointTo === "right" ? "100%" : pointTo === "left" ? undefined : "50%",
    right: pointTo === "left" ? "100%" : pointTo === "right" ? undefined : "50%",
    marginLeft: pointTo === "top" || pointTo === "bottom" ? `-${size}` : undefined,
    marginTop: pointTo === "left" || pointTo === "right" ? `-${size}` : undefined,
    ...pointToProps[pointTo](color),
  })
);

export default Arrow;
