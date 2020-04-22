if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready(){
    loadElements();

    const cartBtn=document.querySelectorAll('.store-item-icon');
    cartBtn.forEach(function(btn){
        btn.addEventListener('click',addItemToCart);
    })

    const clearBtn=document.getElementById('clear-cart');
    clearBtn.addEventListener('click',removeItems);

    const selectedItems=document.querySelectorAll('.fa-trash');
    selectedItems.forEach(function(item){
        item.addEventListener('click',removeItemToCart);
    })

}


//show cart

(function(){
    const cartInfo=document.getElementById('cart-info');
    const cart=document.getElementById('cart');

    cartInfo.addEventListener('click',function(){
        cart.classList.toggle('show-cart');
});

})();

// load elements
const element1={
    name:"Cake item",
    img:"img-cart/cake-2.jpeg",
    price:10
}
const element2={
    name:"Dougnut item",
    img:"img-cart/doughnut-2.jpeg",
    price:10
}
const elementArray=[element1,element2];



//show total
function showTotals(){
    const total=[]; //It's gonna be array;
    const items=document.querySelectorAll('.cart-item-price');
    items.forEach(function(item){
        total.push(parseFloat(item.textContent));
    });
    console.log(total);
    const totalMoney=total.reduce(function(total,item){//First method
        total+=item;
        return total;
    },0)
    // var totalMoney=0;
    // total.forEach(function(tot){
    //     totalMoney+=tot;
    // })
    // console.log(totalMoney); This is second method.
    const finalMoney=totalMoney.toFixed(2); // you are gonna get number which how many points you want after number.

    document.getElementById('cart-total').textContent=finalMoney;
    document.getElementById('item-count').textContent=total.length;
    document.querySelector('.item-total').textContent=finalMoney;
};

function loadElements(){
elementArray.forEach(element => {
    const cartItem=document.createElement('div');
                cartItem.classList.add('cart-item','d-flex','justify-content-between','text-capitalize','my-3');
                cartItem.innerHTML=`
                    <img src="${element.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                    <div class="item-text">
        
                    <p id="cart-item-title" class="font-weight-bold mb-0">${element.name}</p>
                    <span>$</span>
                    <span id="cart-item-price" class="cart-item-price" class="mb-0">${element.price}</span>
                    </div>
                    <a href="#" id='cart-item-remove' class="cart-item-remove">
                    <i class="fas fa-trash"></i>
                    </a>
                    `;
                // select cart
                const cart=document.getElementById('cart');
                const total=document.querySelector('.cart-total-container');
                cart.insertBefore(cartItem,total);
                showTotals();                
});
};


//add items to the cart
var addItemToCart=(event)=>{
    // const cartBtn=document.querySelectorAll('.store-item-icon');
            // console.log(event.target)
            if(event.target.parentElement.classList.contains('store-item-icon')){
                let fullPath=event.target.parentElement.previousElementSibling.src;
                 //we want to take a previous element src from span tag.
                let pos=fullPath.indexOf("img")+3; // we are looking for position. We must add 3 , because img lenght is 3 character.
                // console.log(pos);
                let partPath=fullPath.slice(pos); // we want to get unique path.
                // console.log(partPath);

                const item={};
                item.img=`img-cart${partPath}`
                console.log(item);

                let name=event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;
                item.name=name;

                let price=event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;

                let finalPrice=price.slice(2); // I want to get the only price without $.
                item.price=finalPrice;
                // console.log(finalPrice);

                const cartItem=document.createElement('div');
                cartItem.classList.add('cart-item','d-flex','justify-content-between','text-capitalize','my-3');
                cartItem.innerHTML=`
                    <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
                    <div class="item-text">
        
                    <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
                    <span>$</span>
                    <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
                    </div>
                    <a href="#" id='cart-item-remove' class="cart-item-remove">
                    <i class="fas fa-trash"></i>
                    </a>
                    `;
                // select cart
                const cart=document.getElementById('cart');
                const total=document.querySelector('.cart-total-container');
                cart.insertBefore(cartItem,total);
                alert('item added to the cart');
                cartItem.getElementsByClassName('fa-trash')[0].addEventListener('click',removeItemToCart);
                // console.log(cartItem.getElementsByClassName('fa-trash')[0]);
                
                showTotals();

                // console.log(item);
            }
}


//remove items to the cart
var removeItems=()=>{
    const cartItems=document.querySelectorAll('.cart-item');
        cartItems.forEach(function(item){
            item.innerHTML="";
        });

        document.getElementById('cart-total').textContent=0;
        document.getElementById('item-count').textContent=0;
        document.querySelector('.item-total').textContent=0;
    
    showTotals();
};


//remove each item from the cart
var removeItemToCart=(event)=>{
    const selectedItems=document.querySelectorAll('.fa-trash');
    var totalPrice=document.getElementById('cart-total').textContent;
    // var itemTotal=document.querySelector('.item-total').textContent;
    var itemCount=document.getElementById('item-count').textContent;
    
    var parentCart=event.target.parentElement.parentElement;
    console.log(parentCart);
    
    parentCart.remove();
    var itemPrice=parseFloat(parentCart.childNodes[3].childNodes[5].textContent);
    totalPrice-=itemPrice;
    console.log(totalPrice);
    document.getElementById('cart-total').textContent=totalPrice;
    document.querySelector('.item-total').textContent=totalPrice;
    itemCount--;
    document.getElementById('item-count').textContent=itemCount;
    // console.log(parentCart.childNodes[3].childNodes[5].textContent);
    showTotals();
}