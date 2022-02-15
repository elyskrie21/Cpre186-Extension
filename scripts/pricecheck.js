/*
*This script whill use the XMLHttpRquest libraray to fecth Amazon html data to parser
*It will use the data in chrome.storage to get the product url so it can price check

Todo: Create function to get data from chrome.storage
Todo: Create function to fetch Amazon html data
Todo: Create function to send data to background.js
*/

// *Testing with a static urls before dynamic 
fetch('https://www.amazon.com/Newest-HP-Pavilion-7-5700U-i7-1180G7/dp/B09QS7W8G5/ref=sr_1_19?crid=QJS9MMS6S6Y7&keywords=laptop&qid=1644909952&sprefix=laptop%2Caps%2C89&sr=8-19')
    .then(response => response.text())
    .then(data => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(data, 'text/html')

        console.log(doc)
    })