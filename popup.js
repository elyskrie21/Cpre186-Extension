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
        function: scrollToRecipe,
    });

});

printButton.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: printRecipe,

    })
})

function scrollToRecipe() {
    aElements = document.body.querySelectorAll('a'); 
    let printElement; 

    aElements.forEach(element => {
        text = element.textContent.toLowerCase()
        if (text.includes('print') || text.includes('print recipe')) {
            printElement = element;
        }
    });

    printElement.scrollIntoView(true, {
        behavior: 'smooth',
        block: 'end'
    })
}

function printRecipe() {
    aElements = document.body.querySelectorAll('a')

    aElements.forEach(element => {
        text = element.textContent.toLowerCase()
        if (text.includes('print') || text.includes('print recipe')) {
            printLink = element.href;
            console.log('this is the link ' + printLink);
            window.open(printLink, "_top");
        }
    });

    console.log('hi')
}
