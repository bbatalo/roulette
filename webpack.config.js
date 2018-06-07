const path = require('path')
module.exports = {
   entry: path.join(__dirname, 'src/js', 'index.js'), // Our frontend will be inside the src folder
   output: {
      path: path.join(__dirname, 'dist'),
      filename: 'build.js' // The final file will be created in dist/build.js
   }
}