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
      image: images[0],
    })
}

function addProduct() {
  const url = window.location.href;
  const  productName = document.getElementById("productTitle").innerText;

  const productPrice =
    document.getElementsByClassName("a-price-whole")[0].innerText;
  //productPrice = productPrice.substring(0, productPrice.match('\n.').index)

  const images = document.querySelector("#main-image-container > ul").getElementsByTagName('li');
  const imagesArray = [...images];

  let productImg = new Array();
  console.log(imagesArray);

  
  imagesArray.forEach((e) => {
    try {
      console.log(e); 
      productImg.push(e.getElementsByTagName('img')[0].src);
    } catch (err) {
      console.log(err); 
    }
  })

  console.log(productImg);

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


