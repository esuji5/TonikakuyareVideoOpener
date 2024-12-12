document.addEventListener('DOMContentLoaded', () => {
  const openButton = document.getElementById('openButton');
  const settingsLink = document.getElementById('settingsLink');

  // Open video when button is clicked
  openButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'openVideo' });
    window.close();
  });

  // Open options page when settings link is clicked
  settingsLink.addEventListener('click', (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage();
  });

  // Update shortcut display
  chrome.commands.getAll((commands) => {
    const openVideoCommand = commands.find(cmd => cmd.name === 'open-video');
    if (openVideoCommand && openVideoCommand.shortcut) {
      document.getElementById('shortcutDisplay').textContent = openVideoCommand.shortcut;
    }
  });
});
