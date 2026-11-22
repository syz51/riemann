import { render } from "@solidjs/web";
import { App } from "./App";
import "./styles.css";

const root = document.getElementById("root");
if (!root) throw new Error("index.html has no #root element");

render(() => <App />, root);
