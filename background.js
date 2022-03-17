/*
 *This is the 'main' javascript class
 *It will run the alarms, storage, and price check scripts
 */

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason == "install") {
    chrome.tabs.create({ url: chrome.runtime.getURL("pages/installed.html") });
  } else if ((details.reason = "update")) {
    chrome.tabs.create({ url: chrome.runtime.getURL("pages/update.html") });
  }
});

chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
  console.log(
    sender.tab ? "from content script " + sender.tab.url : "from the extension"
  );

  if (response.greeting === "checkPrice") {
    checkPrice();
    sendResponse({ farewell: "goodbye" });
  }
});

chrome.runtime.onMessageExternal.addListener(
  (request, sender, sendResponse) => {
    console.log(
      sender.tab
        ? "from content script " + sender.tab.url
        : "from the extension"
    );

    if (request.test) {
      sendResponse({ success: true, token: request.token });
      localStorage.setItem("token", request.token); 
    }
  }
);
