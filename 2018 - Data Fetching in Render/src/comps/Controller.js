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
      },
    };
  }

  state = {
    index: this.props.navigator.getCurrentIndex(),
    slideCount: 0,
  };

  setSlideCount = target => {
    this.setState({slideCount: target}, () => {
      if (target <= this.state.index) {
        this.props.navigator.setIndex(target - 1);
      }
    });
  };

  handleSetIndex = target => {
    if (target >= 0 && target < this.state.slideCount) this.props.navigator.setIndex(target);
  };

  componentDidMount() {
    this.unsub = this.props.navigator.listen(index => this.setState({index}));
  }

  componentWillUnmount() {
    this.unsub();
  }

  render() {
    return this.props.children(this.state.index, this.handleSetIndex);
  }
}

export default Controller;
