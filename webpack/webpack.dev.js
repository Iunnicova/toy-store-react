const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'eval-source-map',

  devServer: {
    // Правильно: обслуживаем папку public (в корне проекта)
    static: {
      directory: path.resolve(__dirname, '..', 'public'), // ../public — потому что конфиг лежит в webpack/
      publicPath: '/', // файлы будут доступны с корня ( /image/... )
      watch: true, // следим за изменениями в public
    },

    port: 8080,
    host: 'localhost',
    open: true,
    hot: true,
    historyApiFallback: true, // обязательно для react-router
    client: {
      overlay: true, // показывать ошибки компиляции на экране
    },
  },

  plugins: [new ReactRefreshWebpackPlugin()],
};
