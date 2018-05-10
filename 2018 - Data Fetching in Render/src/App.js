import React from "react";
import g from "glamorous";
import Master from "./comps/Master";
import Controller from "./comps/Controller";
import Slide from "./comps/Slide";
import FullScreen from "./comps/FullScreen";
import KeyboardController from "./comps/KeyboardController";
import createHistoryNavigator from "./lib/navigator";
import SlideStepper, {Step, RawStep, ScrollStep, SlideCarousel} from "./comps/SlideStepper";
import Arrow from "./Arrow";
import Code, {codeStyle} from "./Code";
import PointerController from "./comps/PointerController";

const navigator = createHistoryNavigator();

const centerCss = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  textAlign: "center",
};

const cols = ["#D25641", "#E7926A", "#F7C294", "#80D4F1", "#3EC0F1"];

const StaticContainer = g.div({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  pointerEvents: "none",
});

const TopLine = g.div({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: "0.5vh",
});

const BottomContainer = g.div({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
});

const parts = [
  {slidesCount: 2, label: "Intro"},
  {slidesCount: 3, label: "Styles"},
  {slidesCount: 3, label: "Data Fetching"},
  {slidesCount: 15, label: "Inline Fetching"},
  {slidesCount: 4, label: "Outro"},
];

const NavItem = g.div(({slidesCount, col}) => ({
  flex: `0px ${slidesCount} 1`,
  backgroundColor: col,
}));

const NavItemContent = g.div(({active}) => ({
  margin: "0.8vh 2vw",
  fontSize: "0.8vw",
  color: `rgba(255,255,255,${active ? 0.95 : 0.5})`,
  fontWeight: "bold",
  textTransform: "uppercase",
  transitionProperty: "color",
}));

const ArrowContainer = g.div({
  position: "absolute",
  left: 0,
  bottom: 0,
  top: 0,
});

const Statics = () => {
  let sum = 0;
  return (
    <Slide.Data>
      {({params, interpolatedIndex, slideCount}) => (
        <StaticContainer>
          <TopLine
            style={{
              backgroundColor: params.themeCol,
              transform: `translate3d(0, ${-100 * (1 - params.showUi)}%,0)`,
              opacity: params.showUi,
            }}
          />
          <BottomContainer
            style={{
              transform: `translate3d(0, ${100 * (1 - params.showUi)}%,0)`,
              opacity: params.showUi,
            }}
          >
            {parts.map(({slidesCount, label}, i) => {
              sum += slidesCount;
              return (
                <NavItem key={label} slidesCount={slidesCount} col={cols[i]}>
                  <NavItemContent
                    active={
                      sum - slidesCount + 0.5 < interpolatedIndex && interpolatedIndex < sum + 0.5
                    }
                  >
                    {label}
                  </NavItemContent>
                </NavItem>
              );
            })}
            <ArrowContainer
              css={{width: `${100 / (slideCount - 1)}vw`}}
              style={{
                transform: `translate3d(${100 / (slideCount - 1) * (interpolatedIndex - 1)}vw,0,0)`,
              }}
            >
              <Arrow pointTo="top" size="1vh" style={{borderBottomColor: params.themeCol}} />
            </ArrowContainer>
          </BottomContainer>
        </StaticContainer>
      )}
    </Slide.Data>
  );
};

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

const FlexSlide = g(Slide)({display: "flex", flexDirection: "column", color: "#796c69"});
const Title = g.h1({
  fontSize: "6vh",
  padding: "5vh 5vw 0",
  color: cols[0],
  lineHeight: 1.1,
  " small": {
    fontSize: "3vh",
    opacity: 0.8,
    fontWeight: "normal",
  },
});
const SlideContent = g.div({
  padding: "2.5vh 5vw 5vh",
  margin: "auto 0",
  fontSize: "4vh",
  lineHeight: 1.3,
});

const KSlide = ({children, title, contentCss, outerCss, ...rest}) => (
  <FlexSlide {...rest}>
    <Slide.Data>
      {({offset, params, getStaggered}) => (
        <React.Fragment>
          <Title
            style={{
              opacity: 1 - Math.min(1, Math.abs(offset)),
            }}
          >
            {title}
          </Title>
          <SlideContent
            style={{
              opacity: 1 - Math.min(1, Math.abs(getStaggered(2))),
              transform: `translate3d(${getStaggered(2) * -20}vw,0,0)`,
            }}
            css={outerCss}
          >
            <g.Div position="relative" css={contentCss}>
              {children}
            </g.Div>
          </SlideContent>
        </React.Fragment>
      )}
    </Slide.Data>
  </FlexSlide>
);

KSlide.$isSlide = true;

const Container = g.div({width: "100vw", height: "100vh"});
const MainTitle = g.div({
  color: "rgba(255,255,255,0.8)",
  fontSize: "3vw",
  " b": {fontSize: "5vw", color: "#fff"},
});

const Img = g.img({
  maxWidth: "100%",
  boxShadow: "0 0 2vw -0.5vw rgba(0,0,0,0.8)",
  display: "block",
});

const InlineCode = g.code(codeStyle, {display: "inline-block", color: "#0f79a0"});

const Scale = g.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "4vw",
  bottom: 0,
  background: "linear-gradient(to bottom, #e7926a 0%,#f7c294 33%,#80d4f1 66%,#3ec0f1 100%)",
});

const ScaleDesc = g.div({
  marginBottom: "auto",
  fontSize: "2.5vw",
});

const OuterScaleArrow = g.div({position: "absolute"});
const scaleArrowShared = {
  transform: "rotate(270deg)",
  width: "80vh",
  position: "relative",
  fontSize: "3vh",
  lineHeight: 1,
  display: "flex",
  alignItems: "center",
};
const ScaleArrowUpInner = g.div(scaleArrowShared, {
  transformOrigin: "top right",
  justifyContent: "flex-end",
  left: "-5vw",
});
const ScaleArrowDownInner = g.div(scaleArrowShared, {transformOrigin: "bottom left", left: "3vw"});

const ScaleArrowUp = ({children, ...rest}) => (
  <OuterScaleArrow css={{top: 0, right: 0}} {...rest}>
    <ScaleArrowUpInner>
      <Arrow pointTo="right" size="1.5vh" color={cols[0]} css={{marginLeft: "1vh"}} />
      {children}
    </ScaleArrowUpInner>
  </OuterScaleArrow>
);

const ScaleArrowDown = ({children, ...rest}) => (
  <OuterScaleArrow css={{bottom: 0, left: "100%"}} {...rest}>
    <ScaleArrowDownInner>
      <Arrow pointTo="left" size="1.5vh" color={cols[4]} css={{marginRight: "1vh"}} />
      {children}
    </ScaleArrowDownInner>
  </OuterScaleArrow>
);

const OuterCarousel = g(SlideCarousel)({
  overflow: "hidden",
  maxHeight: "100%",
  position: "relative",
  padding: "5vh 1vw",
  "::after": {
    content: "''",
    position: "absolute",
    pointerEvents: "none",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    boxShadow: "inset 0 -5vh 3vh -2vh #fff, inset 0 5vh 3vh -2vh #fff",
  },
});

const WithTopArrow = ({children, ...rest}) => (
  <g.Div position="relative" paddingTop="2vw" {...rest}>
    <Arrow pointTo="bottom" size="2vw" color={cols[2]} css={{top: 0}} />
    {children}
  </g.Div>
);

class App extends React.Component {
  render() {
    return (
      <Container>
        <Controller navigator={navigator}>
          {({index, prev, next}) => (
            <KeyboardController prev={prev} next={next}>
              <PointerController prev={prev} next={next} />
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
                    <MainTitle>
                      <div>
                        <b>Embracing the Render Method</b>
                      </div>
                      <div>An unconventional Approach to Data Fetching</div>
                    </MainTitle>
                  </Slide.Tile>
                </IntroSlide>

                <KSlide title="About myself" masterParams={{themeCol: cols[0]}}>
                  <SlideStepper>
                    <Step>I'm Daniel</Step>
                    <Step>Full-time web-dev since 2012, working with React since v0.12</Step>
                    <Step>
                      Current project:{" "}
                      <b>
                        <a href="https://www.codecks.io">codecks.io</a>
                      </b>
                      <Img
                        src={require("./images/cdx-screen.png")}
                        alt="codecks screen"
                        css={{maxHeight: "50vh", marginTop: "2vh"}}
                      />
                    </Step>
                  </SlideStepper>
                </KSlide>

                <KSlide title="About this Talk" masterParams={{themeCol: cols[0]}}>
                  <SlideStepper>
                    <Step>
                      Talking with Karl Horky – co-organiser at last React Open Source event:
                    </Step>
                    <Step css={{marginLeft: "5vw"}}>"So, have you been working with GraphQL?"</Step>
                    <Step css={{marginLeft: "5vw"}}>"Not really, but ..."</Step>
                    <Step css={{marginLeft: "5vw"}}>
                      "You definitely should give a talk about this!"
                    </Step>
                  </SlideStepper>
                </KSlide>

                <KSlide
                  title={
                    <React.Fragment>
                      <small>Let's start with something else:</small>
                      <br />Components and CSS - A little History
                    </React.Fragment>
                  }
                  masterParams={{themeCol: cols[1]}}
                >
                  <SlideStepper>
                    <Step>
                      In the beginning was <InlineCode>require("my-component.css")</InlineCode>
                    </Step>
                    <Step>
                      Avoiding name collisions via namespacing:<br />
                      <b>OOCSS</b> vs <b>SMACSS</b> vs <b>BEM</b> vs ...
                    </Step>
                    <Step>
                      Syntactic vs semantic vs atomic class names{" "}
                      <InlineCode>"huge-red-button"</InlineCode> vs{" "}
                      <InlineCode>"cta-button"</InlineCode> vs{" "}
                      <InlineCode>"white bg-red pa2"</InlineCode>
                    </Step>
                    <Step>Naming is hard</Step>
                  </SlideStepper>
                </KSlide>

                <KSlide
                  title={
                    <React.Fragment>
                      <small>Vjeux infamous Talk in 2014:</small>
                      <br />Css-in-js to Solve these Issues
                    </React.Fragment>
                  }
                  masterParams={{themeCol: cols[1]}}
                  contentCss={centerCss}
                >
                  <Img
                    src={require("./images/css-in-js-by-vjeux.png")}
                    alt="issues with css at scale"
                    css={{maxHeight: "60vh"}}
                  />
                </KSlide>

                <KSlide
                  title="The Spectrum of Styling Solutions"
                  masterParams={{themeCol: cols[1]}}
                  outerCss={{
                    flex: "auto",
                    paddingTop: "8vh",
                    paddingBottom: "10vh",
                    paddingRight: "10vw",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  contentCss={{
                    display: "flex",
                    flex: "auto",
                    paddingLeft: "6vw",
                    paddingRight: "6vw",
                    flexDirection: "column",
                  }}
                >
                  <SlideStepper>
                    <RawStep comp={Scale} />
                    <RawStep comp={ScaleDesc} css={{order: 1}}>
                      Global styles <InlineCode>css</InlineCode> <InlineCode>less</InlineCode>{" "}
                      <InlineCode>sass</InlineCode>
                    </RawStep>
                    <RawStep comp={ScaleDesc} css={{order: 5, marginBottom: 0}}>
                      Inline styles <InlineCode>jsx-styles</InlineCode>
                    </RawStep>
                    <RawStep comp={ScaleDesc} css={{order: 2}}>
                      Colocated styles in extra file<br />
                      <InlineCode>css modules</InlineCode> <InlineCode>css-blocks</InlineCode>
                    </RawStep>
                    <RawStep comp={ScaleDesc} css={{order: 3}}>
                      Colocated styles in same file<br />
                      <InlineCode>aphrodite</InlineCode> <InlineCode>styled-components</InlineCode>
                    </RawStep>
                    <RawStep comp={ScaleDesc} css={{order: 4}}>
                      <InlineCode>glamorous</InlineCode> <InlineCode>emotion</InlineCode>
                    </RawStep>
                    <RawStep comp={ScaleArrowUp} fromBottom>
                      Easier compilation-time optimisations
                    </RawStep>
                    <RawStep comp={ScaleArrowDown} fromTop>
                      Less "moving" parts
                    </RawStep>
                  </SlideStepper>
                </KSlide>

                <KSlide title="Let's talk about Data-Fetching" masterParams={{themeCol: cols[2]}}>
                  <SlideStepper>
                    <Step>
                      Classic model: <b>REST</b>-Api
                    </Step>
                    <Step>
                      Disconnect between frontend and backend. Not just across files, oftentimes
                      across team-boundaries
                    </Step>
                    <Step>
                      Again – Naming is hard:<br />
                      <InlineCode>POST</InlineCode> vs <InlineCode>PUT</InlineCode> vs{" "}
                      <InlineCode>PATCH</InlineCode>
                      <br />
                      <InlineCode>/users/123/notifications</InlineCode> vs{" "}
                      <InlineCode>/notifications?userId=123</InlineCode>
                    </Step>
                  </SlideStepper>
                </KSlide>
                <KSlide title="GraphQL to the Rescue" masterParams={{themeCol: cols[2]}}>
                  <SlideStepper>
                    <RawStep>
                      Let's collocate the data to fetch with the component that renders the data
                    </RawStep>
                    <RawStep comp={Code} css={{fontSize: "0.7em"}}>{`
const GET_USER = gql\`
{
  user(id: $id) {
    firstName
    lastName
  }
}\`
`}</RawStep>
                    <RawStep comp={Code} css={{fontSize: "0.7em"}}>{`
const Profile = ({id}) => (
  <Query query={GET_USER} variables={{id}}>
    {({loading, data: {user}}) => !loading && (
        <div>
          Hello, {user.firstName} {user.lastName}!
        </div>
      )}
  </Query>
)
                  `}</RawStep>
                  </SlideStepper>
                </KSlide>
                <KSlide
                  title="Re-using the Spectrum from before"
                  masterParams={{themeCol: cols[2]}}
                  outerCss={{
                    flex: "auto",
                    paddingTop: "12vh",
                    paddingBottom: "14vh",
                    paddingRight: "10vw",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  contentCss={{
                    display: "flex",
                    flex: "auto",
                    paddingLeft: "6vw",
                    paddingRight: "6vw",
                    flexDirection: "column",
                  }}
                >
                  <SlideStepper>
                    <RawStep comp={Scale} />
                    <RawStep comp={ScaleDesc}>
                      Separation between backend and frontend<br />
                      <InlineCode>REST Api</InlineCode>
                    </RawStep>
                    <RawStep comp={ScaleDesc}>
                      Colocated data-definition in same file<br />
                      <InlineCode>GraphQL</InlineCode>
                    </RawStep>
                    <RawStep comp={ScaleDesc} css={{marginBottom: 0}}>
                      Inline data-definition<br />
                      <InlineCode>???</InlineCode>
                    </RawStep>
                    <RawStep comp={ScaleArrowUp} fromBottom>
                      Easier compilation-time optimisations
                    </RawStep>
                    <RawStep comp={ScaleArrowDown} fromTop>
                      Less "moving" parts
                    </RawStep>
                  </SlideStepper>
                </KSlide>

                <KSlide title="Inline fetching" masterParams={{themeCol: cols[3]}}>
                  <SlideStepper>
                    <RawStep>Wouldn't it be nice to just do something like this?</RawStep>
                    <RawStep comp={Code}>
                      {`
const Profile = ({id}) => {
  const user = getInstance("User", id);
  return (
    <div>
      Hello, {user.firstName} {user.lastName}!
    </div>
  )
}
`}
                    </RawStep>
                  </SlideStepper>
                </KSlide>
                <KSlide title="Inline Fetching Example 2" masterParams={{themeCol: cols[3]}}>
                  <SlideStepper>
                    <RawStep comp={Code} css={{fontSize: "0.75em"}}>
                      {`
                  const Profile = ({id}) => {
  const user = getInstance("User", id);
  return (
    <div>
      Hello, <Avatar user={user}/>
      <div>
        {user.posts.map(post => <Post post={post}/>)}
      </div>
    </div>
  )
}
`}
                    </RawStep>
                    <RawStep comp={Code} css={{fontSize: "0.75em"}}>
                      {`
const Avatar = ({user}) => (
  <img src={user.profileImage.url} alt={user.firstName}/>
)}
`}
                    </RawStep>
                    <RawStep comp={Code} css={{fontSize: "0.75em"}}>{`
const Post = ({post}) => (
  <div>{post.title} - {post.comments.length} comments</h1>
)
                  `}</RawStep>
                  </SlideStepper>
                </KSlide>
                <KSlide title="Why is this appealing?" masterParams={{themeCol: cols[3]}}>
                  <SlideStepper>
                    <Step>No separation between defining and using a specific data shape</Step>
                    <Step>Easy to compose</Step>
                    <Step>Easy to move code around or delete it</Step>
                  </SlideStepper>
                </KSlide>
                <KSlide title="How could this be implemented?" masterParams={{themeCol: cols[3]}}>
                  <SlideStepper>
                    <Step>Compilation step?</Step>
                    <Step css={{marginLeft: "5vw"}}>
                      This is quite hard. Probably requires advanced type system. Worth
                      investigating though.
                    </Step>
                    <Step>
                      Instead: Model Schema & <InlineCode>Object.defineProperty</InlineCode>
                    </Step>
                  </SlideStepper>
                </KSlide>
                <KSlide title="Model Schema?" masterParams={{themeCol: cols[3]}}>
                  <SlideStepper>
                    <RawStep>
                      When defining GraphQL models, we specify the fields and relationships already
                    </RawStep>
                    <RawStep comp={Code} type="gql" css={{fontSize: "0.8em"}}>{`
type User {
  firstName: String
  lastName: String
  profileImage: File
  posts: [Post]
}

type File {
  url: String
}

type Post {
  title: String
  comments: [Comment]
}
`}</RawStep>
                  </SlideStepper>
                </KSlide>
                <KSlide title="Object.defineProperty?" masterParams={{themeCol: cols[3]}}>
                  <SlideStepper>
                    <RawStep>Introduced with ES5 (IE9 support!)</RawStep>
                    <RawStep comp={Code} css={{fontSize: "0.8em"}}>{`
const getUser = (id) => {
  const user = {}

  Object.defineProperty(user, 'firstName', {
    writable: false,
    get() {
      return "Hans"
    }
  })

  return user;
}
`}</RawStep>
                    <RawStep comp={Code} css={{fontSize: "0.8em"}}>{`
// user.firstName --> "Hans"
                    `}</RawStep>
                  </SlideStepper>
                </KSlide>
                <KSlide title="More realistic Example" masterParams={{themeCol: cols[3]}}>
                  <SlideStepper>
                    <RawStep>Assuming we have a client-side cache for loaded models</RawStep>
                    <RawStep comp={Code} css={{fontSize: "0.8em"}}>{`
...
get() {
  if (cache.has("User", id, "firstName")) {
    return cache.get("User", id, "firstName")
  } else {
    queueRequest("User", id, "firstName")
    return "loading"
  }
}
...
`}</RawStep>
                    <RawStep comp={Code} css={{fontSize: "0.8em"}}>{`
// user.firstName --> "loading" + queuing request for "firstName"
                    `}</RawStep>
                  </SlideStepper>
                </KSlide>
                <KSlide
                  title="Object.defineProperty for Relations"
                  masterParams={{themeCol: cols[3]}}
                >
                  <SlideStepper>
                    <RawStep>If we assume that the cache is pre-filled:</RawStep>
                    <RawStep comp={Code} css={{fontSize: "0.8em"}}>{`
const getUser = (id) => {
  const user = {}

  Object.defineProperty(user, 'profileImage', {
    writable: false,
    get() {
      const fileId = cache.get("User", id, "profileImage");
      return getInstance("File", fileId);
    }
  })

  return user;
}
`}</RawStep>
                  </SlideStepper>
                </KSlide>
                <KSlide
                  title="More realistic Code for Relations"
                  masterParams={{themeCol: cols[3]}}
                >
                  <Code css={{fontSize: "0.8em"}}>
                    {`
...
get() {
  if (cache.has("User", id, "profileImage"))
    const fileId = cache.get("User", id, "profileImage");
    return getInstance("File", fileId);
  } else {
    queueRequest("User", id, "profileImage");
    const nestedId = \`user(id: \${id}).profileImage\`;
    return getInstance("File", nestedId)
  }
}
...
`}
                  </Code>
                </KSlide>
                <KSlide title="Combining them" masterParams={{themeCol: cols[3]}}>
                  <SlideStepper>
                    <RawStep>
                      Based on the schema, we are able to automatically generate
                      instance-constructors:
                    </RawStep>
                    <RawStep comp={Code} css={{fontSize: "0.5em"}}>{`
const schema = {
  User: {
    fields = {
      "firstName": {type: "String"},
      "lastName": {type: "String"}
    },
    relations = {
      profileImage: {type: "File", isList: false},
      posts: {type: "Post", isList: true}
    }
  }
}`}</RawStep>
                    <RawStep comp={Code} css={{fontSize: "0.5em"}}>{`
const getInstance = (type, id) => {
  const instance = {};
  Object.entries(schema[type].fields).forEach(([fieldName, info]) => {
    Object.defineProperty(user, fieldName, {...});
  });

  Object.entries(schema[type].relations).forEach(([relationName, info]) => {
    Object.defineProperty(user, relationName, {...});
  });
  return instance;
}
`}</RawStep>
                  </SlideStepper>
                </KSlide>
                <KSlide
                  title="Let's play it through"
                  masterParams={{themeCol: cols[3]}}
                  outerCss={{
                    flex: "auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                  contentCss={{
                    display: "flex",
                    flexDirection: "column",
                    flex: "auto",
                  }}
                >
                  <OuterCarousel>
                    <ScrollStep>
                      {(style, ref) => (
                        <Code innerRef={ref} style={style}>{`
render() {
  const user = getInstance("User", this.props.userId)
  return <span>{user.firstName} - {user.profileImage.url}</span>
}
                    `}</Code>
                      )}
                    </ScrollStep>
                    <ScrollStep>
                      {(style, ref) => (
                        <WithTopArrow innerRef={ref} style={style}>
                          <Code>{`
queueRequest("User", 5, "firstName");
queueRequest("User", 5, "profileImage");
queueRequest("File", "user(id: 5).profileImage", "url");

// renders <span>loading - loading</span>
                    `}</Code>
                        </WithTopArrow>
                      )}
                    </ScrollStep>
                    <ScrollStep>
                      {(style, ref) => (
                        <WithTopArrow innerRef={ref} style={style}>
                          <Code type="gql">{`
{
  user(id: 5) {
    firstName
    profileImage {
      url
    }
  }
}
                    `}</Code>
                        </WithTopArrow>
                      )}
                    </ScrollStep>
                    <ScrollStep>
                      {(style, ref) => (
                        <WithTopArrow innerRef={ref} style={style}>
                          <g.Div textAlign="center" margin="2vh 0 3vh">
                            Fetch from server & Fill client cache
                          </g.Div>
                        </WithTopArrow>
                      )}
                    </ScrollStep>
                    <ScrollStep>
                      {(style, ref) => (
                        <WithTopArrow innerRef={ref} style={style}>
                          <g.Div textAlign="center" margin="2vh 0 3vh">
                            Call <InlineCode>forceUpdate</InlineCode> at root of app, to rerender
                            the whole component tree
                          </g.Div>
                        </WithTopArrow>
                      )}
                    </ScrollStep>
                    <ScrollStep>
                      {(style, ref) => (
                        <WithTopArrow innerRef={ref} style={style}>
                          <Code>{`
render() {
  const user = getInstance("User", this.props.userId)
  return <span>{user.firstName} - {user.profileImage.url}</span>
}

// renders <span>Hans - https://example.com/1.png</span>
                    `}</Code>
                        </WithTopArrow>
                      )}
                    </ScrollStep>
                  </OuterCarousel>
                </KSlide>
                <KSlide
                  title={
                    <React.Fragment>
                      <small>Advanced Patterns:</small>
                      <br />Load Data only when you need it
                    </React.Fragment>
                  }
                  masterParams={{themeCol: cols[3]}}
                >
                  <Code>{`
const Post = ({post}) => (
  <div>
    <Tooltip onHover={() => \`created by \${post.author.firstName}\`}>
      {post.title}
    </Tooltip>
  </div>
)
                    `}</Code>
                </KSlide>
                <KSlide
                  title={
                    <React.Fragment>
                      <small>Advanced Patterns:</small>
                      <br />Check if Data is loaded
                    </React.Fragment>
                  }
                  masterParams={{themeCol: cols[3]}}
                >
                  <Code>{`
const Post = ({post}) => (
  <Spinner isActive={!post.$meta.inCache("title", "content")}>
    <h1>{post.title}</h1>
    <div>{post.content}</div>
  </Spinner>
)
                `}</Code>
                </KSlide>
                <KSlide
                  title={
                    <React.Fragment>
                      <small>Advanced Patterns:</small>
                      <br />Conditionally load Content in more than one Pass
                    </React.Fragment>
                  }
                  masterParams={{themeCol: cols[3]}}
                >
                  <SlideStepper>
                    <RawStep comp={Code}>{`
const User = ({user}) => (
  <div>
    <h1>{user.firstName}</h1>
    {user.role === "admin" && <span>{user.profileImage.url}</span>}
  </div>
)`}</RawStep>
                    <RawStep comp={Code}>{`
// First Pass
queueRequest("User", 5, "firstName");
queueRequest("User", 5, "role");
`}</RawStep>
                    <RawStep comp={Code}>{`
// Second Pass (if role === "admin")
queueRequest("User", 5, "profileImage");
queueRequest("File", "user(id: 5).profileImage" , "url");
`}</RawStep>
                  </SlideStepper>
                </KSlide>
                <KSlide
                  masterParams={{themeCol: cols[3]}}
                  title={
                    <React.Fragment>
                      <small>Advanced Patterns:</small>
                      <br />Using helpers
                    </React.Fragment>
                  }
                >
                  <Code>{`
const Posts = ({user}) => (
  <div>
    <div>{user.firstName} made {user.$meta.count("posts")} posts</div>
    <h2>Last Post</h2>
    <div>{user.$meta.last("posts").title}</div>
  </div>
)
                    `}</Code>
                </KSlide>
                <KSlide
                  title={
                    <React.Fragment>
                      <small>Outlook into the future:</small>
                      <br />Suspense
                    </React.Fragment>
                  }
                  masterParams={{themeCol: cols[4]}}
                >
                  <Code>{`
const requestQueue = [];

const DataProvider = ({children}) => {
  const content = children();
  if (requestQueue.length === 0) {
    return content
  } else {
    const promise = fetchData(requestQueue);
    throw promise;
  }
}
                    `}</Code>
                </KSlide>

                <KSlide title="Caveats" masterParams={{themeCol: cols[4]}}>
                  <SlideStepper>
                    <Step>
                      When seeing <InlineCode>user.profileImage.url</InlineCode> you don't really
                      know whether it's been loaded yet or not.<br />Always call something{" "}
                      <InlineCode>user.profileImage.$meta.inCache("url")</InlineCode> to be sure
                    </Step>
                    <Step>
                      On first render, it'll render all components and fill them with the default
                      values (e.g. "loading"). Could look awkward, can be benefitial for perceived
                      performance though
                    </Step>
                    <Step>Hard to apply caching since queries are generated on the fly</Step>
                    <Step>... no available open source solution</Step>
                  </SlideStepper>
                </KSlide>
                <KSlide title="What's next" masterParams={{themeCol: cols[4]}}>
                  <SlideStepper>
                    <Step>
                      I won't be able to responsibly open source my code. Too big a scope, too
                      little time.
                    </Step>
                    <Step>
                      Feel inspired to play around with the idea. I'm happy to help with e.g.
                      mutations & optimistic updates, real-time updates, immutability of instances
                    </Step>
                    <Step>
                      Take a look at an implementation on either{" "}
                      <b>
                        <a href="https://www.codecks.io">www.codecks.io</a>
                      </b>{" "}
                      or{" "}
                      <b>
                        <a href="https://piq.codeus.net">piq.codeus.net</a>
                      </b>
                    </Step>
                  </SlideStepper>
                </KSlide>
                <KSlide
                  title="Thanks!"
                  masterParams={{themeCol: cols[4]}}
                  contentCss={{fontSize: "4vh"}}
                >
                  Let's stay in touch!<br />
                  <a href="https://twitter.com/D40B">
                    twitter.com/<b>D40B</b>
                  </a>
                </KSlide>

                <Statics />
              </Master>
            </KeyboardController>
          )}
        </Controller>
      </Container>
    );
  }
}

export default App;
