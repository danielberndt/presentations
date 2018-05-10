import React, {Component} from "react";
import g from "glamorous";

const Container = g.div({
  position: "absolute",
  bottom: "0.1vw",
  right: "0.1vw",
  padding: "0.5vw",
  opacity: 0.0,
  cursor: "pointer",
  fontSize: 0,
  zIndex: 5,
  transition: "300ms opacity ease",
  ":hover": {
    opacity: 1,
  },
});

export default class Fullscreen extends Component {
  handleToggleFullScreen = () => {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  };
  render() {
    return (
      <Container onClick={this.handleToggleFullScreen}>
        <g.Svg viewBox="0 0 512 512" css={{width: "1vw", height: "1vw", display: "block"}}>
          <path
            d="M73.143,329.143H0V512h182.857v-73.143H73.143V329.143z M0,182.857h73.143V73.143h109.715V0H0V182.857z M438.857,438.857 H329.143V512H512V329.143h-73.143V438.857z M329.143,0v73.143h109.715v109.715H512V0H329.143z"
            fill="#002c44"
          />
        </g.Svg>
      </Container>
    );
  }
}
