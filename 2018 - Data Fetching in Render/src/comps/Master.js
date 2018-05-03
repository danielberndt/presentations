import React from "react";
import g from "glamorous";
import {StaggeredMotion, spring} from "react-motion";
import range from "lodash/range";
import PropTypes from "prop-types";
import chroma from "chroma-js";

const staggeredSpring = {stiffness: 80, damping: 18, precision: 0.003};

const _chromaCache = {};
const getChroma = (l, r) => {
  const key = `${l}!${r}`;
  return _chromaCache[key] || (_chromaCache[key] = chroma.scale([l, r]).mode("lab"));
};

class ProvideContext extends React.Component {
  static childContextTypes = {
    master: PropTypes.object,
  };

  getChildContext() {
    const {staggered, interpolatedIndex, params, slideCount} = this.props;
    return {
      master: {
        staggered,
        interpolatedIndex,
        params,
        slideCount,
      },
    };
  }

  render() {
    return this.props.children;
  }
}

const Container = g.div({
  position: "relative",
  height: "100%",
  width: "100%",
  overflow: "hidden",
});

class Master extends React.Component {
  static contextTypes = {
    slideController: PropTypes.object,
  };

  componentWillMount() {
    let count = 0;
    React.Children.forEach(this.props.children, child => {
      if (child && child.type && child.type.$isSlide) count += 1;
    });
    this.context.slideController.setSlideCount(count);
  }

  renderChildren(interpolatedIndex) {
    const {children, defaultParams} = this.props;
    const windowSize = 0;
    let index = 0;
    let isExact;
    const params = {...defaultParams};
    const slideParams = [];
    const newChildren = React.Children.map(children, child => {
      if (child && child.type && child.type.$isSlide) {
        const currentIndex = index;
        if (currentIndex === interpolatedIndex) isExact = true;
        slideParams.push(child.props.masterParams);
        index += 1;
        if (currentIndex <= interpolatedIndex - 1 - windowSize) return null;
        if (currentIndex >= interpolatedIndex + 1 + windowSize) return null;
        return React.cloneElement(child, {
          index: currentIndex,
          offset: currentIndex - interpolatedIndex,
        });
      } else {
        return child;
      }
    });
    if (isExact) {
      Object.assign(params, slideParams[interpolatedIndex]);
    } else {
      const first = Math.floor(interpolatedIndex);
      const fraction = interpolatedIndex - first;
      const a = slideParams[first];
      const b = slideParams[first + 1];
      if (a !== undefined)
        for (let k in a) {
          const leftVal = a[k];
          const rightVal = (b && b[k]) || params[k];
          if (leftVal === rightVal) {
            params[k] = leftVal;
          } else if (typeof leftVal === "string") {
            params[k] = getChroma(leftVal, rightVal)(fraction).css();
          } else {
            params[k] = leftVal * (1 - fraction) + rightVal * fraction;
          }
        }
      if (b !== undefined)
        for (let k in b) {
          const leftVal = (a && a[k]) || params[k];
          const rightVal = b[k];
          if (leftVal === rightVal) {
            params[k] = leftVal;
          } else if (typeof leftVal === "string") {
            params[k] = getChroma(leftVal, rightVal)(fraction).css();
          } else {
            params[k] = leftVal * (1 - fraction) + rightVal * fraction;
          }
        }
    }
    return {children: newChildren, params};
  }

  render() {
    const {index, staggerDepth = 8} = this.props;
    const {slideCount} = this.context.slideController;
    return (
      <StaggeredMotion
        defaultStyles={range(staggerDepth).map(() => ({val: index}))}
        styles={prevInterpolatedStyles =>
          prevInterpolatedStyles.map((_, i) => {
            return i === 0
              ? {val: spring(index, {stiffness: 100, damping: 25, precision: 0.002})}
              : {val: spring(prevInterpolatedStyles[i - 1].val, staggeredSpring)};
          })
        }
      >
        {styles => {
          const {val: interpolatedIndex} = styles[0];
          const {params, children} = this.renderChildren(interpolatedIndex);
          return (
            <ProvideContext
              interpolatedIndex={interpolatedIndex}
              staggered={styles}
              params={params}
              slideCount={slideCount}
            >
              <Container>{children}</Container>
            </ProvideContext>
          );
        }}
      </StaggeredMotion>
    );
  }
}

export default Master;
