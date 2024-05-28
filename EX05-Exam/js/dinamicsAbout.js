let circleTag = document.querySelectorAll(".circle-tag");
let cartMobile = document.querySelector(".cart-nav-mobile");
let logoDiv = document.querySelector(".logo")


let plantArchive = "http://localhost:3000/objects";
let forCart = [];


window.addEventListener('DOMContentLoaded', function(){
    forCart = takeItems()
    if(forCart == null){
        forCart = [];
    }
})

fetch(plantArchive)
    .then(data => {
        return data.json();
    })
    .then(response => {
        response.forEach(plant => {

        });
    })
    .finally(function(){
        cartNumberTag()
    })


function saveItems(){
    let forCartJSON = JSON.stringify(forCart);
    localStorage.setItem("userCart", forCartJSON)
    console.log("test");
}

function takeItems(){
    let importedCartJSON = localStorage.getItem("userCart")
    let importedCartOBJ = JSON.parse(importedCartJSON)
    return importedCartOBJ
}

function cartNumberTag(){
    circleTag.forEach(tag =>{
        if(forCart.length > 0){
            tag.style.visibility = "visible";
            tag.textContent = forCart.length
        } else {
            tag.style.visibility = "hidden";
        }
    })
}

cartMobile.addEventListener("click", function(){
    window.location.href = "./cart.html";
});

logoDiv.addEventListener("click", function(){
    window.location.href = "./index.html";   
})

