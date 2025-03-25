let cartIcon = document.querySelector('#cart-icon')
let value = document.querySelector('.value')
let closeCart = document.querySelector('#close-cart')




cartIcon.onclick = () =>{
    value.classList.add("active");
};

closeCart.onclick = () =>{
    value.classList.remove("active");
};

if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){
    var removeCartButtons = document.getElementsByClassName('remove')
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem)
    }
    
   var quantityInputs = document.getElementsByClassName('quantity')
   for(var i = 0; i < quantityInputs.length; i++){
    var input =  quantityInputs[i]
    input.addEventListener('change',quantityChanged);
   }
    var addCart = document.getElementsByClassName('can');
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i]
        button.addEventListener("click",addCartClicked);
    }
   document
   .getElementsByClassName('btn')[0]
   .addEventListener('click',buyButtonClicked) 
}
function buyButtonClicked(){
    alert('Your Order is placed')
    var cartContent = document.getElementsByClassName('mnb')[0]
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}



function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updatetotal();
}
function quantityChanged(event){
   var input = event.target 
   if (isNaN(input.value) || input.value <= 0){
    input.value = 1;
   }
   updatetotal();
}

function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName('mmm')[0].innerText;
    var price = shopProducts.getElementsByClassName('nnn')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('img')[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
    
}

function addProductToCart(title, price, productImg){
 var cartShopBox = document.createElement('div');
 cartShopBox.classList.add('not')  
var cartItems = document.getElementsByClassName('mnb')[0] 
var cartItemsNames = cartItems.getElementsByClassName('ear');
for (var i = 0; i < cartItemsNames.length; i++){
    if (cartItemsNames[i].innerText == title){
    alert("You have already add this item to cart")
    return;
}

}
var cartBoxContent =`
                     <img src="${productImg}" alt="" class="img">
                     <div class="detail">
                        <div class="ear">${title}</div>
                        <div class="earprice">${price}</div>
                        <input type="number" value="1" class="quantity">
                        </div>
                        <i class="bi bi-trash3-fill remove"></i>`;
cartShopBox.innerHTML =cartBoxContent
cartItems.append(cartShopBox)
cartShopBox
.getElementsByClassName('remove')[0]
.addEventListener('click',removeCartItem)             
cartShopBox
.getElementsByClassName('quantity')[0]
.addEventListener('change',quantityChanged)             
}
function updatetotal(){
    var cartContent = document.getElementsByClassName('mnb')[0]
    var cartBoxes = cartContent.getElementsByClassName('not')
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName('earprice')[0]
        var quantityElement = cartBox.getElementsByClassName('quantity')[0]
        var price = parseFloat(priceElement.innerText.replace("$",""))
        var quantity = quantityElement.value
        total= total + (price * quantity);
      
    }
        total = Math.round(total * 100) / 100;
         



        document.getElementsByClassName('tooprice')[0].innerText = "$" + total; 
}  

