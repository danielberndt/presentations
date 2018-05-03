import React from "react";
import g from "glamorous";
import Master from "./comps/Master";
import Controller from "./comps/Controller";
import Slide from "./comps/Slide";
import FullScreen from "./comps/FullScreen";
import KeyboardController from "./comps/KeyboardController";
import createHistoryNavigator from "./lib/navigator";

const navigator = createHistoryNavigator();

const centerCss = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
};

const StaticContainer = g.div({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: "none",
});

const cols = ["#D25641", "#E7926A", "#F7C294", "#80D4F1", "#3EC0F1"];
const parts = [
  {slidesCount: 2, label: "Intro"},
  {slidesCount: 3, label: "Styles"},
  {slidesCount: 3, label: "Rest vs GraphQl"},
  {slidesCount: 14, label: "Inline-Fetching"},
  {slidesCount: 3, label: "Outro"},
];

const NavItem = g.div(({slidesCount, col}) => ({
  flex: `0px ${slidesCount} 1`,
  backgroundColor: col,
}));

const NavItemContent = g.div({
  margin: "0.8vh 2vw",
  fontSize: "0.8vw",
  color: "rgba(255,255,255,0.5)",
  textTransform: "uppercase",
});

const Arrow = g.div({
  position: "absolute",
  bottom: "100%",
  width: 0,
  height: 0,
  borderColor: "transparent",
  borderStyle: "solid",
  left: "50%",
  marginLeft: "-1vh",
  borderTopWidth: 0,
  borderWidth: "1vh",
});

const ArrowContainer = g.div({
  position: "absolute",
  left: 0,
  bottom: 0,
  top: 0,
});

const Statics = ({nextSlide}) => (
  <Slide.Data>
    {({params, interpolatedIndex, slideCount}) => (
      <StaticContainer>
        <g.Div
          position="absolute"
          bottom={0}
          left="0"
          right="0"
          display="flex"
          style={{
            transform: `translate3d(0, ${100 * (1 - params.showUi)}%,0)`,
          }}
        >
          {parts.map(({slidesCount, label}, i) => (
            <NavItem key={label} slidesCount={slidesCount} col={cols[i]}>
              <NavItemContent>{label}</NavItemContent>
            </NavItem>
          ))}
          <ArrowContainer
            css={{width: `${100 / (slideCount - 1)}vw`}}
            style={{
              transform: `translate3d(${100 / (slideCount - 1) * (interpolatedIndex - 1)}vw,0,0)`,
            }}
          >
            <Arrow style={{borderBottomColor: params.themeCol}} />
          </ArrowContainer>
        </g.Div>
      </StaticContainer>
    )}
  </Slide.Data>
);

const StaticBgs = () => (
  <Slide.Data>
    {({params, interpolatedIndex, slideCount}) => (
      <g.Div
        style={{backgroundColor: params.bg}}
        position="absolute"
        left={0}
        right={0}
        top={0}
        bottom={0}
      />
    )}
  </Slide.Data>
);

const IntroSlide = g(Slide)({});
IntroSlide.$isSlide = true;

const FlexSlide = g(Slide)({display: "flex", flexDirection: "column"});

const KSlide = ({children, title, bgCss, ...rest}) => (
  <FlexSlide {...rest}>
    <Slide.Data>
      {({offset}) => (
        <g.H1
          color="#002c44"
          fontSize="4.5vh"
          paddingTop="5.5vh"
          paddingLeft="5vw"
          style={{opacity: 1 - Math.min(1, Math.abs(offset))}}
        >
          {title}
        </g.H1>
      )}
    </Slide.Data>
    <g.Div position="relative" flex="auto" css={bgCss}>
      {children}
    </g.Div>
  </FlexSlide>
);
KSlide.$isSlide = true;

const Container = g.div({width: "100vw", height: "100vh"});
class App extends React.Component {
  render() {
    return (
      <Container>
        <Controller navigator={navigator}>
          {(index, setIndex) => (
            <KeyboardController index={index} setIndex={setIndex}>
              <Master
                index={index}
                defaultParams={{
                  bg: "#fff",
                  showUi: 1,
                  themeCol: cols[0],
                }}
              >
                <StaticBgs />
                <FullScreen />
                <IntroSlide masterParams={{bg: cols[0], showUi: 0}}>
                  <Slide.Tile
                    t={0}
                    l={0}
                    order={1}
                    css={{
                      ...centerCss,
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    Hi
                  </Slide.Tile>
                </IntroSlide>

                <KSlide title="About myself" masterParams={{themeCol: cols[0]}}>
                  I'm Daniel
                </KSlide>

                <KSlide title="About this talk" masterParams={{themeCol: cols[0]}}>
                  Last event conversation with karl about whether I'm using GraphQL – Not quite.
                </KSlide>

                <KSlide
                  title="How the paradigm shift towards components affect the way we work with styles"
                  masterParams={{themeCol: cols[1]}}
                >
                  <ul>
                    <li>- first: `require("styles.css")`</li>
                    <li>- it's all about finding nice names. And naming is hard.</li>
                    <li>
                      - syntactic/semantic/atomic "huge-red-button" vs "cta-button" vs "white bg-red
                      pa2"
                    </li>
                    <li>- avoiding name collisions via namespacing: OOCSS vs SMACSS vs BEM</li>
                    <li>
                      - find good names for boxes that serve just pure layouting purposes:
                      ".inner-element-container"
                    </li>
                  </ul>
                </KSlide>

                <KSlide title="css-in-js to solve the issues" masterParams={{themeCol: cols[1]}}>
                  [include slide from vjeux]
                </KSlide>

                <KSlide title="There's a scale!" masterParams={{themeCol: cols[1]}}>
                  <pre>
                    1. Global styles 2. automatically namespaced style in extra file (css modules,
                    css-blocks) 3. colocated styles in same file (aphrodite/styled-components)
                    (glamorous/emotion) 4. inline styles (jsx-styles) two arrows: to left: easier
                    compilation-time optimisations to right: less "moving" parts
                  </pre>
                </KSlide>

                <KSlide title="What about data-fetching?" masterParams={{themeCol: cols[2]}}>
                  2
                </KSlide>
                <KSlide title="GraphQL to the rescue" masterParams={{themeCol: cols[2]}}>
                  2
                </KSlide>
                <KSlide title="Let's look at the scale" masterParams={{themeCol: cols[2]}}>
                  2
                </KSlide>

                <KSlide title="Inline fetching" masterParams={{themeCol: cols[3]}}>
                  3
                </KSlide>
                <KSlide title="Inline Fetching Example 2" masterParams={{themeCol: cols[3]}}>
                  3
                </KSlide>
                <KSlide title="Why is this appealing?" masterParams={{themeCol: cols[3]}}>
                  3
                </KSlide>
                <KSlide title="How could this be implemented?" masterParams={{themeCol: cols[3]}}>
                  3
                </KSlide>
                <KSlide title="Model Schema?" masterParams={{themeCol: cols[3]}}>
                  3
                </KSlide>
                <KSlide title="Object.defineProperty?" masterParams={{themeCol: cols[3]}}>
                  3
                </KSlide>
                <KSlide
                  title="Object.defineProperty for relations"
                  masterParams={{themeCol: cols[3]}}
                >
                  3
                </KSlide>
                <KSlide title="Combining them" masterParams={{themeCol: cols[3]}}>
                  3
                </KSlide>
                <KSlide
                  title="How does it work within the render method?"
                  masterParams={{themeCol: cols[3]}}
                >
                  3
                </KSlide>
                <KSlide
                  title="Advanced patterns: load data whenever you need it"
                  masterParams={{themeCol: cols[3]}}
                >
                  3
                </KSlide>
                <KSlide
                  title="Advanced patterns: Check if data is loaded"
                  masterParams={{themeCol: cols[3]}}
                >
                  3
                </KSlide>
                <KSlide
                  title="Advanced patterns: Conditionally load content in more than one pass"
                  masterParams={{themeCol: cols[3]}}
                >
                  3
                </KSlide>
                <KSlide title="Advanced patterns: Using helpers" masterParams={{themeCol: cols[3]}}>
                  3
                </KSlide>
                <KSlide
                  title="Outlook into the future: Suspense"
                  masterParams={{themeCol: cols[3]}}
                >
                  3
                </KSlide>

                <KSlide title="Caveats" masterParams={{themeCol: cols[4]}}>
                  4
                </KSlide>
                <KSlide title="What's next" masterParams={{themeCol: cols[4]}}>
                  4
                </KSlide>
                <KSlide title="Thanks!" masterParams={{themeCol: cols[4]}}>
                  4
                </KSlide>

                <Statics nextSlide={() => setIndex(index + 1)} />
              </Master>
            </KeyboardController>
          )}
        </Controller>
      </Container>
    );
  }
}

export default App;
