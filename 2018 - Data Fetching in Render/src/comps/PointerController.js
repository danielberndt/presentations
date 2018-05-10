import React from "react";

class PointerController extends React.Component {
  handlePointerUp = e => {
    if (e.target.tagName === "A" || e.target.tagName === "BUTTON" || e.target.tagName === "INPUT") {
      return;
    }
    if (e.x > window.innerWidth / 2) {
      this.props.next();
    } else if (e.x < window.innerWidth / 3) {
      this.props.prev();
    }
  };

  componentDidMount() {
    window.addEventListener("pointerup", this.handlePointerUp);
  }

  componentWillUnmount() {
    window.removeEventListener("pointerup", this.handlePointerUp);
  }

  render() {
    return null;
  }
}

export default PointerController;
