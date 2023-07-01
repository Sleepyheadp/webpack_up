let num = 1;
const B = () => {
	console.log("B", num);
	num--;
	return <div>B</div>;
};
export default B;
