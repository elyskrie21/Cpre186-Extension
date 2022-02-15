/*
* This is a content script which will get inject into the Amazon website
* It will do some html parsing to get product detials than send it to background.js

Todo: Create html parser to get product: name, price, url, and image 
Todo: Create function to send data back to background.js
*/
function sendData(url, name, price, images)
{
    // TODO
}

function addProduct() {
    let url = window.location.href;
    let productName = document.getElementById('productTitle').innerText; 

    let productPrice = document.getElementsByClassName('a-price-whole')[0].innerText;
    productPrice = productPrice.substring(0, productPrice.match('\n.').index)

    let imgs = document.getElementById('main-image-container').getElementsByClassName('a-unordered-list')[0].getElementsByTagName('li')
    let productImg = new Array()

    for (img of imgs)
    {
        if(img.getElementsByTagName('img')[0] != null) {productImg.push(img.getElementsByTagName('img')[0].src)}
    }
    
    sendData(url, productName, productPrice, productImg)
}

addProduct(); 