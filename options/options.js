document.addEventListener('DOMContentLoaded', () => {
  const openShortcutsButton = document.getElementById('openShortcuts');
  
  // Update current shortcut display
  chrome.commands.getAll((commands) => {
    const openVideoCommand = commands.find(cmd => cmd.name === 'open-video');
    if (openVideoCommand && openVideoCommand.shortcut) {
      document.getElementById('currentShortcut').textContent = openVideoCommand.shortcut;
    }
  });

  // Open Chrome's keyboard shortcuts page
  openShortcutsButton.addEventListener('click', () => {
    chrome.tabs.create({
      url: 'chrome://extensions/shortcuts'
    });
  });
});
