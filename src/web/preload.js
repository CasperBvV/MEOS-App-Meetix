const { ipcRenderer } = require("electron");
window.addEventListener('DOMContentLoaded', () => {

    // Check for window buttons
    document.getElementById('minimize').addEventListener('click', (event) =>{
        ipcRenderer.send('asynchronous-message', 'action', 'min')
    })

    document.getElementById('maximize').addEventListener('click', (event) =>{
        ipcRenderer.send('asynchronous-message', 'action', 'max')
        // document.getElementById('maximize').style.display = 'none';
        // document.getElementById('restore').style.display = 'block';
    })

    document.getElementById('restore').addEventListener('click', (event) =>{
        ipcRenderer.send('asynchronous-message', 'action', 'rest')
        // document.getElementById('maximize').style.display = 'block';
        // document.getElementById('restore').style.display = 'none';
    })

    document.getElementById('close').addEventListener('click', (event) =>{
        ipcRenderer.send('asynchronous-message', 'action', 'close')
    })

    document.getElementById('back').addEventListener('click', (event) =>{
        ipcRenderer.send('back')
    })
    document.getElementById('fwrd').addEventListener('click', (event) =>{
        ipcRenderer.send('fwrd')
    })
  
})

ipcRenderer.on('update', (event, back, fwrd) => {
    console.log('update')

    const backClassList = document.getElementById('back').classList
    if (back) {
        backClassList.add('enabled')
    } else {
        backClassList.remove('enabled')
    }
    
    const fwrdClassList = document.getElementById('fwrd').classList
    if (fwrd) {
        fwrdClassList.add('enabled')
    } else {
        fwrdClassList.remove('enabled')
    }

})


ipcRenderer.on('maximize', () => {
    document.getElementById('maximize').style.display = 'none';
    document.getElementById('restore').style.display = 'block';
})
ipcRenderer.on('unmaximize', () => {
    document.getElementById('maximize').style.display = 'block';
    document.getElementById('restore').style.display = 'none';
})