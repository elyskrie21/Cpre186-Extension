/*
* This is a content script which will get inject into the Amazon website
* It will do some html parsing to get product detials than send it to background.js

Todo: Create html parser to get product: name, price, url, and image 
Todo: Create function to send data back to background.js
*/
import Swal from "sweetalert2";

function sendData(url, name, price, images) {
  chrome.runtime.sendMessage({
    greeting: "addProduct",
    url: url,
    name: name,
    price: price,
    image: images[0],
  });
}

function addProductAmazon() {
  const url = window.location.href;
  const productName = document.getElementById("productTitle").innerText;

  const productPrice =
    document.getElementsByClassName("a-price-whole")[0].innerText;
  //productPrice = productPrice.substring(0, productPrice.match('\n.').index)

  const images = document
    .querySelector("#main-image-container > ul")
    .getElementsByTagName("li");
  const imagesArray = [...images];

  let productImg = new Array();
  console.log(imagesArray);

  imagesArray.forEach((e) => {
    try {
      productImg.push(e.getElementsByTagName("img")[0].src);
    } catch (err) {
      console.log(err);
    }
  });

  sendData(url, productName, productPrice, productImg);
}

function addProductEbay() {
  const url = window.location.href;

  const productName = document.querySelector(
    "#LeftSummaryPanel > div.vi-swc-lsp > div:nth-child(1) > div > h1"
  ).textContent;
  
  let id = document.getElementById("prcIsum") == null ? "mm-saleDscPrc" : "prcIsum";
  const productPrice = document.getElementById(id).textContent.trim().replace("US $", "");

  console.log(productPrice); 

  const images = [
    ...document
      .getElementById("vertical-align-items-viewport")
      .getElementsByTagName("li"),
  ];

  let productImg = new Array();

  images.forEach((e) => {
    try {
      productImg.push(e.getElementsByTagName("img")[0].src);
    } catch (err) {
      console.log(err);
    }
  });

  productImg.forEach(function (element, index) {
    this[index] = element.replace("s-l64", "s-l500");
  }, productImg);

  sendData(url, productName, productPrice, productImg);
}

chrome.runtime.onMessage.addListener((message) => {
  console.log("sent from background", message.farewell);
  if (message.success) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your product has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  } else {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Oops...",
      text: "Your product was unable to be saved",
      showConfirmButton: false,
      timer: 3000,
    });
  }
});

if (window.location.href.toLowerCase().includes("amazon")) {
  addProductAmazon();
} else if (window.location.href.toLowerCase().includes("ebay")) {
  addProductEbay();
}
