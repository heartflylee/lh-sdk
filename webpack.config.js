const path = require('path');

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'peonySdk.js'
  },
  devServer: {
    hot: true,
    filename: 'peonySdk.js',
    contentBase: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader'
          },
          { loader: 'sass-loader'}
        ]
      
      },
      {
        test: /\.(ts|tsx)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                [
                  '@babel/preset-react',
                  {
                    pragma: 'createElement'
                  }
                ]
              ]
            }
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.(js|jsx)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                ['@babel/plugin-transform-react-jsx',
                  {
                    pragma: 'createElement'
                  }                  
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx']
  }
}