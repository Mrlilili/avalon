var webpack = require('webpack');

var path = require('path');
var fs = require('fs')
var json = require('./package.json')

var version =  json.version.split('.')
var v = (version.shift() + '.' + version.join('')).replace(/0+$/,"0")
var text = fs.readFileSync('./src/seed/lang.share.js', 'utf8')
text = text.replace(/version\s*\:\s*([^,]+)/, function (a, b) {
    return 'version: ' +JSON.stringify( v )
})
function heredoc(fn) {
                return fn.toString().replace(/^[^\/]+\/\*!?\s?/, '').
                     replace(/\*\/[^\/]+$/, '').trim().replace(/>\s*</g, '><')
            }
var feather = heredoc(function(){
    /*
修正 ms-click 在 ms-if 下失效的问题 #1652
修正 limitBy BUG
修正 节点对齐算法 BUG
优化 mediatorFactory
修正 data-for-rendered BUG
     */
})
fs.writeFileSync('./src/seed/lang.share.js', text, 'utf8')
var now = new Date
var snow = now.getFullYear()+'-'+ (now.getMonth()+1) +
        '-'+ now.getDate()+':'+ now.getHours()
module.exports = {
    entry: {
        avalon: './src/avalon', //我们开发时的入口文件
        'avalon.modern': './src/avalon.modern',
        'avalon.test': './src/avalon.test',
        'avalon.next': './src/avalon.next',
      //  'avalon.mobile': './src/avalon.mobile'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'avalon'
    }, //页面引用的文件
    plugins: [//
      new webpack.BannerPlugin('built in '+snow+' version '+ v+' by 司徒正美\n'+feather)
    ],
    module: {
    },
    eslint: {
        configFile: './eslintrc.json'
    },
    resolve: {
        extensions: ['.js', '', '.css'],
        alias: {
            avalon: './src/avalon'
        }
    }
}
