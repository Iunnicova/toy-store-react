const path = require("path"); // для преобразования относительного пути в абсолютный
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin"); // плагин для HMR React-компонентов

module.exports = {
  mode: "development", // режим разработки
  devtool: "eval-source-map", // быстрые source maps для отладки
  devServer: {
    static: path.resolve(__dirname, "./dist"), // папка, которую раздаёт devServer
    // compress: true, // включить gzip-сжатие (необязательно в dev)
    port: 8080, // порт для localhost
    open: true, // автоматически открывать браузер
    hot: true, // включаем HMR
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // плагин для "живого" обновления React-компонентов
  ],
};
