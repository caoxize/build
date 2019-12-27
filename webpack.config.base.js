const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const { ENTRY, PROJECT_PATH, SOURCE_DIR } = require('./config')

const setHtmlWebpackPlugins = (entryFiles, chunk = 'vendors') => {
  return Object.entries(entryFiles).map(([pageName]) => {
    return new HtmlWebpackPlugin({
      template: path.join(PROJECT_PATH, `public/${pageName}.html`),
      filename: `${pageName}.html`,
      chunks: [pageName, chunk],
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        preserveLineBreaks: false,
        minifyCSS: true,
        minifyJS: true,
        removeComments: false
      }
    })
  })
}

const setPage = () => {
  if (ENTRY) {
    return {
      entry: ENTRY,
      htmlWebpackPlugins: setHtmlWebpackPlugins(ENTRY)
    }
  }

  const entry = {}
  const entryFiles = glob
    .sync(path.join(PROJECT_PATH, SOURCE_DIR, 'page', '*/index.js'))
    .concat(
      glob.sync(path.join(PROJECT_PATH, SOURCE_DIR, 'page', '*/index.jsx'))
    )

  entryFiles.forEach(entryFile => {
    const regexp = new RegExp(`${SOURCE_DIR}/page/(.*)/index.(js|jsx)`)
    const match = entryFile.match(regexp)
    const pageName = match && match[1]

    entry[pageName] = entryFile
  })

  return {
    entry,
    htmlWebpackPlugins: setHtmlWebpackPlugins(entry)
  }
}

const { entry, htmlWebpackPlugins } = setPage()

module.exports = {
  entry,
  plugins: [...htmlWebpackPlugins],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    modules: [path.resolve(__dirname, SOURCE_DIR), 'node_modules']
  }
}
