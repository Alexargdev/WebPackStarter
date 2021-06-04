const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports={
    
    module:{
        rules:[
            {
                test:/\.m?js$/,
                exclude:/node_module/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            },
            {
                test:/\.html$/,
                use:{
                    loader:'html-loader',
                    options:{
                        sources:false,
                    }
                }
            },
            {
                test:/\.css$/,
                exclude:/style.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test:/\.(png|jpe?g|gif)$/i,
                use:[
                    {
                        loader:'file-loader'
                    }
                ]
            }
        ]
    },

    optimization:{
        minimize:true,
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    },
    output:{
        clean:true,
        filename:'main.[contenthash].js'
    },

    plugins:[
        new HtmlWebPackPlugin({
            template:"./src/index.html"
        }),

        new MiniCssExtractPlugin({
            filename:'[name].[fullhash].css',
            ignoreOrder:false
        }),

        new CopyPlugin({
            patterns: [
              { from: "src/assets/", to: "assets/" },
            ],
          }),
    ]

}