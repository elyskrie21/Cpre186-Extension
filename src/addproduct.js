/*
* This is a content script which will get inject into the Amazon website
* It will do some html parsing to get product detials than send it to background.js

Todo: Create html parser to get product: name, price, url, and image 
Todo: Create function to send data back to background.js
*/
import Swal from "sweetalert2";

function sendData(url, name, price, images) {
  chrome.runtime.sendMessage(
    {
      greeting: "addProduct",
      url: url,
      name: name,
      price: price,
      image: images[3],
    })
}

function addProduct() {
  let url = window.location.href;
  let productName = document.getElementById("productTitle").innerText;

  let productPrice =
    document.getElementsByClassName("a-price-whole")[0].innerText;
  //productPrice = productPrice.substring(0, productPrice.match('\n.').index)

  let imgs = document.querySelector("#altImages > ul").getElementsByTagName('li');
  let productImg = new Array();
  console.log(imgs);

  for (let i = 0; i < imgs.length; i++) {
    try {
      src = imgs[i].getElementsByTagName('img')[0].src;
      productImg.push(src);
    } catch (error) {
      console.log(error)
    }
  }
  
  console.log(productImg.length);

  if (url.toLowerCase().includes("amazon")) {
    sendData(url, productName, productPrice, productImg);
  }
}

chrome.runtime.onMessage.addListener((message) => {
  console.log('sent from background', message.farewell); 
  if (message.success) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your product has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  } else {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Oops...',
      text: "Your product was unable to be saved",
      showConfirmButton: false,
      timer: 3000
    })
  }
});

addProduct();


