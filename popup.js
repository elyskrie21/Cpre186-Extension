let siteButton = document.getElementById('site');
let recipeButton = document.getElementById('recipe')
let printButton = document.getElementById('print')

siteButton.addEventListener('click', async () => {
    window.open("https://iowagirleats.com/recipes/", "Recipe")
})

recipeButton.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['scripts/scroll.js'],
    });

});

printButton.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['scripts/print.js'],

    })
})
