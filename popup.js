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
    let clickEvent = new MouseEvent('click', {
        'view': window,
        "bubbles": true,
        'cancelable': false
    })
    let [a] = document.getElementsByClassName('recipe-print');
    a.dispatchEvent(clickEvent)
}