/* @jsx createElement */
import { createElement, render, Component } from "./react.js";

class MyTitle extends Component {
  render() {
    return <p>my title</p>;
  }
}

function Title() {
  return (
    <div>
      <h2>Hi~</h2>
      <p>잘 동작하나?</p>
      <MyTitle />
    </div>
  );
}

render(<Title />, document.getElementById("root"));
