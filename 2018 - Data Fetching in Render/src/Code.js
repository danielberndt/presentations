import React from "react";
import g from "glamorous";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-graphql";

export const codeStyle = {
  fontFamily: "Fira Mono, monospace",
  fontSize: "0.85em",
  backgroundColor: "#d3eff9",
  color: "#2a5463",
  padding: "0.1vw 1vw",
  boxShadow: "0 0 1.5vw -0.3vw rgba(0,0,0,0.3)",
};

const Pre = g.pre(codeStyle, {
  " .token.comment, .token.prolog, .token.doctype, .token.cdata": {
    color: "slategray",
  },
  " .token.punctuation": {
    color: "#688b98",
  },
  " .namespace": {
    opacity: 0.7,
  },
  " .token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol, .token.deleted": {
    color: "#D25641",
  },
  " .token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted": {
    color: "#0f79a0",
  },
  " .token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string": {
    color: "#9a6e3a",
  },
  " .token.atrule, .token.attr-value, .token.keyword": {
    color: "#07a",
  },
  " .token.function, .token.class-name": {
    color: "#E7926A",
  },
  " .token.regex, .token.important, .token.variable": {
    color: "#e90",
  },
});

const defsByType = {
  js: [Prism.languages.jsx, "jsx"],
  gql: [Prism.languages.graphql, "graphql"],
};

export default class Code extends React.PureComponent {
  createMarkup() {
    const {children, type = "js"} = this.props;
    return {__html: Prism.highlight(...[children.trim(), ...(defsByType[type] || defsByType.js)])};
  }

  render() {
    const {css, className, style} = this.props;
    return (
      <Pre css={css} className={className} style={style}>
        <code dangerouslySetInnerHTML={this.createMarkup()} />
      </Pre>
    );
  }
}
