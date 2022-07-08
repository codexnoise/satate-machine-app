import { createMachine, assign } from "xstate";
import { getCountries } from "../utils/api";

const fillCountries = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        id: "getContries",
        src: () => getCountries,
        onDone: {
          target: "success",
          actions: assign({
            countries: (context, event) => event.data,
          }),
        },
        onError: {
          target: "failure",
          actions: assign({
            error: "Error al Otener Paises",
          }),
        },
      },
    },
    success: {},
    failure: {
      on: {
        RETRY: { target: "loading" },
      },
    },
  },
};

const bookingMachine = createMachine(
  {
    id: "buy plane tickets",
    initial: "initial",
    context: {
      passengers: [],
      selectedCountry: "",
      countries: [],
      error: "",
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
        ...fillCountries,
      },
      tickets: {
        after: {
          3000: {
            target: "initial",
            actions: "cleanContext",
          },
        },
        on: {
          FINISH: "initial",
        },
      },
      passengers: {
        on: {
          DONE: {
            target: "tickets",
            cond: "moreThanOnePassenger",
          },
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
    guards: {
      moreThanOnePassenger: (context) => {
        return context.passengers.length > 0;
      },
    },
  }
);

export default bookingMachine;
