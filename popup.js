let siteButton = document.getElementById('site');
let recipeButton = document.getElementById('recipe')
let printButton = document.getElementById('print')

siteButton.addEventListener('click', async() => {
    window.open("https://iowagirleats.com/recipes/", "Recipe")
})

recipeButton.addEventListener('click', async() => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: scrollToRecipe,
    });

});

printButton.addEventListener('click', async() => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    
    chrome.storage.sync.get("printLink", (link) => {
        window.open(link.key)
    });

    window.open(link)
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: printRecipe,
    })
})

function scrollToRecipe() {
    // have to do it twice as the site loads more info that screws everything up
    document.getElementById('recipe-card').scrollIntoView(true, {
        behavior: 'smooth',
        block: 'end'
    })
}

function printRecipe() {
    chrome.storage.sync.get("printLink", (link) => {
        console.log(link.key)
    })
}