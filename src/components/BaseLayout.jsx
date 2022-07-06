import React from "react";
import { useMachine } from "@xstate/react";
import bookMachine from "../machines/bookingMachine";

export const BaseLayout = () => {
  const [state, send] = useMachine(bookMachine);
  console.log("STATE MACHINE APP", state);

  return <div>Hello Fucking World !!!</div>;
};
