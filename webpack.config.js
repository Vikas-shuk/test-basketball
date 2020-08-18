const HtmlWebPackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader:"babel-loader",
                } 
              },
            {
                test: /\.html$/,
                use: [
                    {
                        loader:"html-loader",
                        options:{minimize:true}
                    }
                ]
            }, 
            {
                // Now we apply rule for images
                test: /\.(png|jpe?g|gif|svg|ttf|TTF|mp3|ico|wav)$/,
                use: [
                  {
                    // Using file-loader for these files
                    loader: "file-loader",
        
                  },
                ],
              },
               {
                
                test: /\.scss$/,
                use: [
                     "style-loader",
                     "css-loader",
                     "sass-loader"
                  
                ]
              }


        ]
    },
    plugins:[
        new HtmlWebPackPlugin({
           template: "./src/index.html",
           filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            
            filename:"[name].css",
            chunkfilename:"[id].css"
         })

    ]
}