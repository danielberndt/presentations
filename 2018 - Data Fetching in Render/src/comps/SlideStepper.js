import React from "react";
import PropTypes from "prop-types";
import {Motion, spring} from "react-motion";
import g from "glamorous";

class CaptureNextPrev extends React.Component {
  static contextTypes = {
    slideController: PropTypes.object,
  };

  componentDidMount() {
    this.context.slideController.captureNextPrev({next: this.props.next, prev: this.props.prev});
  }

  componentWillUnmount() {
    this.context.slideController.releaseNextPrev();
  }

  render() {
    return null;
  }
}

export default class SlideStepper extends React.Component {
  static contextTypes = {
    slide: PropTypes.object,
  };

  state = {index: 0};

  handleNext = () => {
    const {index} = this.state;
    const {children} = this.props;
    const childCount = Array.isArray(children) ? children.length : 1;
    if (index + 1 >= childCount) return false;
    this.setState({index: index + 1});
  };

  handlePrev = () => {
    const {index} = this.state;
    if (index === 0) return false;
    this.setState({index: index - 1});
  };

  renderChildren = interpolatedIdx => {
    return React.Children.map(this.props.children, (c, i) => {
      const progress = Math.max(0, Math.min(1, interpolatedIdx + 1 - i));
      return React.cloneElement(c, {progress});
    });
  };

  render() {
    const {isActiveSlide} = this.context.slide;
    const {index} = this.state;
    return (
      <Motion style={{idx: spring(index)}}>
        {({idx}) => (
          <React.Fragment>
            {isActiveSlide && <CaptureNextPrev next={this.handleNext} prev={this.handlePrev} />}
            {this.renderChildren(idx)}
          </React.Fragment>
        )}
      </Motion>
    );
  }
}

const StepComp = g.ul({
  ":not(:last-child)": {marginBottom: "1vh"},
});

export const Step = ({style, children, ...rest}) => (
  <RawStep comp={StepComp} {...rest}>
    <li>{children}</li>
  </RawStep>
);

export const RawStep = ({
  progress = 1,
  style,
  comp: Comp = "div",
  fromTop,
  fromBottom,
  fromLeft,
  ...rest
}) => {
  let transform;
  if (fromTop) transform = `translate3d(0,${(1 - progress) * -2}vh,0)`;
  else if (fromBottom) transform = `translate3d(0,${(1 - progress) * 2}vh,0)`;
  else if (fromLeft) transform = `translate3d(${(1 - progress) * -2}vw,0,0)`;
  else transform = `translate3d(${(1 - progress) * 2}vw,0,0)`;
  return <Comp style={{opacity: progress, transform, ...style}} {...rest} />;
};
