import React from "react";

class KeyboardController extends React.Component {
  handleKeyPress = e => {
    const {prev, next} = this.props;
    const event = window.event ? window.event : e;
    if (event.keyCode === 37 || event.keyCode === 33 || (event.keyCode === 32 && event.shiftKey)) {
      prev();
    } else if (
      event.keyCode === 39 ||
      event.keyCode === 34 ||
      (event.keyCode === 32 && !event.shiftKey)
    ) {
      next();
    }
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    return this.props.children;
  }
}

export default KeyboardController;
