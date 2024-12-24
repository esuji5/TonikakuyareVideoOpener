chrome.action.onClicked.addListener(async (tab) => {
  // chrome:// や edge:// などの特殊なURLをチェック
  if (!tab.url.startsWith("chrome://") && !tab.url.startsWith("edge://")) {
    try {
      const response = await chrome.tabs.sendMessage(tab.id, {
        action: "extractImages",
      });
    } catch (error) {
      console.log("Error sending message:", error);
      // content scriptが存在しない場合は、スクリプトを注入して再試行
      await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ["content.js"],
      });
      // 少し待ってから再度メッセージを送信
      setTimeout(() => {
        chrome.tabs.sendMessage(tab.id, {
          action: "extractImages",
        });
      }, 100);
    }
  } else {
    console.log("Cannot execute on this page");
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "collectImages") {
    chrome.storage.local.set({savedImages: message.imageUrls}, () => {
      chrome.tabs.create({url: "popup.html"});
    });
  }
});
