/* @jsx h */
import { h, render, Fragment } from "preact";
import { useState } from "preact/hooks"
import { stream, map, scan } from "flyd";
import merge from "mergerino";

const update = stream();

const state = {
  counter: 0,
};

const Actions = (update) => {
  return {
    inc: () =>
      update({
        counter: (c) => c + 1
      }),
  };
};

let actions = Actions(update);

let states = scan(merge, state, update);

let App = ({states, actions}) => {
  const [state, setState] = useState(states())
  states.map(setState)
  return (
    <Fragment>
      <h2>Meiosis / Preact starter</h2>
      <hr />
      <div>
        <h3>Counter : {state.counter} </h3>
        <button onclick = {actions.inc}>INC</button>
      </div>
    </Fragment>
  );
};

render(<App states = {states} actions = {actions} />, document.body);




