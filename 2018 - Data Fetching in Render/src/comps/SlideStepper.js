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

class RawSlideStepper extends React.Component {
  static contextTypes = {
    slide: PropTypes.object,
  };

  state = {index: 0};

  handleNext = () => {
    const {index} = this.state;
    const childCount = this.childCount || 1;
    if (index + 1 >= childCount) return false;
    this.setState({index: index + 1});
  };

  handlePrev = () => {
    const {index} = this.state;
    if (index === 0) return false;
    this.setState({index: index - 1});
  };

  handleChildCount = count => (this.childCount = count);

  render() {
    const {isActiveSlide} = this.context.slide;
    const {index} = this.state;
    return (
      <Motion style={{idx: spring(index)}}>
        {({idx}) => (
          <React.Fragment>
            {isActiveSlide && <CaptureNextPrev next={this.handleNext} prev={this.handlePrev} />}
            {this.props.children(idx, index, this.handleChildCount)}
          </React.Fragment>
        )}
      </Motion>
    );
  }
}

const SlideStepper = ({children}) => (
  <RawSlideStepper>
    {(idx, index, setChildCount) =>
      React.Children.map(children, (c, i) => {
        const progress = Math.max(0, Math.min(1, idx + 1 - i));
        setChildCount(i + 1);
        return React.cloneElement(c, {progress});
      })
    }
  </RawSlideStepper>
);

export default SlideStepper;

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

export class SlideCarousel extends React.Component {
  refHandler = {};
  refY = {};

  handleNode = (n, index) => {
    if (n) {
      debugger;
      this.refY[index] = n.offsetTop;
    }
  };

  handleRef = index => {
    return (this.refHandler[index] = this.refHandler[index] || (n => this.handleNode(n, index)));
  };

  render() {
    const {children, ...rest} = this.props;
    return (
      <RawSlideStepper>
        {(idx, index, setChildCount) => (
          <Motion style={{y: spring(this.refY[index] || 0)}}>
            {({y}) => (
              <div {...rest}>
                <div style={{transform: `translate3d(0, ${-y}px, 0)`, marginTop: "30vh"}}>
                  {React.Children.map(children, (c, i) => {
                    const progress = Math.max(0, Math.min(1, idx + 1 - i));
                    setChildCount(i + 1);
                    return React.cloneElement(c, {progress, handleRef: this.handleRef(i)});
                  })}
                </div>
              </div>
            )}
          </Motion>
        )}
      </RawSlideStepper>
    );
  }
}

export const ScrollStep = ({progress, handleRef, children}) =>
  children({opacity: progress}, handleRef);
