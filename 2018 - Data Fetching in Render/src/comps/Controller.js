import React from "react";
import PropTypes from "prop-types";

class Controller extends React.Component {
  static childContextTypes = {
    slideController: PropTypes.object,
  };

  getChildContext() {
    return {
      slideController: {
        setSlideCount: this.setSlideCount,
        slideCount: this.state.slideCount,
        captureNextPrev: this.handleCaptureNextPrev,
        releaseNextPrev: this.releaseCaptureNextPrev,
      },
    };
  }

  state = {
    index: this.props.navigator.getCurrentIndex(),
    slideCount: 0,
  };

  nextPrevHandler = null;

  setSlideCount = target => {
    this.setState({slideCount: target}, () => {
      if (target <= this.state.index) {
        this.props.navigator.setIndex(target - 1);
      }
    });
  };

  handleCaptureNextPrev = handler => (this.nextPrevHandler = handler);
  releaseCaptureNextPrev = () => (this.nextPrevHandler = null);

  handleSetIndex = target => {
    if (target >= 0 && target < this.state.slideCount) this.props.navigator.setIndex(target);
  };

  handleNext = () => {
    if (this.nextPrevHandler && this.nextPrevHandler.next() !== false) return;
    if (this.state.index + 1 < this.state.slideCount) {
      this.props.navigator.setIndex(this.state.index + 1);
    }
  };
  handlePrev = () => {
    if (this.nextPrevHandler && this.nextPrevHandler.prev() !== false) return;
    if (this.state.index > 0) {
      this.props.navigator.setIndex(this.state.index - 1);
    }
  };

  componentDidMount() {
    this.unsub = this.props.navigator.listen(index => this.setState({index}));
  }

  componentWillUnmount() {
    this.unsub();
  }

  render() {
    return this.props.children({
      index: this.state.index,
      setIndex: this.handleSetIndex,
      prev: this.handlePrev,
      next: this.handleNext,
    });
  }
}

export default Controller;
