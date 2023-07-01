// Node内置的路径处理模块
const path = require("path");

// 导出自定义配置项
module.exports = {
	// 环境模式「生产环境：production   开发环境：development」
	mode: "production",
	// 打包入口「相对路径」
	entry: "./src/index.js",
	// 打包出口
	output: {
		// 生成的文件名. [hash]创建随机哈希值
		filename: "bundle.[hash].js",
		// 打包地址「绝对路径」
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-react"],
					},
				},
			},
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.svg$/,
				use: ["file-loader"],
			},
		],
	},
};
