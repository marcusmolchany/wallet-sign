import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import "./App.css";

// polyfill buffer
window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  return <RouterProvider router={router} />;
}

export default App;
