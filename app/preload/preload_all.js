const { ipcRenderer } = require('electron')

// Do something according to a request of your mainview
ipcRenderer.on('request', () => {
    ipcRenderer.sendToHost(getScripts())
})

ipcRenderer.on('alert-something', (event, data) => {
    console.log(data)
    document.body.insertAdjacentHTML('afterbegin', '<div></div>')
})

ipcRenderer.on('change-text-element', (event, data) => {
    // the document references to the document of the <webview>
    document.getElementById(data.id).innerHTML = data.text
})

/**
 * Simple function to return the source path of all the scripts in the document
 * of the <webview>
 *
 *@returns {String}
 **/
const getScripts = () => {
    var items = []
    for (var i = 0; i < document.scripts.length; i++) {
        items.push(document.scripts[i].src)
    }
    return JSON.stringify(items)
}
