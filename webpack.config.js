// Node内置的路径处理模块
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 导出自定义配置项
module.exports = {
	// 环境模式「生产环境：production   开发环境：development」
	// 获取环境变量 process.env.NODE_ENV
	mode: "development",
	// 打包入口「相对路径」 并设置多入口
	entry: {
		index: "./src/index.js",
	},
	// 打包出口 多出口
	output: {
		// 生成的文件名. [hash]创建随机哈希值
		// filename: "main.js", // 默认是main.js文件
		// filename: "bundle.[hash:8].js",
		filename: "[name].[hash:8].js", // 将入口文件名作为打包后的文件名 index login
		// 打包地址「绝对路径」
		path: path.resolve(__dirname, "./dist"),
	},
	// 插件
	plugins: [
		// 有多少个入口就需要多少个HtmlWebpackPlugin 「循环遍历」
		new HtmlWebpackPlugin({
			// 模板文件
			template: "./public/index.html",
			// 生成的文件名
			filename: "index.html",
			// 压缩
			// minify: true,
			minify: {
				// 删除注释
				removeComments: true,
				// 删除空格
				collapseWhitespace: true,
			},
		}),
		new CleanWebpackPlugin(),
	],
	devServer: {
		host: "127.0.0.1", // 域名
		port: 3000, // 端口号
		compress: true, // GZIP压缩
		open: true, // 自动打开浏览器
		hot: true, // 热更新
		// 跨域代理
		proxy: {
			// 示例
			// "/jian": {
			// 	target: "https://www.jianshu.com/asimov",
			// 	changeOrigin: true,
			// 	ws: true,
			// 	pathRewrite: { "^/jian": "" }
			// },
			// "/zhi": {
			// 	target: "https://news-at.zhihu.com/api/4",
			// 	changeOrigin: true,
			// 	ws: true,
			// 	pathRewrite: { "^/zhi": "" }
			// }
		},
	},
	// 模块跟插件的区别是什么？
	// 模块是用来处理各种文件的，比如css、图片、js等等
	// 插件是用来扩展webpack功能的
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
