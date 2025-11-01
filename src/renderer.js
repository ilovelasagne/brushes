document.getElementById('btn').addEventListener('click', () => {
    const info = document.getElementById('info');
    info.innerHTML = `
    <h3>System Info:</h3>
    <p>Platform: ${window.electronAPI.platform}</p>
    <p>Node: ${window.electronAPI.versions.node}</p>
    <p>Chrome: ${window.electronAPI.versions.chrome}</p>
    <p>Electron: ${window.electronAPI.versions.electron}</p>
    `;
});
