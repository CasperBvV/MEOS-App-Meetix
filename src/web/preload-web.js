const { ipcRenderer } = require("electron");

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('pageChange');
    
  
})
  