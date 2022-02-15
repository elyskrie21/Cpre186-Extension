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


// !This for testing only! will be controlled by background.js later
let priceCheck = document.getElementById('check-price')
priceCheck.addEventListener('click', async () => {
    // let response = await fetch('https://www.amazon.com/Newest-HP-Pavilion-7-5700U-i7-1180G7/dp/B09QS7W8G5/ref=sr_1_19?crid=QJS9MMS6S6Y7&keywords=laptop&qid=1644909952&sprefix=laptop%2Caps%2C89&sr=8-19')
    // let data = await response.text()
    // console.log(data)

    // let parser = new DOMParser();
    // let doc = parser.parseFromString(data, 'text/html')
    
    // console.log(doc.getElementById('productTitle')) 
    // alert('this is working') 
    let price;
    fetch('https://www.amazon.com/Newest-HP-Pavilion-7-5700U-i7-1180G7/dp/B09QS7W8G5/ref=sr_1_19?crid=QJS9MMS6S6Y7&keywords=laptop&qid=1644909952&sprefix=laptop%2Caps%2C89&sr=8-19')
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(data, 'text/html')

            alert("this is at this part of the script")
            console.log(doc)

            price = doc.getElementsByClassName('a-price-whole')[0].innerText;
            console.log("product price ", price)
        })
    
    console.log(price)
})