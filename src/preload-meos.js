const { ipcRenderer } = require("electron");

window.addEventListener('DOMContentLoaded', () => {
    ipcRenderer.send('pageChange');

    // Navmenu styling
    const nav = document.getElementById('sidebar-wrapper');
    nav.style.position = 'fixed';
    nav.style.height = '100%';
    nav.style.overflowY = 'auto';
    nav.style.overflowX = 'hidden';

    const page = document.getElementById('page-content-wrapper');
    page.style.marginLeft = '15rem';
    page.style.minHeight = 'calc(100vh - 58.5px)';


    const hiddenMenuItems = [
        'wetboek strafrecht',
        'voertuig inname',
        'rijbewijs inname',
    ]

    list = document.getElementsByTagName("a");
    for (let i = 0; i < list.length; i++) {
        // get last child
        const check = list[i].lastChild
        if (hiddenMenuItems.includes(check.data.toLowerCase())) {
            list[i].style.display = 'none';
        }
    };
    
    
  
})
  