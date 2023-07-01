const A = () => {
	let context = "我是A页面";
	console.log("context", context);
	fetch("/jian/subscriptions/recommended_collections")
		.then((response) => response.json())
		.then((value) => {
			console.log("简书", value);
		});
	fetch("/zhi/news/latest")
		.then((response) => response.json())
		.then((value) => {
			console.log("知乎", value);
		});
	return context;
};
export default A;
