/*
*This is the 'main' javascript class 
*It will run the alarms, storage, and price check scripts 
*/

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason == 'install') {
        chrome.tabs.create({ url: chrome.runtime.getURL("pages/installed.html")}); 
    }
    else if (details.reason = 'update') {
        chrome.tabs.create({ url: chrome.runtime.getURL('pages/update.html')})
    }
})

chrome.runtime.onMessage.addListener((response, sender, sendResponse) => {
    console.log(sender.tab ? "from content script " + sender.tab.url : "from the extension")

    if(response.greeting === "checkPrice")
    {
        checkPrice()
        sendResponse({farewell: "goodbye"})
    }
})

async function checkPrice() {
    let response = await fetch('https://www.amazon.com/Newest-HP-Pavilion-7-5700U-i7-1180G7/dp/B09QS7W8G5/ref=sr_1_19?crid=QJS9MMS6S6Y7&keywords=laptop&qid=1644909952&sprefix=laptop%2Caps%2C89&sr=8-19')
    let data = await response.text()
    console.log(data)
    alert(data)

    let parser = new DOMParser();
    let doc = parser.parseFromString(data, 'text/html')
    
    console.log(doc.getElementById('productTitle')) 
    alert('this is working') 
}


// function onUpdate() {
//     chrome.storage.sync.set({
//         automat
//     })
// }
