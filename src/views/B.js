import React from "react";
import "./index.less";
import girlUrl from '../assets/images/girl.jpg'
import boyUrl from '../assets/images/boy.jpg'
const B = () => {
	return (
		<div>
			<div className="content">我是B页面</div>
			{/*为什么这样引用图片不显示呢？*/}
			<img src="../assets/images/girl.jpg" alt=""/>
			{/*
				js中处理静态图片，需要先基于ES6Module规范导入进来「这样webpack才会对次图片进行打包」
			*/}
			<img src={boyUrl} alt=""/>
			<img src={girlUrl} alt=""/>
		</div>
	);
};
export default B;
