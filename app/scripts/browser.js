
window.onload = () => {
    const webview = document.getElementById('refresh-webview')
    const indicator = document.getElementById('refresh-address-bar')
    const loadstart = () => {
        indicator.placeholder = 'loading...'
    }
    const loadstop = () => {
        indicator.placeholder = webview.getTitle()
    }
    const domReady = () => {
        return webview.openDevTools()
    }
    indicator.addEventListener("keydown", (e) => {
        if (e.keyCode === 13) {
            return webview.loadURL(indicator.value)
        }else{
            return false
        }
    })
    webview.addEventListener('dom-ready', domReady)
    webview.addEventListener('did-start-loading', loadstart)
    webview.addEventListener('did-stop-loading', loadstop)
}
