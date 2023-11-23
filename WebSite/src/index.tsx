import { Provider } from "react-redux";
import { configureStore } from "./store";
import { createRoot } from "react-dom/client";
import { App } from "./components/App";

//createRoot(document.getElementById("root")!).render(<App />);

createRoot(document.getElementById("root")!).render(
  <Provider store={configureStore()}>
    <App />
  </Provider>
);

/*createRoot(<Provider store={configureStore()}>
    <App />
  </Provider>, document.getElementById('root'));*/

/* const container = document.getElementById('root');
  const root = createRoot(container!); // createRoot(container!) if you use TypeScript
  root.render(<App />);*/
