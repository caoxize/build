# build

webpack 打包工具

\$ npm install build

package.json:
配置入口
ENTRY: {}, // 默认会自动匹配
CSS_MODULES: "local" // "local", "global", 如不需css modules，不添加此配置 or false
SOURCE_DIR: "src"
DEV_HOST: "0.0.0.0"
DEV_PORT: "8080"

自动检测entry目录：
如果不配置ENTRY，会自动匹配 /{SOURCE_DIR}\/page\/*\/index.(js|jsx)/ 作为入口文件