import { createMachine } from "xstate";

const bookMachine = createMachine({
  id: "buy plane ticktes",
  initial: "initial",
  states: {
    initial: {
      on: {
        START: "search",
      },
    },
    search: {
      on: {
        CONTINUE: "passengers",
        CANCEL: "initial",
      },
    },
    passengers: {
      on: {
        DONE: "ticktes",
      },
    },
    ticktes: {
      on: {
        FINISH: "initial",
      },
    },
  },
});

export default bookMachine;
