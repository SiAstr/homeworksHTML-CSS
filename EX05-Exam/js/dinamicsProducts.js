let sliderPiece = document.querySelector(".slider-piece");
let productsGallery = document.querySelector(".product-gallery")
let circleTag = document.querySelectorAll(".circle-tag");
let cartDesk = document.querySelector(".cart-nav-desktop");
let cartSide = document.querySelector(".cart-nav-side");
let cartMobile = document.querySelector(".cart-nav-mobile");
let cartMainBtn = document.querySelector(".button-to-cart");


let productArchive = "http://localhost:3000/objects";
let oldProductArchive = "http://localhost:3000/old";
let productImgs = [];
let interval = 1800;
let forCart = [];

sliderPiece.setAttribute("src", "./assets/products-photo/priscilla.jpg");
window.addEventListener('DOMContentLoaded', function(){
    forCart = takeItems()
    if(forCart == null){
        forCart = [];
    }
})

fetch(oldProductArchive)
    .then(data => {
        return data.json();
    })
    .then(response => {
        response.forEach(oldProduct => {
            productImgs.push(oldProduct.img)
        });
        setInterval(randomizeSliderproducts, interval);
    })
    .finally(function(){
        cartNumberTag()
    })

fetch(productArchive)
    .then(data => {
        return data.json();
    })
    .then(response => {
        response.forEach(product => {
            createproductCard(product);
        });
    })
    .finally(function(){
        cartNumberTag()
    })

    let lastRandomIndex = -1;

    function randomizeSliderproducts() {
        if (productImgs.length > 1) {
            let random;
            do {
                random = Math.floor(Math.random() * productImgs.length);
            } while (random === lastRandomIndex);
    
            lastRandomIndex = random;
            sliderPiece.setAttribute("src", productImgs[random]);
        } else if (productImgs.length === 1) {
            sliderPiece.setAttribute("src", productImgs[0]);
        }
    }

function createproductCard(product){
    let productCardContainer = document.createElement("div");
    let productCard = document.createElement("div");
    let productCardInner = document.createElement("div");
    let productImgBox = document.createElement("div");
    let productImg= document.createElement("img");
    let productTexBox = document.createElement("div");
    let textBox = document.createElement("div");
    let productName = document.createElement("h5");
    let productAuthor = document.createElement("p");
    let productPrice = document.createElement("p");
    let productAmount = document.createElement("span");
    let productButtonDiv = document.createElement("div");
    let productButtonCta = document.createElement("div");
    let salaTitle = document.createElement("h3")

    productCardContainer.setAttribute("class", "product-card")
    salaTitle.setAttribute("class", "sala-title")
    productCardInner.setAttribute("class", "product-card-inner")
    productImgBox.setAttribute("class", "product-img-box")
    productImg.setAttribute("class", "product-img")
    productImg.setAttribute("src", product.img)
    productTexBox.setAttribute("class", "product-text-box")
    textBox.setAttribute("class", "text-box")
    productName.setAttribute("class", "p-name")
    productAuthor.setAttribute("class", "p-Author")
    productPrice.setAttribute("class", "p-price")
    productAmount.setAttribute("class", "p-amount")
    productButtonDiv.setAttribute("class", "p-button-div")
    productButtonCta.setAttribute("class", "p-cta add")

    
    productName.textContent = product.nome;
    productAuthor.textContent = product.autore;
    productPrice.textContent = "Prezzo: €";
    productAmount.textContent = product.prezzo;
    productButtonCta.textContent = "Aggiungi al carrello";
    salaTitle.textContent = "Sala " + product.id

    for(let i = 0; i < forCart.length; i++){
        if(product.id == forCart[i]){
            if(productButtonCta.classList.contains("add")){
                productButtonCta.classList.remove("add");
                productButtonCta.classList.add("remove");
                productButtonCta.textContent = "Rimuovi dal carrello";
            }
        }
    }

    productButtonCta.addEventListener("click", function(){
        if(productButtonCta.classList.contains("add")){
            productButtonCta.classList.remove("add");
            productButtonCta.classList.add("remove");
            productButtonCta.textContent = "Rimuovi dal carrello";
            forCart.push(product.id)
        } else {
            productButtonCta.classList.remove("remove");
            productButtonCta.classList.add("add");
            productButtonCta.textContent = "Aggiungi al carrello";

            forCart = forCart.filter(id => id !== product.id)
        }

        cartNumberTag()
    })
    
    productCardInner.appendChild(productImgBox)
    productCardInner.appendChild(productTexBox)
    
    productImgBox.appendChild(productImg)
    productTexBox.appendChild(textBox)
    productTexBox.appendChild(productPrice)
    
    textBox.appendChild(productName)
    textBox.appendChild(productAuthor)
    
    productPrice.appendChild(productAmount)

    productButtonDiv.appendChild(productButtonCta)
    
    productCard.appendChild(productCardInner)
    productCard.appendChild(productButtonDiv)

    productCardContainer.appendChild(salaTitle)
    productCardContainer.appendChild(productCard)

    productsGallery.appendChild(productCardContainer)
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

function saveItems(){
    let forCartJSON = JSON.stringify(forCart);
    localStorage.setItem("userCart", forCartJSON)
}

function takeItems(){
    let importedCartJSON = localStorage.getItem("userCart")
    let importedCartOBJ = JSON.parse(importedCartJSON)
    return importedCartOBJ
}


cartDesk.addEventListener("click", saveItems);
cartSide.addEventListener("click", saveItems);

cartMobile.addEventListener("click", function(){
    saveItems();
    window.location.href = "./cart.html";
});

cartMainBtn.addEventListener("click", function(){
    saveItems();
    window.location.href = "./cart.html";   
});

