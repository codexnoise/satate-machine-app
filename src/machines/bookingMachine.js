import { createMachine, assign } from "xstate";

const bookingMachine = createMachine(
  {
    id: "buy plane tickets",
    initial: "initial",
    context: {
      passengers: [],
      selectedCountry: "",
    },
    states: {
      initial: {
        on: {
          START: {
            target: "search",
            actions: "imprimirInicio",
          },
        },
      },
      search: {
        entry: "imprimirEntrada",
        exit: "imprimirSalida",
        on: {
          CONTINUE: {
            target: "passengers",
            actions: assign({
              selectedCountry: (context, event) => event.selectedCountry,
            }),
          },
          CANCEL: {
            target: "initial",
            actions: "cleanContext",
          },
        },
      },
      tickets: {
        on: {
          FINISH: "initial",
        },
      },
      passengers: {
        on: {
          DONE: "tickets",
          CANCEL: {
            target: "initial",
            actions: "cleanContext",
          },
          ADD: {
            target: "passengers",
            actions: assign((context, event) =>
              context.passengers.push(event.newPassenger)
            ),
          },
        },
      },
    },
  },
  {
    actions: {
      cleanContext: assign({
        selectedCountry: "",
        passengers: [],
      }),
      imprimirInicio: () => console.log("Imprimir inicio"),
      imprimirEntrada: () => console.log("Imprimir entrada a search"),
      imprimirSalida: () => console.log("Imprimir salida del search"),
    },
  }
);

export default bookingMachine;
