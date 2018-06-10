const path = require('path')
module.exports = {
   entry: path.join(__dirname, 'js', 'index.js'), // Our frontend will be inside the src folder
   output: {
      filename: 'build.js' // The final file will be created in dist/build.js
   }
}