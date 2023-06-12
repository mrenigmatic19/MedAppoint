"use strict";

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = products.data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var i = _step.value;
    //Create Card
    var card = document.createElement("div"); //Card should have category and should stay hidden initially

    card.classList.add("card", i.category, "hide"); //image div

    var imgContainer = document.createElement("div");
    imgContainer.classList.add("image-container"); //img tag

    var image = document.createElement("img");
    image.setAttribute("src", i.image);
    imgContainer.appendChild(image);
    card.appendChild(imgContainer); //container

    var container = document.createElement("div");
    container.classList.add("container"); //product name

    var name = document.createElement("h5");
    name.classList.add("product-name");
    name.innerText = i.productName.toUpperCase();
    container.appendChild(name); //price

    var price = document.createElement("h6");
    price.innerText = "$" + i.price;
    container.appendChild(price);
    card.appendChild(container);
    document.getElementById("products").appendChild(card);
  } //parameter passed from button (Parameter same as category)

} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

function filterProduct(value) {
  //Button class code
  var buttons = document.querySelectorAll(".button-value");
  buttons.forEach(function (button) {
    //check if value equals innerText
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  }); //select all cards

  var elements = document.querySelectorAll(".card"); //loop through all cards

  elements.forEach(function (element) {
    //display all cards on 'all' button click
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      //Check if element contains category class
      if (element.classList.contains(value)) {
        //display element based on category
        element.classList.remove("hide");
      } else {
        //hide other elements
        element.classList.add("hide");
      }
    }
  });
} //Search button click


document.getElementById("search").addEventListener("click", function () {
  //initializations
  var searchInput = document.getElementById("search-input").value;
  var elements = document.querySelectorAll(".product-name");
  var cards = document.querySelectorAll(".card"); //loop through all elements

  elements.forEach(function (element, index) {
    //check if text includes the search value
    if (element.innerText.includes(searchInput.toUpperCase())) {
      //display matching card
      cards[index].classList.remove("hide");
    } else {
      //hide others
      cards[index].classList.add("hide");
    }
  });
}); //Initially display all products

window.onload = function () {
  filterProduct("all");
};