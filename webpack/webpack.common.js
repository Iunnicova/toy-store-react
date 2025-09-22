const HTMLWebpackPlugins = require('html-webpack-plugin'); // плагин для генерации HTML-файла с автоматическим подключением JS/CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // плагин для извлечения CSS в отдельные файлы (в prod)
const path = require('path'); // модуль для работы с путями
const webpack = require('webpack'); // подключаем webpack для использования встроенных плагинов (например, EnvironmentPlugin)

// Определяем режим сборки (production или development)
// process.env.NODE_ENV задаётся через скрипты в package.json
// production = true, если запущено с NODE_ENV=production
const production = process.env.NODE_ENV === 'production';

module.exports = {
  // Точка входа — основной файл приложения (TS/TSX/JS/JSX)
  entry: path.resolve(__dirname, '..', './src/index.tsx'),

  // Настройки выхода (куда складывать собранные файлы)
  output: {
    // Абсолютный путь до папки dist (сборка)
    path: path.resolve(__dirname, '..', './dist'),

    // Имя JS-файлов:
    // - в production: с хешем для кэш-бастинга
    // - в development: обычное имя без хеша
    filename: production
      ? 'static/scripts/[name].[contenthash].js'
      : 'static/scripts/[name].js',

    // Публичный путь для ресурсов (важно для роутинга SPA)
    publicPath: '/',

    // Очищает dist перед новой сборкой
    clean: true,
  },

  module: {
    rules: [
      // Лоадер для TypeScript / JavaScript файлов (включая JSX/TSX)
      {
        test: /\.[tj]sx?$/, // обрабатываем .ts, .tsx, .js, .jsx
        use: [
          {
            loader: 'ts-loader', // компилирует TypeScript в JavaScript
          },
        ],
        exclude: /node_modules/, // исключаем папку node_modules
      },

      // Лоадер для картинок (png, jpg, gif, webp)
      {
        test: /\.(png|jpg|gif|webp)$/,
        type: 'asset/resource', // переносит файлы в dist как есть
        generator: {
          filename: 'static/images/[hash][ext][query]', // структура папок для изображений
        },
      },

      // Лоадер для шрифтов
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource', // переносим шрифты в dist
        generator: {
          filename: 'static/fonts/[hash][ext][query]', // структура папок для шрифтов
        },
      },

      // Лоадер для SVG (двойная обработка):
      // 1) @svgr/webpack — позволяет импортировать SVG как React-компонент
      // 2) url-loader — позволяет использовать SVG как обычное изображение (data URL или файл)
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/, // применяем только если импортируется из JS/TS
        use: ['@svgr/webpack', 'url-loader'],
      },

      // Лоадеры для CSS / SCSS / SASS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // В production: извлекаем CSS в отдельный файл
          // В development: внедряем CSS прямо в HTML через <style>
          production ? MiniCssExtractPlugin.loader : 'style-loader',

          // css-loader — разбирает CSS и обрабатывает импорты
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local', // включаем CSS-модули
                localIdentName: '[name]__[local]__[hash:base64:5]', // шаблон имён классов
                namedExport: false, // отключаем именованный экспорт
                auto: /\.module\.\w+$/i, // CSS-модули только для *.module.css/scss/sass
              },
              importLoaders: 2, // сначала postcss-loader и sass-loader, потом css-loader
            },
          },

          // postcss-loader — постобработка CSS (автопрефиксы, оптимизация)
          'postcss-loader',

          // sass-loader — компиляция SCSS/SASS в CSS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true, // включаем карты для отладки
            },
          },
        ],
      },
    ],
  },

  // Какие расширения файлов можно импортировать без указания
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
  },

  plugins: [
    // Генерация HTML с подключением всех JS/CSS
    new HTMLWebpackPlugins({
      template: path.resolve(__dirname, '..', './public/index.html'), // путь до HTML-шаблона
    }),

    // Извлечение CSS в отдельный файл (актуально для production)
    new MiniCssExtractPlugin({
      filename: 'static/styles/[name].[contenthash].css', // имя итогового CSS-файла
    }),

    // EnvironmentPlugin — пробрасывает переменные окружения в код
    // Можно задать дефолтные значения, если переменные не переданы
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development', // значение по умолчанию
    }),
  ],
};
