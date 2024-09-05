const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search)
    const page = params.get('doc')

    // Since we only allow one file, just use the first one
    const filePath = `https://meos.meetix.nl/${page}`;

    const viewerEle = document.getElementById('viewer');
    viewerEle.innerHTML = ''; // destroy the old instance of PDF.js (if it exists)

    // Create an iframe that points to our PDF.js viewer, and tell PDF.js to open the file that was selected from the file picker.
    const iframe = document.createElement('iframe');
    iframe.src = `pdfjs/web/viewer.html?file=${filePath}`;

    // Add the iframe to our UI.
    viewerEle.appendChild(iframe);

    document.getElementById('minimize').addEventListener('click', (event) =>{
        ipcRenderer.send('asynchronous-message', 'action', 'min')
    })

    document.getElementById('maximize').addEventListener('click', (event) =>{
        ipcRenderer.send('asynchronous-message', 'action', 'max')
    })

    document.getElementById('restore').addEventListener('click', (event) =>{
        ipcRenderer.send('asynchronous-message', 'action', 'rest')
        document.getElementById('maximize').style.display = 'block';
        document.getElementById('restore').style.display = 'none';
    })

    document.getElementById('close').addEventListener('click', (event) =>{
        ipcRenderer.send('asynchronous-message', 'action', 'close')
    })

})

ipcRenderer.on('maximize', () => {
    document.getElementById('maximize').style.display = 'none';
    document.getElementById('restore').style.display = 'block';
})
ipcRenderer.on('unmaximize', () => {
    document.getElementById('maximize').style.display = 'block';
    document.getElementById('restore').style.display = 'none';
})