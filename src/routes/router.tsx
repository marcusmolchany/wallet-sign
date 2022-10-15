import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Error } from "./Error";
import { Index } from "./Index";
import { Root } from "./Root";
import { Verify } from "./Verify";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error />}>
      <Route errorElement={<Error />}>
        <Route index element={<Index />} />
        <Route path="verify" element={<Verify />} />
      </Route>
    </Route>
  )
);
