const path = require('path')

module.exports = function (env) {
  const minimize = env && ('minimize' in env)

  const config = {
    mode: 'production',
    entry: {
      TransformationMatrix: path.resolve(__dirname, 'src', 'index.js')
      // TransformationMatrix: [ 'core-js/stable', path.resolve(__dirname, 'src', 'index.js') ]
    },
    output: {
      path: path.join(__dirname, 'build-umd'),
      filename: `transformation-matrix${minimize ? '.min' : ''}.js`,
      library: 'TransformationMatrix',
      libraryTarget: 'umd'
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.js']
    },
    module: {
      rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }]
    },
    optimization: {
      minimize: Boolean(minimize)
    }
  }
  return config
}
