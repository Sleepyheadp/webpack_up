// Node内置的路径处理模块
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 官方插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 社区提供的插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 官方插件 注意引入时不要加{}，否则会报错
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
// 导出自定义配置项
module.exports = {
	// 环境模式「生产环境：production   开发环境：development」
	// 获取环境变量 process.env.NODE_ENV
	// 「注意」开发模式下默认不会对css js文件进行压缩！！！
	mode: "production",
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
	// 优化项
	optimization: {
		// 设置压缩方式
		minimizer: [new CssMinimizerWebpackPlugin(), new TerserPlugin()],
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
		new MiniCssExtractPlugin({
			filename: "main.[hash:8].css", // 设置打包后的css文件名
		}),
	],
	devServer: {
		host: "127.0.0.1", // 域名
		port: 3000, // 端口号
		compress: true, // GZIP压缩
		open: true, // 自动打开浏览器
		hot: true, // 热更新
		// 跨域代理
		proxy: {
			"/jian": {
				target: "https://www.jianshu.com/asimov",
				changeOrigin: true,
				ws: true, // 支持websocket
				pathRewrite: { "^/jian": "" },
			},
			"/zhi": {
				target: "https://news-at.zhihu.com/api/4",
				changeOrigin: true,
				ws: true, // 支持websocket
				pathRewrite: { "^/zhi": "" },
			},
		},
	},
	// 模块跟插件的区别是什么？
	// 模块是用来处理各种文件的，比如css、图片、js等等
	// 插件是用来扩展webpack功能的
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				// exclude: /node_modules/,
				use: [
					"babel-loader",
					// 在babel.config.js中配置了，这里就不需要配置了
					// {
					//  	loader: "babel-loader",
					// 	options: {
					// 	presets: ["@babel/preset-env", "@babel/preset-react"],
					// },
				],
				// 设置编译时忽略的文件和制定编译目录
				include: path.resolve(__dirname, "./src"),
				exclude: /node_modules/,
			},
			{
				// 执行顺序是从下往上，从右往左（一行写法）
				test: /\.(css|less|sass)$/, // 正则表达式匹配css、less文件
				use: [
					MiniCssExtractPlugin.loader, // 把css抽离成单独的文件
					// "style-loader", // 把css插入到页面的style标签
					"css-loader", // 把css转换成js
					"postcss-loader", // 配合autoprefixer&browserslist自动添加css前缀「浏览器兼容 -webkit- -fox- -o- 」
					// {
					// 	loader: "postcss-loader",
					// 	options: {
					// 		postcssOptions: {
					// 			plugins: [require("autoprefixer")],
					// 		},
					// 	},
					// },
					"sass-loader", // 把sass转换成css
					"less-loader", // 把less转换成css
				],
			},
			{
				test: /\.svg$/,
				use: ["file-loader"],
			},
			{
				// 图片的处理
				test: /\.(png|jpe?g|gif)$/i,
				type: "javascript/auto", // webpack5需要加上这个配置
				use: [
					{
						// 把指定大小内的图片BASE64
						loader: "url-loader",
						options: {
							limit: 200 * 1024,
							esModule: false,
							// 编译后没有BASE64的图片，编译输出的路径和名称
							name: "images/[name].[hash].[ext]",
						},
					},
				],
			},
		],
	},
	// 设置打包的最大资源大小
	performance: {
		maxAssetSize: 100 * 1024 * 1024,
		maxEntrypointSize: 100 * 1024 * 1024,
	},
};
