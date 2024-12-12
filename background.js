const VIDEO_URL = 'https://www.youtube.com/watch?v=JV3KOJ_Z4Vs';

// Handle keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === 'open-video') {
    openVideo();
  }
});

// Function to open video in new tab
function openVideo() {
  try {
    chrome.tabs.create({ url: VIDEO_URL });
    console.log('Video opened successfully');
  } catch (error) {
    console.error('Error opening video:', error);
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openVideo') {
    openVideo();
  }
});
