'use strict'
/*
 *  Refresh Modern Browser
 *
*/
const Refresh = function () {
    this.WebView = document.getElementById('refresh-webview')
    this.AddressBar = document.getElementById('refresh-addressbar')
}

Refresh.prototype = {
    go: function (url) {
        this.WebView.loadURL(url)
    },
    open: function (url) {
        return false
    },
    newTab: function (url) {
        return false
    },
    capture: function () {
        const filename = path.join(__dirname, 'screenshot.png')
        this.WebView.capturePage({
            height: 1200,
            width: 1200,
            x: 0,
            y: 0
        }).then((img) => {
            try {
                fs.writeFileSync(filename, img.toPNG())
                shell.openItem(filename)
             } catch (error) {
                throw Error('Error' + error.message)
             }
        }).catch((err) => {
            console.log(err)
        })
    },
    changeUA: function (ua) {
        ua = ua || 'Mozilla/5.0 (Macintosh 10.15.2; x64; rv:39.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.1025.133 Safari/537.36'
        var osVer = (os.platform() === 'darwin' ? 'Macintosh' : (os.platform() === 'win32' ? 'Windows NT' : 'Linux'))
        var uas = 'Mozilla/5.0 (' + osVer + ' ' + os.release() + '; ' + os.platform() + '; ' + os.arch() + '; rv:' + process.versions.chrome.slice(0, 4) + ') AppleWebKit/537.36 (KHTML, like Gecko) Chrome/' + process.versions.chrome + ' Refresh/' + require('electron').remote.app.getVersion() + ' Safari/537.36'
        return this.WebView.setUserAgent(uas)
    },
    changeColor: function (e) {
        const hexToRGBA = (hex, opacity) => {
            return 'rgba(' + (hex = hex.replace('#', '')).match(new RegExp('(.{' + hex.length / 3 + '})', 'g')).map(function (l) { return parseInt(hex.length % 2 ? l + l : l, 16) }).concat(opacity || 1).join(',') + ')'
        }
        e.themeColor = (e.themeColor === null ? '#FFFFFF' : e.themeColor)
        document.getElementsByClassName('refresh-webview::before')[0].style = 'background-color: ' + hexToRGBA(e.themeColor)
    }
}

try {
    module.exports = exports = Refresh
} catch {
    console.log('Not working. Error: Exports not avaliable.')
}
