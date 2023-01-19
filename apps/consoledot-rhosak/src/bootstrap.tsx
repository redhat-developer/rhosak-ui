import { render } from "react-dom";
import AppEntry from "./AppEntry";

const root = document.getElementById("root");

render(<AppEntry />, root, () => root?.setAttribute("data-ouia-safe", "true"));
