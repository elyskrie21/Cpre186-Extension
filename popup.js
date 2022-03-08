/*
*This Javascript file will be connected to background.html (which is the UI the user will see)
*The purpose of this file is to control the actions that take place when the user does an action on background.html

Todo: Create script for when user clicks button to add product to wanted list
Todo: Create script to handle add email to storage 

? There might be some Todos I missed, so we can add them later if needed 
*/

let addProduct = document.getElementById('add-product')

addProduct.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true})

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['scripts/addproduct.js']
    })
})
