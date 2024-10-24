declare global {
  interface WindowEventMap {
    'graphql-error': CustomEvent;
  }
}

export {};
