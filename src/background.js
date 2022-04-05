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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(
    sender.tab ? "from content script " + sender.tab.url : "from the extension"
  );

  if (request.greeting == "addToken") {
    chrome.storage.local.set({token: request.token}, () => {
        sendResponse({farewell: "token added"})
      })
  }

  if (request.greeting === "addProduct") {
    chrome.storage.local.get('token', async (result) => {
      const token = result.token
     
      try {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", token);
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  
        var urlencoded = new URLSearchParams();
        urlencoded.append("url", request.url);
        urlencoded.append("productName", request.name);
        urlencoded.append("productPrice", request.price);
        urlencoded.append("img", request.image);
  
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: urlencoded,
          redirect: "follow",
        };
  
        let res = await fetch(
          "https://www.api.mymoondeal.com/api/product",
          requestOptions
        );
  
        let resJson = await res.json();
        if (resJson.success) {
          console.log("success");
          chrome.tabs.sendMessage(sender.tab.id, { farewell: "success", success: true});
        } else {
          console.log("failure");
          chrome.tabs.sendMessage(sender.tab.id, { farewell: "failure", success: false});
        }
      } catch (err) {
        console.log(err);
        chrome.tabs.sendMessage(sender.tab.id, { farewell: "failure", success: false});
      }
    });
  }

  if (request.greeting == "removeToken") {
    chrome.storage.local.clear(() => {
      sendResponse({farewell: "token removed"})
    }
    )
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
