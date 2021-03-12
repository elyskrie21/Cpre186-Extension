aElements = document.body.querySelectorAll('a')

aElements.forEach(element => {
    text = element.textContent.toLowerCase()
    if (text.includes('print') || text.includes('print recipe')) {
        chrome.storage.sync.set({'printLink': element.href}, () => {
            console.log("The print link was set to " + element.href)
        })
    }
});