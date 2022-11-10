//weekly assignment #2 shopping cart
const shopItems = document.querySelector(".shop-items");
const shopItem = document.querySelectorAll(".shop-item");
const addToCartBtn = document.querySelectorAll(".shop-item-button");
const cartTotal = document.querySelector(".cart-total");
const cartTotalPrice = document.querySelector(".cart-total-price");
//when addtocart btn is clicked, the item is added to the cart
addToCartBtn.forEach((addedToCart) => {
  addedToCart.addEventListener("click", (e) => {
    var item = e.target.parentElement.parentElement;
    console.log(item);
    let itemName = item.querySelector(".shop-item-title");
    let itemImg = item.querySelector(".shop-item-image").src;
    console.log(item, itemName, itemImg);
    const cartItems = document.querySelector(".cart-items");
    let cartItemNames = cartItems.querySelectorAll(".cart-item-title");
    let cartPrice = cartItems.querySelectorAll(".cart-price").textContent;
    let cartImg = cartItems.querySelectorAll(".cart-item-image").src;
    console.log(cartImg, cartPrice, cartItemNames);
    // check if item already in cart
    for (i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].textContent == itemName.textContent) {
        alert("you have already added this item to your cart");
        return;
      }
    }
    //creating a cart item
    var newItem = document.createElement("div");
    newItem.classList.add("cart-row");
    newItem.innerHTML = `
        <div class="cart-item cart-column"> 
        <img class="cart-item-image" src="${
          item.querySelector("img").src
        }" alt="">
        <span class="cart-item-title">${
          item.querySelector(".shop-item-title").innerText
        }</span>
        </div>
            <span class="cart-price cart-column">${
              item.querySelector(".shop-item-price").innerText
            }</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
        `;
    cartItems.appendChild(newItem);
    alert("item added to cart");
    price();

    //remove item from cart on click
    let deleteCartItemBtn = document.querySelectorAll(".btn-danger");
    deleteCartItemBtn.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", (e) => {
        var itemToBeDeleted = e.target.parentElement.parentElement;
        itemToBeDeleted.remove();
        price();
      });
    });

    //updating cart total if quantity is changed
    var quantityInputs = document.getElementsByClassName("cart-quantity-input");
    for (var i = 0; i < quantityInputs.length; i++) {
      quantity = quantityInputs[i];
      var inputChange = quantityInputs[i];
      inputChange.addEventListener("change", quantityChanged);
    }

    //clearing cart when purchase button is clicked
    var purchaseButton = document.querySelectorAll(".btn-purchase");
    purchaseButton.forEach((purchaseBtn) => {
      purchaseBtn.addEventListener("click", () => {
        var cartItems = document.getElementsByClassName("cart-items")[0];
        cartItems.innerHTML = "";
        var totalCost = document.getElementById("cart-total");
        totalCost.innerText = "$0.00";
      });
    });
  });
});

// function to update cart total
function price() {
  var cart = document.getElementsByClassName("cart-items")[0];
  var rows = cart.querySelectorAll(".cart-row");
  var total = 0;
  for (var i = 0; i < rows.length; i++) {
    var cartRow = rows[i];
    var itemPrice = cartRow.getElementsByClassName("cart-price")[0];
    var input = cartRow.getElementsByClassName("cart-quantity-input")[0];
    var price = parseFloat(itemPrice.innerText.replace("$", ""));
    var quantity = input.value;
    total = total + price * quantity;
  }
  let totalCost = document.getElementById("cart-total");
  totalCost.innerHTML = "$" + total;
}
//function to handle quantity changing
function quantityChanged(e) {
  var quantityInputChanged = e.target;
  if (quantityInputChanged.value <= 0) {
    quantityInputChanged.value = 1;
  }
  price();
}

// function for quantity
// var quantityInputs = document.querySelectorAll("cart-quantity-input");
// quantityInputs.forEach((quantityInput) => {
// 	quantityInput.addEventListener("change", (e) => {
// 		var quantityInputChanged = e.target;
// 		if (quantityInputChanged.value <= 0) {
// 			quantityInputChanged.value = 1;
// 		}
// 		price();
// 	});
// });
