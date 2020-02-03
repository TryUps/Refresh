const { electron, remote, shell } = require('electron')
window.$ = window.jQuery = require('jquery')
const path = require('path')
const fs = require('fs')
const os = require('os')
const Refresh = require('../class/refresh.class')
const refresh = new Refresh('0.0.1-dev.1')

document.addEventListener('DOMContentLoaded', (e) => {
    const WebView = document.getElementById('refresh-webview')
    let AddressBar = document.getElementById('refresh-addressbar')
    AddressBar.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            AddressBar = AddressBar.value
            AddressBar = (AddressBar.slice(0, 5) !== 'https' && AddressBar.slice(0, 4) !== 'http' && AddressBar.slice(0, 3) !== 'www' ? 'http://www.' + AddressBar : AddressBar)
            refresh.go(AddressBar)
        } else {
            return false
        }
    })
    const domReady = () => {
        AddressBar.value = ''
        AddressBar.placeholder = WebView.getTitle()
    }
    const startLoad = () => {
        AddressBar.value = ''
        AddressBar.placeholder = 'Loading...'
    }
    const stopLoad = () => {
        AddressBar.placeholder = WebView.getTitle()
        const css = '#blackPOOL{position:relative;float:left;padding-top:30px}'
        WebView.insertCSS(css)
        WebView.send('alert-something', true)
    }
    const changeColor = () => {

    }

    WebView.addEventListener('dom-ready', domReady)
    WebView.addEventListener('did-start-loading', startLoad)
    WebView.addEventListener('did-stop-loading', stopLoad)
    WebView.addEventListener('did-change-theme-color', changeColor)
})
window.onload = () => {
    return false
}
