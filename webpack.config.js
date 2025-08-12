const path = require('path'); // для того чтобы превратить относительный путь в абсолютный, мы будем использовать пакет path
const HTMLWebpackPlugins = require('html-webpack-plugin'); // плагин для генерации index.html в dist с автоматическим подключением скриптов/стилей
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // плагин для извлечения CSS в отдельный файл

module.exports = {
  entry: path.resolve(__dirname, './src/index.ts'), // точка входа в наше приложение содержит абсолютный путь к index.ts
  output: {
    path: path.resolve(__dirname, './dist'), // путь, куда будет собираться наш проект
    filename: 'main.js', // имя нашего бандла
    clean: true, // очистка папки перед сборкой 
  },

  // Нужно помочь вебпаку научиться работать с JSX- и TSX-файлами, для этого используем ts-loader
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/, // обрабатываем .ts, .tsx, .js, .jsx файлы
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /node_modules/,
      },
      // Подключение лоадеров для CSS/SCSS
      {
        test: /\.(sa|sc|c)ss$/, // обрабатываем .sass, .scss, .css файлы
        use: [
          MiniCssExtractPlugin.loader, // извлекаем CSS в отдельный файл
          'style-loader', // добавляем CSS в DOM (вместе с MiniCssExtract обычно используется для HMR)
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]__[hash:base64:5]', // шаблон для имён CSS-классов
                auto: /\.module\.\w+$/i, // включаем CSS-модули только для файлов с .module.css|scss
                namedExport: false,
                /**
               * localIdentName — шаблон для генерации имён классов.
               * Доступные плейсхолдеры:
               * [name]   — имя файла без расширения (styles)
               * [folder] — имя папки, в которой файл (components)
               * [path]   — путь к файлу относительно корня (src/components)
               * [file]   — путь + имя файла (src/components/styles.css)
               * [ext]    — расширение файла (.css, .scss)
               * [hash]   — хеш для уникальности (например, [hash:base64:5])
               * [local]  — оригинальное имя класса в CSS
               */
              },
              importLoaders: 2, // сначала обрабатываем через postcss-loader и sass-loader, потом css-loader
            },
          },
          'postcss-loader', // для автопрефиксов и других PostCSS-плагинов
          {
            loader: 'sass-loader', // компилируем SCSS/SASS в CSS
            options: {
              sourceMap: true, // включаем карты для удобной отладки
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'], // расширения, которые можно импортировать без указания
  },

  plugins: [
    new HTMLWebpackPlugins({
      template: path.resolve(__dirname, 'public/index.html'), // шаблон HTML
    }),
    new MiniCssExtractPlugin({
      filename: 'static/styles/index.css', // итоговый файл стилей
    }),
  ],
};
