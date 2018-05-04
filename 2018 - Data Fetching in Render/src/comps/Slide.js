import React from "react";
import PropTypes from "prop-types";
import g from "glamorous";

const Container = g.div({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
});

class Slide extends React.Component {
  static $isSlide = true;

  static childContextTypes = {
    slide: PropTypes.object,
  };

  getChildContext() {
    const {offset, index, isActiveSlide} = this.props;
    return {
      slide: {offset, index, isActiveSlide},
    };
  }

  render() {
    const {offset, children, className, style} = this.props;
    return (
      <Container
        className={className}
        style={{transform: `translate3d(${offset * 100}%,0,0)`, ...style}}
      >
        {children}
      </Container>
    );
  }
}

class Data extends React.Component {
  static contextTypes = {
    master: PropTypes.object,
    slide: PropTypes.object,
  };

  getStaggered = idx => {
    const {
      master: {staggered},
      slide: {index},
    } = this.context;
    return staggered[idx].val - index;
  };

  render() {
    const {master, slide} = this.context;
    return this.props.children({...master, ...slide, getStaggered: this.getStaggered});
  }
}

const TileBox = g.div({position: "absolute"});

class Tile extends React.Component {
  static contextTypes = {
    master: PropTypes.object,
    slide: PropTypes.object,
  };

  getStaggered = idx => {
    const {
      master: {staggered},
      slide: {index},
    } = this.context;
    return staggered[idx].val - index;
  };

  render() {
    const {
      master: {staggered},
      slide: {index},
    } = this.context;
    const {
      order,
      t,
      l,
      r,
      b,
      className,
      style,
      children,
      fromTop,
      fromBottom,
      fromLeft,
      css,
      zIndex,
    } = this.props;
    const val = staggered[order].val - index;
    const opacity = 1 - Math.min(1, Math.abs(val));
    let transform;
    if (fromTop) transform = `translate3d(0,${val * 100}vh,0)`;
    else if (fromBottom) transform = `translate3d(0,${val * -100}vh,0)`;
    else if (fromLeft) transform = `translate3d(${val * 100}vw,0,0)`;
    else transform = `translate3d(${val * -100}vw,0,0)`;
    return (
      <TileBox
        className={className}
        style={{transform, opacity: opacity ** 3, ...style}}
        css={{
          top: t && `${t}vh`,
          left: l && `${l}vw`,
          bottom: b && `${b}vh`,
          right: r && `${r}vw`,
          zIndex,
          ...css,
        }}
      >
        {children}
      </TileBox>
    );
  }
}

Slide.Data = Data;
Slide.Tile = Tile;
export default Slide;
