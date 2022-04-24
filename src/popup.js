/*
*This Javascript file will be connected to background.html (which is the UI the user will see)
*The purpose of this file is to control the actions that take place when the user does an action on background.html

Todo: Create script for when user clicks button to add product to wanted list
Todo: Create script to handle add email to storage 

? There might be some Todos I missed, so we can add them later if needed 
*/

let addProduct = document.getElementById('add-product')
let signoutButton = document.getElementById("signoutButton")
let settingsButton = document.getElementById("settings")
let homeButton = document.getElementById("home");

addProduct.addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true})

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['addproduct.js']
    })
})

signoutButton.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    chrome.runtime.sendMessage({greeting: "removeToken"}, (response) => {
        console.log(response.farewell)
    })
    window.location.href = "/pages/signin.html"; 
})

settingsButton.addEventListener("click", (e) => {
    e.preventDefault();

    window.open("https://www.mymoondeal.com/settings", "_blank");
})

homeButton.addEventListener('click', (e) => {
    e.preventDefault();

    window.open("https://www.mymoondeal.com/dashboard", "_blank"); 
})


if (localStorage.getItem("token") == null) {
    window.location.href = "/pages/signin.html"
}