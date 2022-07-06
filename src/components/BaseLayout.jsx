import React from "react";
import { useMachine } from "@xstate/react";
import bookMachine from "../machines/bookingMachine";

export const BaseLayout = () => {
  const [state, send] = useMachine(bookMachine);
  console.log("STATE MACHINE APP", state);

  console.log("matches", state.matches("initial"));
  console.log("matches", state.matches("tickets"));
  console.log("can", state.can("finish"));

  return <div>Hello Fucking World !!!</div>;
};
