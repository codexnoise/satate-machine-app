import { createMachine } from "xstate";

const bookMachine = createMachine({
  id: "buy plane ticktes",
  initial: "inicial",
  states: {
    inicial: {
      on: {
        START: "search",
      },
    },
    search: {
      on: {
        CONTINUE: "passengers",
        CANCEL: "inicial",
      },
    },
    passengers: {
      on: {
        DONE: "ticktes",
      },
    },
    ticktes: {
      on: {
        FINISH: "inicial",
      },
    },
  },
});

export default bookMachine;
