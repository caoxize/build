const path = require('path')
const fs = require('fs')

const PROJECT_PATH = process.cwd()

const pkg = JSON.parse(
  fs.readFileSync(path.resolve(PROJECT_PATH, 'package.json'), 'utf-8')
)

const { name, ENTRY, SOURCE_DIR = 'src' } = pkg

module.exports = {
  NAME: name.toLowerCase(),
  ENTRY,
  PROJECT_PATH,
  SOURCE_DIR
}
