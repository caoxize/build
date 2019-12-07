const path = require('path')

const { SOURCE_DIR } = require('./config')

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    modules: [path.resolve(__dirname, SOURCE_DIR), 'node_modules']
  }
}
