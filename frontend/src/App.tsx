import { Provider } from "react-redux";
import { AppRoute } from "./routes/AppRoute";
import { store } from "./store/store";

function App() {
  return (
    <Provider
      store={ store } 
    >
      <AppRoute />
    </Provider>
  );
}

export default App;
