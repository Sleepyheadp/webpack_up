import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";
import App from "./App";
import A from "./views/A";
import B from "./views/B";
const root = ReactDOM.createRoot(document.getElementById("root"));
// ES6 babel测试
let num = 10;
new Promise((resolve, reject) => {}).then((res) => {});
const arrowFunc = () => {};

root.render(
	<div>
		<App />
		<A />
		<B />
		<div className="content">
			<div className="title">我是sass标题</div>
		</div>
	</div>
);
