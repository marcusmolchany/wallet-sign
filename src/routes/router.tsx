import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Error } from "./Error";
import { Root } from "./Root";
import { Sign } from "./Sign";
import { Verify } from "./Verify";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error />}>
      <Route errorElement={<Error />}>
        <Route index element={<Sign />} />
        <Route path="verify" element={<Verify />} />
      </Route>
    </Route>
  )
);
