const path = require('path');//Path库是NodeJS的path库，提供一些路径相关的操作https://nodejs.org/docs/latest/api/path.html
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/index.js'],//定义打包的入口文件路径
  output: { //定义打包的出口文件路径
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build')
  },
  module: {
	//配置在打包过程中如何识别module，处理module
    rules: [
      {
        test: /\.js$/,//文件扩展名匹配
        exclude: /(node_modules)/,
        use: { //使用的打包选项
          loader: 'babel-loader',//定义如何加载模块，以便转换为webpack能处理的模块
          options: { //配置loder的参数
            presets: ['es2015', 'react','stage-1'],
            plugins: [
              ["import", { libraryName: "antd", style: "css" }] 
            ]
          }
        }
      },
      {
        test: /\.css$/, // 配置css module的处理方式
        use: ['style-loader', 'css-loader'] // 如果loader没有参数，也可以直接写loader的名字即可
      },
      { test: /\.png/, loader: "url-loader?limit=10000&mimetype=image/png" },
    ]
  },
  plugins: [new UglifyJsPlugin({//做JS的压缩，see https://webpack.js.org/plugins/uglifyjs-webpack-plugin/?_sm_au_=iVVSk60bWFkDbpjQ for detail
    test: /\.js($|\?)/i,
    exclude: /\/excludes/,
    sourceMap: true
  })]
};