import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";
import App from "./App";
import A from "./views/A";
import B from "./views/B";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<>
		<App />
		<A />
		<B />
	</>
);
